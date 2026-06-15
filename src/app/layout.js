import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })

export const metadata = {
  title: 'Akinator — The Indian State Genie',
  description: 'Akinator is a highly intelligent Akinator-style game that guesses which Indian State or Union Territory you are thinking of using progressive deduction and entropy-maximizing questioning.',
  keywords: 'Akinator, India, States, Geography, Game, AI',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  openGraph: {
    title: 'Akinator — Indian States Genie',
    description: 'Think of an Indian State. The Genie will guess it.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  )
}
