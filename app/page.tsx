// app/page.tsx
import ArticleCard from '../components/ArticleCard'
import { Article } from '../types/sanity'
import Link from 'next/link';

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/articles`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    })
    
    if (!res.ok) {
      throw new Error('Failed to fetch articles')
    }
    
    return res.json()
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export default async function Home() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Latest News</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        )}
        // Update your main page.tsx to include admin link
// Add this to your main page component
<Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
  Admin Portal
</Link>
      </main>
    </div>
  )
}