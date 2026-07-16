import { usePayloadData } from './usePayloadData';
import { api } from '../services/payloadClient';
import { SERVICES } from '../config/constants';

/**
 * useServices - Récupère les services depuis Payload CMS avec fallback sur SERVICES statiques
 */
export const useServices = () => {
  return usePayloadData(
    () => api.services(),
    SERVICES
  );
};
