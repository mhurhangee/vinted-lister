import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightCircleIcon } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-7rem)] pb-12 px-2 sm:px-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-4xl text-center">Welcome to <span className="font-pacifico">VintedLister</span></CardTitle>
          <CardDescription className="text-center text-lg mt-2">
            Your AI-powered assistant for listing used clothes on Vinted
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            VintedLister helps you quickly and easily create attractive listings for your used clothes.
            Simply upload a photo, and our AI will generate a detailed description for your item.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/listing-generator">
              Get Started <ArrowRightCircleIcon className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">Start selling your clothes faster and easier than ever before!</p>
        </CardFooter>
      </Card>
    </div>
  )
}