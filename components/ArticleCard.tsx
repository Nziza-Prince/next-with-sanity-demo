// components/ArticleCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { Article } from '../types/sanity'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Check if image exists and has a URL
  const mainImageUrl = article.mainImage?.asset?.url
  const authorImageUrl = article.author.image?.asset?.url
  const voiceoverUrl = article.voiceover?.asset?.url

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {mainImageUrl ? (
        <div className="relative h-48 w-full">
          <Image
            src={mainImageUrl}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <div className="relative h-48 w-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
          </span>
          {article.categories && article.categories.length > 0 && (
            <div className="flex gap-2">
              {article.categories.map((category) => (
                <span key={category._id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {category.title}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <h2 className="text-2xl text-black font-bold mb-2">{article.title}</h2>
        
        {article.excerpt && (
          <p className="text-gray-900 mb-4">{article.excerpt}</p>
        )}
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {authorImageUrl ? (
              <div className="relative h-15 w-19 mr-2">
                <Image
                  src={authorImageUrl}
                  alt={article.author.name}
                  fill
                  className="rounded-full"
                />
              </div>
            ) : (
              <div className="relative h-8 w-8 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  {article.author.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-sm font-medium">{article.author.name}</span>
          </div>
          
          {voiceoverUrl && (
            <audio controls className="h-8">
              <source src={voiceoverUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        
        <Link 
          href={`/articles/${article.slug.current}`}
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}