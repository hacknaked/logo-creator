import mustache from 'mustache'
import { init } from '@paralleldrive/cuid2'
import { generateAILogo, uploadToCDN, execPipeline, AIModel } from './streams'
import { GenerateLogoInput, Logo } from './types/graphql'
import { CDN_PUBLIC_URL } from './config'
import promptTemplates from './prompt.templates'
import db from './db'

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

  async generateLogo(input: GenerateLogoInput): Promise<Logo> {
    const { logoStyle } = input
    const prompt = mustache.render(promptTemplates[logoStyle], input)
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
