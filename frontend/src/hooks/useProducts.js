import { usePayloadData } from './usePayloadData';
import { api } from '../services/payloadClient';
import { PRODUCTS } from '../config/constants';

/**
 * useProducts - Récupère les produits depuis Payload CMS avec fallback sur PRODUCTS statiques
 */
export const useProducts = (categoryFilter = null) => {
  const category = categoryFilter || 'all';

  const fallback = categoryFilter
    ? PRODUCTS.filter(p => p.category === categoryFilter)
    : PRODUCTS;

  return usePayloadData(
    () => api.products(category),
    fallback,
    [categoryFilter]
  );
};
