// lib/sanity.ts
import { createClient } from '@sanity/client'
import { Article } from '../types/sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN,
})

// Type-safe query functions
export async function getArticles(): Promise<Article[]> {
  const query = `*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    author->{
      _id, 
      name, 
      image{
        asset->{
          _id,
          url
        }
      }
    },
    mainImage{
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    excerpt,
    "categories": categories[]->{_id, title},
    voiceover{
      asset->{
        _id,
        url
      }
    }
  }`
  
  return await client.fetch(query)
}

export async function getArticleBySlug(slug: string): Promise<Article> {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    author->{
      _id, 
      name, 
      image{
        asset->{
          _id,
          url
        }
      },
      bio
    },
    mainImage{
      asset->{
        _id,
        url
      }
    },
    publishedAt,
    excerpt,
    body,
    "categories": categories[]->{_id, title},
    voiceover{
      asset->{
        _id,
        url
      }
    }
  }`
  
  return await client.fetch(query, { slug })
}