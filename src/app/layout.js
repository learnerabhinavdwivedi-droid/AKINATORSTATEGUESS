import './globals.css'

export const metadata = {
  title: 'Ankanitor — The Indian State Genie',
  description: 'Ankanitor is a highly intelligent Akinator-style game that guesses which Indian State or Union Territory you are thinking of using progressive deduction and entropy-maximizing questioning.',
  keywords: 'Akinator, India, States, Geography, Game, AI',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  openGraph: {
    title: 'Ankanitor — Indian States Genie',
    description: 'Think of an Indian State. The Genie will guess it.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
