// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { format } from 'date-fns'
import { PortableText } from '@portabletext/react'
import { Article } from '../../../types/sanity'
import Link from 'next/link'

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/articles/${slug}`, {
      next: { revalidate: 60 }
    })
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error('Failed to fetch article')
    }
    return res.json()
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}

// 🔹 Use `any` for the PageProps workaround
export default async function ArticlePage({ params }: any) {
  const article = await getArticle(params.slug)
  if (!article) notFound()

  const mainImageUrl = article.mainImage?.asset?.url
  const authorImageUrl = article.author.image?.asset?.url
  const voiceoverUrl = article.voiceover?.asset?.url

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; Back to articles
          </Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white shadow-md rounded-lg my-8">
        <h1 className="text-4xl text-black font-bold mb-4">{article.title}</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {authorImageUrl ? (
              <div className="relative h-12 w-12 mr-3">
                <Image src={authorImageUrl} alt={article.author.name} fill className="rounded-full" />
              </div>
            ) : (
              <div className="relative h-12 w-12 mr-3 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm text-black">{article.author.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <div>
              <p className="font-medium text-black">{article.author.name}</p>
              <p className="text-sm text-gray-800">
                {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
              </p>
            </div>
          </div>

          {voiceoverUrl && (
            <audio controls className="h-10">
              <source src={voiceoverUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>

        {mainImageUrl ? (
          <div className="relative h-96 w-full mb-8">
            <Image src={mainImageUrl} alt={article.title} fill style={{ objectFit: 'cover' }} className="rounded-lg" />
          </div>
        ) : (
          <div className="relative h-96 w-full mb-8 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}

        <div className="prose max-w-none text-black">
          <PortableText value={article.body} />
        </div>

        {article.categories && article.categories.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {article.categories.map((category) => (
                <span key={category._id} className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                  {category.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}
