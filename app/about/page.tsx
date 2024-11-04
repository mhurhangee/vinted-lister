
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, PackageOpen, Sparkles, Upload, Tags, Copy, PenTool } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-3xl">About VintedLister</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl">What is VintedLister?</h2>
            <p className="text-muted-foreground">
              VintedLister is an AI-powered tool designed to streamline the process of creating listings for your used clothes on Vinted.com. 
              By leveraging advanced image recognition and natural language processing, we help you create professional, detailed listings in seconds 
              rather than minutes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl">Key Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3">
                <Upload className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Multiple Image Upload</h3>
                  <p className="text-sm text-muted-foreground">Upload up to 6 images per item for comprehensive analysis</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Tags className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Smart Tagging</h3>
                  <p className="text-sm text-muted-foreground">Tag images as front, back, side views, or close-ups for better analysis</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Sparkles className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">AI-Powered Descriptions</h3>
                  <p className="text-sm text-muted-foreground">Generate detailed, accurate descriptions automatically</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <PackageOpen className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Shipping Guidance</h3>
                  <p className="text-sm text-muted-foreground">Get parcel size recommendations based on item type</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <PenTool className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Price Suggestions</h3>
                  <p className="text-sm text-muted-foreground">Receive market-informed price suggestions for your items</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Copy className="h-5 w-5 mt-1 text-primary" />
                <div>
                  <h3 className="font-semibold">Easy Copying</h3>
                  <p className="text-sm text-muted-foreground">Copy any generated content with a single click</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions or suggestions? We&#39;d love to hear from you! Reach out through any of the channels below:
            </p>
            <div className="flex space-x-4">
              <Link 
                href="mailto:m.hurhangee@me.com"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
              >
                <Mail className="h-5 w-5" />
                <span>m.hurhangee@me.com</span>
              </Link>
              <Link 
                href="https://github.com/mhurhangee/vinted-lister"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span>GitHub Repository</span>
              </Link>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}