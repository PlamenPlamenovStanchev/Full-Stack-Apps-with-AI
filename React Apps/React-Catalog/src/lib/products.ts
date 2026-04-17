import { supabase } from './supabase';
import type { Product } from '../types/product';

export const PRODUCTS_PER_PAGE = 6;

export async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .order('id', { ascending: true });

  if (error) {
    throw error;
  }

  return (data ?? []) as Product[];
}

export async function getProducts(params: { page: number; pageSize?: number; keyword?: string }) {
  const { page, pageSize = PRODUCTS_PER_PAGE, keyword = '' } = params;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from('products').select('*', { count: 'exact' }).order('id', { ascending: true });

  const normalizedKeyword = keyword.trim();
  if (normalizedKeyword) {
    query = query.or(`title.ilike.%${normalizedKeyword}%,description.ilike.%${normalizedKeyword}%`);
  }

  const { data, count, error } = await query.range(from, to);

  if (error) {
    throw error;
  }

  return {
    items: (data ?? []) as Product[],
    totalCount: count ?? 0
  };
}

export async function getProductById(id: number) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
}
