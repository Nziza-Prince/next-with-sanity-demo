// app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getArticleBySlug } from '../../../../lib/sanity'

export async function GET(req: NextRequest) {
  try {
    // Extract slug from the URL
    const url = new URL(req.url)
    const slug = url.pathname.split('/').pop() // gets last segment

    if (!slug) {
      return NextResponse.json({ message: 'Slug is required' }, { status: 400 })
    }

    const article = await getArticleBySlug(slug)

    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json({ message: 'Error fetching article' }, { status: 500 })
  }
}
