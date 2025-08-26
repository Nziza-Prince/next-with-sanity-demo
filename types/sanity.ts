// types/sanity.ts
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    url: string;
  };
}

export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
    url: string;
  };
}

export interface Author {
  _id: string;
  _type: 'author';
  name: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  image?: SanityImage;
  bio?: any[];
}

export interface Category {
  _id: string;
  _type: 'category';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
}

export interface Article {
  _id: string;
  _type: 'article';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  author: Author;
  mainImage: SanityImage;
  categories?: Category[];
  publishedAt: string;
  excerpt?: string;
  body: any[];
  voiceover?: SanityFile;
}