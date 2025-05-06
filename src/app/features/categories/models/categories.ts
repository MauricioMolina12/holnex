export interface category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface productsPerCategory {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: category,
    images: string[];
}
