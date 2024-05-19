import { init } from '@paralleldrive/cuid2'
import { generateAILogo, uploadToCDN, execPipeline, AIModel } from './streams'
import { GenerateLogoInput, Logo } from './types/graphql'
import { CDN_PUBLIC_URL } from './config'
import db from './db'

export enum LogoStyle {
  Minimalist = 'minimalist',
  Elegant = 'elegant',
  Abstract = 'abstract',
  Modern = 'modern'
}

export enum FontStyle {
  Serif = 'serif',
  SansSerif = 'sans-serif',
  Monospace = 'monospace',
  Cursive = 'cursive',
  Fantasy = 'fantasy'
}

export class LogoService {
  static MAX_SEED_VALUE = 1024 * 1024
  private createId: () => string
  private model: AIModel

  constructor({ model = AIModel.SD3Turbo, logoIdLength = 10 } = {}) {
    this.model = model
    this.createId = init({
      random: Math.random,
      length: logoIdLength
    })
  }

  static buildPrompt(fields: GenerateLogoInput): string {
    // const prompt = [
    //   `Create a ${fields.style} picture logo for "${fields.companyName}"`,
    //   "that reflects our brand's commitment to simplicity and elegance",
    //   'include the company name but do NOT change it',
    //   'use an empty white background'
    // ]
    const prompt = [
      `Create a logo for a shop named "${fields.companyName}"`,
      'natural elegance',
      'consider incorporating organic shapes',
      'subtle gradients',
      'and earthy tones to convey a sense of stability and elegance'
    ]
    return prompt.join(', ')
  }

  static randomSeed(): number {
    const seed = Math.random()
    const scaledSeed = seed * LogoService.MAX_SEED_VALUE
    return Math.floor(scaledSeed)
  }

  async getAllLogos(): Promise<Logo[]> {
    return await db.logo.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async generateLogo(input: GenerateLogoInput) {
    const prompt = LogoService.buildPrompt(input)
    const seed = LogoService.randomSeed()
    const logoId = this.createId()
    const cdnPath = `/logos/${logoId}.jpg`
    await execPipeline(
      generateAILogo(prompt, this.model, seed),
      uploadToCDN(cdnPath)
    )
    const logo = await db.logo.create({
      data: {
        prompt,
        seed,
        url: `${CDN_PUBLIC_URL}${cdnPath}`
      }
    })
    return logo
  }
}
