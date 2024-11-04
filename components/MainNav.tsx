import Link from "next/link"

export function MainNav() {
  return (
    <nav className="flex flex-col items-center space-y-2 w-full">

      <div className="flex items-center space-x-6 text-sm font-medium">
      <Link href="/" className="flex items-center sm:mr-60">
        <span className="font-pacifico text-xl font-bold">VintedLister</span>
      </Link>
        <Link href="/listing-generator" className="transition-colors hover:text-foreground/80 text-foreground/60">
          Listing Generator
        </Link>
        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
          About
        </Link>
      </div>
    </nav>
  )
}