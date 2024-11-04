import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { clothingSchema } from './schema'

type ImageWithTag = {
  dataUrl: string;
  tag: string;
}

const getPromptForTag = (tag: string) => {
  switch (tag) {
    case 'Please select image type':
      return 'Analyze this image of a clothing item and provide relevant details.'
    case 'front':
      return 'Analyze the front view of this clothing item and describe its main features.'
    case 'back':
      return 'Examine the back of this clothing item and note any distinctive elements.'
    case 'side':
      return 'Analyze the side view of this clothing item and describe its profile and fit.'
    case 'tags':
      return 'Examine any tags visible in this image and extract relevant information like brand, size, or care instructions.'
    case 'label':
      return 'Analyze this label and extract information about the brand, size, material composition, and care instructions.'
    case 'imperfection':
      return 'Closely examine this image for any imperfections, wear, or damage to the clothing item.'
    case 'close-up':
      return 'Analyze this close-up view of the clothing item, focusing on fabric texture, pattern details, or specific features.'
    default:
      return 'Analyze this image of a clothing item and provide relevant details.'
  }
}

export async function POST(req: Request) {
  const { images } = await req.json()

  if (!images || images.length === 0) {
    return new Response('No images provided', { status: 400 })
  }

  const messages = images.map((img: ImageWithTag) => ({
    role: 'user' as const,
    content: [
      { type: 'text', text: getPromptForTag(img.tag) },
      { type: 'image', image: img.dataUrl.split(',')[1] },
    ],
  }))

  const result = await streamObject({
    model: openai('gpt-4o-mini'),
    schema: clothingSchema,
    system: 'You are an expert in analyzing clothing items for online marketplaces like Vinted. Provide a detailed description based on the images provided. Include the title, description, category, brand, size, condition, colors, material, suggested price, and parcel size. Only include information that is visible in the images and is factual, do not include subjective opinions.',
    messages,
  })

  return result.toTextStreamResponse()
}