'use client'

import { useState, useCallback } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import Image from 'next/image'
import { clothingSchema } from '@/app/api/analyze-clothing/schema'
import { X, Copy, Check, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type ImageWithTag = {
  dataUrl: string;
  tag: string;
}

const imageTags = ['Please select image type', 'front', 'back', 'side', 'tags', 'label', 'imperfection', 'close-up']

const MAX_WIDTH = 800
const MAX_HEIGHT = 800
const QUALITY = 0.8

const getFileSizeInMB = (file: File | Blob): number => {
  return file.size / (1024 * 1024);
}

const resizeImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')
    img.onload = () => {
      console.log(`Original image size: ${getFileSizeInMB(file).toFixed(2)} MB`)
      const canvas = document.createElement('canvas')
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width
          width = MAX_WIDTH
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height
          height = MAX_HEIGHT
        }
      }

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      ctx!.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log(`Resized image size: ${getFileSizeInMB(blob).toFixed(2)} MB`)
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result as string)
            reader.readAsDataURL(blob)
          } else {
            reject(new Error('Failed to create blob'))
          }
        },
        'image/jpeg',
        QUALITY
      )
    }
    img.onerror = (error) => reject(error)
    img.src = URL.createObjectURL(file)
  })
}

export default function ClothingAnalyzer() {
  const [images, setImages] = useState<ImageWithTag[]>([])
  const [error, setError] = useState<string | null>(null)
  const { object, submit, isLoading } = useObject({
    api: '/api/analyze-clothing',
    schema: clothingSchema
  })
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const remainingSlots = 6 - images.length
      const filesToUpload = Array.from(files).slice(0, remainingSlots)
      
      let totalOriginalSize = 0
      let totalResizedSize = 0
      
      for (const file of filesToUpload) {
        try {
          totalOriginalSize += file.size
          const resizedDataUrl = await resizeImage(file)
          const resizedBlob = await fetch(resizedDataUrl).then(r => r.blob())
          totalResizedSize += resizedBlob.size
          setImages(prev => [...prev, { dataUrl: resizedDataUrl, tag: 'Please select image type' }])
        } catch (error) {
          console.error('Error resizing image:', error)
          toast.error(`Failed to process image: ${file.name}`)
        }
      }
      
      console.log(`Total original size: ${(totalOriginalSize / (1024 * 1024)).toFixed(2)} MB`)
      console.log(`Total resized size: ${(totalResizedSize / (1024 * 1024)).toFixed(2)} MB`)
    }
  }, [images.length])

  const handleTagChange = (index: number, tag: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, tag } : img))
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleAnalyze = async () => {
    setError(null)
    if (images.length > 0) {
      try {
        await submit({ images })
      } catch (err) {
        console.error('Error during analysis:', err)
        setError('An error occurred during image analysis. Please try again.')
      }
    }
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field)
      toast.info(`${field} has been copied to your clipboard.`)
      setTimeout(() => setCopiedField(null), 2000)
    })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Vinted Listing Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            Quickly and easily create attractive listings for your used clothes.
            Simply upload photos, tag them and our AI will generate a detailed description for your item.
          </p>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4"
            multiple
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={img.dataUrl}
                    alt={`Uploaded clothing ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <CardFooter className="p-2">
                  <Select value={img.tag} onValueChange={(value) => handleTagChange(index, value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {imageTags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardFooter>
              </Card>
            ))}
          </div>
          {images.length >= 6 && (
            <p className="text-sm text-muted-foreground">Maximum number of images (6) reached.</p>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleAnalyze} disabled={images.length === 0 || isLoading} className="w-full">
            {isLoading ? 'Analyzing...' : 'Create Listing from Images'}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        {isLoading ? (
          <div className="w-full space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : object ? (
          <div className="w-full space-y-4">
            {Object.entries(object).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold capitalize">{key}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => copyToClipboard(value.toString(), key)}
                  >
                    {copiedField === key ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    <span className="sr-only">Copy {key} to clipboard</span>
                  </Button>
                </div>
                <p className="whitespace-pre-wrap">
                  {key === 'suggestedPrice' ? `£${(value as number).toFixed(2)}` : value as string}
                </p>
              </div>
            ))}
          </div>
        ) : null}
      </CardFooter>
    </Card>
  )
}