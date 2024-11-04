import { z } from 'zod'

export const clothingSchema = z.object({
  title: z.string().describe('A catchy title for the clothing item listing'),
  description: z.string().describe('A generated description for listing the item, including any notable features or flaws'),
  category: z.string().describe('The category and subcategories of the clothing item (e.g., 1Tops > T-Shirts`, `Skirt > Midi`), etc'),
  brand: z.string().describe('The brand of the item'),
  size: z.string().describe('The size of the item'),
  condition: z.enum(['New with tags', 'New without tags', 'Very good', 'Good', 'Satisfactory']).describe('The condition of the itemx'),
  colors: z.string().describe('The primary colors of the item (up to three)'),
  material: z.string().describe('The primary material of the item'),
  suggestedPrice: z.number().describe('A suggested selling price in GBP £'),
  parcelSize: z.enum(['Small', 'Medium', 'Large']).describe('The size of the parcel for shipping. Examples include small: t-shirts and shorts; medium: dresses and jeans; large: coats and boots')
})