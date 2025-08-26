// app/api/articles/route.ts
import { NextResponse } from 'next/server'
import { getArticles } from '../../../lib/sanity'

export async function GET() {
  try {
    const articles = await getArticles()
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { message: 'Error fetching articles' },
      { status: 500 }
    )
  }
}