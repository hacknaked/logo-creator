import { Readable, Transform, Writable } from 'stream'
import axios from 'axios'
import pump from 'pump'
import sharp from 'sharp'

import {
  BUNNY_ACCESS_KEY,
  BUNNY_HOSTNAME,
  BUNNY_STORAGE_ZONE,
  STABILITY_API_KEY
} from './config'

export enum AIModel {
  SD3 = 'sd3',
  SD3Turbo = 'sd3-turbo'
}

/**
 * Generates an AI-generated logo based on the provided prompt.
 * @param {string} prompt - The prompt to generate the logo from.
 * @param {AIModel} [model=AIModel.SD3Turbo] - The AI model to use for generating the logo.
 * @param {number} [seed=0] - The seed value for the AI model.
 * @returns {Readable} - Readable stream that emits the generated logo image.
 */
export const generateAILogo = (
  prompt: string,
  model: AIModel = AIModel.SD3Turbo,
  seed: number = 0
): Readable => {
  return new Readable({
    read() {
      const formData = {
        prompt,
        model,
        seed,
        output_format: 'jpeg',
        negative_prompt:
          model === AIModel.SD3
            ? 'ugly, poorly drawn, duplicate artifacts'
            : null
      }
      axios
        .postForm(
          `https://api.stability.ai/v2beta/stable-image/generate/sd3`,
          axios.toFormData(formData, new FormData()),
          {
            validateStatus: undefined,
            responseType: 'arraybuffer',
            headers: {
              Authorization: `Bearer ${STABILITY_API_KEY}`,
              Accept: 'image/*'
            }
          }
        )
        .then((response) => {
          this.push(response.data)
          this.push(null)
        })
        .catch((error) => {
          this.emit('error', error)
        })
    }
  })
}

/**
 * Creates a Transform Stream to resize an image.
 * @param {number} width - The desired width of the image.
 * @param {number} [height=null] - The desired height of the image (optional).
 * @param {string} [format=null] - The desired format of the image (optional).
 * @returns {Transform} - Transform Stream for resizing an image.
 */
export const resizeImage = (
  width: number,
  height: number | null = null,
  format: string | null = null
): Transform => {
  const transformer: Transform = new Transform({
    transform(chunk, encoding, callback) {
      // This function is called for each chunk of data
      // Resize the chunk using sharp
      let image = sharp(chunk)

      if (width && height) {
        image = image.resize(width, height)
      } else {
        image = image.resize(width)
      }
      if (format) {
        image = image.toFormat(sharp.format[format])
      }

      // Pass the modified chunk to the callback
      image.toBuffer((err, data) => {
        if (err) {
          return callback(err)
        }
        callback(null, data)
      })
    }
  })
  return transformer
}

/**
 * Uploads a file to a CDN using a writable stream.
 * This function creates a writable stream that uploads data to a specified
 * remote path on a CDN.
 *
 * @param {string} remotePath - The remote path on the CDN where the file will be uploaded.
 * @returns {Writable} A writable stream that uploads data to the specified CDN endpoint.
 */
export const uploadToCDN = (remotePath: string): Writable => {
  const url = `https://${BUNNY_HOSTNAME}/${BUNNY_STORAGE_ZONE}${remotePath}`
  const headers = {
    AccessKey: BUNNY_ACCESS_KEY,
    'Content-Type': 'application/octet-stream'
  }

  return new Writable({
    write(chunk, encoding, callback) {
      axios
        .put(url, chunk, { headers })
        .then(() => callback())
        .catch((error) => callback(error))
    }
  })
}

/**
 * Asynchronously executes a pipeline of streams in sequence.
 * @param {...Stream} streams - An array of streams to be piped together.
 * @returns {Promise<Stream>} - A promise that resolves with the last stream
 * in the pipeline when the execution is complete, or rejects with an error
 * if an error occurs.
 */
export const execPipeline = async (
  ...streams: pump.Stream[]
): Promise<pump.Stream> => {
  return new Promise(function (resolve, reject) {
    const lastStream = pump(...streams, function (error) {
      if (error) {
        reject(error)
        return
      }
      resolve(lastStream)
    })
  })
}
