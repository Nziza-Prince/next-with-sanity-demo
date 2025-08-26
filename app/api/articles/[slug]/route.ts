// app/api/articles/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getArticleBySlug } from '../../../../lib/sanity'

interface RouteParams {
  params: {
    slug: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const article = await getArticleBySlug(params.slug)
    
    if (!article) {
      return NextResponse.json(
        { message: 'Article not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(article)
  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { message: 'Error fetching article', error },
      { status: 500 }
    )
  }
}