/**
 * usePayloadData - Hook générique avec pattern fallback intelligent
 * 
 * Usage: const { data, loading, error, isFromPayload } = usePayloadData(fetchFn, fallbackData)
 * 
 * - Si Payload est accessible → données Payload
 * - Si Payload timeout ou erreur → fallback sur les données statiques de constants.js
 * - isFromPayload indique la source des données
 */

import { useState, useEffect } from 'react';

export const usePayloadData = (fetchFn, fallbackData, deps = []) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFromPayload, setIsFromPayload] = useState(false);

  useEffect(() => {
    let cancelled = false;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchFn();
        
        if (!cancelled && result) {
          // Si le CMS retourne un tableau vide, on garde le fallback
          if (result && (!Array.isArray(result) || result.length > 0)) {
            setData(result);
            setIsFromPayload(true);
          } else {
            setData(fallbackData);
            setIsFromPayload(false);
          }
        }
      } catch (err) {
        if (!cancelled) {
          // Erreur Payload → utiliser les données statiques silencieusement
          setData(fallbackData);
          setIsFromPayload(false);
          setError(err); // On masque l'erreur à l'utilisateur — fallback transparent
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  
  return { data, loading, error, isFromPayload };
};

export default usePayloadData;
