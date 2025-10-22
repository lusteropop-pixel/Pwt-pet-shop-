import '../styles/globals.css'
import { useEffect, useState } from 'react'

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    if (saved === 'dark') document.documentElement.classList.add('dark')
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <header className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-semibold">PWT Pet Shop</h1>
          <div className="space-x-2">
            <a href="/" className="underline">Home</a>
            <a href="/admin" className="underline">Admin</a>
            <button onClick={toggle} className="ml-4 px-3 py-1 border rounded">Toggle theme</button>
          </div>
        </header>
        <main className="p-6">
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}
