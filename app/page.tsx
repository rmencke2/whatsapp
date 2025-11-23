import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">WhatsApp Business Assistant</h1>
        <nav className="space-x-4 mb-8">
          <Link href="/pricing" className="text-blue-600 hover:underline">
            Pricing
          </Link>
          <Link href="/dashboard/onboarding" className="text-blue-600 hover:underline">
            Onboarding
          </Link>
        </nav>
        <p className="text-lg text-gray-700">
          Welcome to your WhatsApp Business Assistant dashboard.
        </p>
      </div>
    </main>
  )
}

