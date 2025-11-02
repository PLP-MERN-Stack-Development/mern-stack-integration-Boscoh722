import { useState, useCallback } from 'react';

const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api${endpoint}`, {  // ← /api ensures proxy
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const text = await response.text();  // Get raw text for debugging
        console.error('Raw response:', text);  // Check console for HTML
        throw new Error(`HTTP ${response.status}: ${text.substring(0, 200)}`);
      }

      const json = await response.json();
      setData(Array.isArray(json) ? json : [json]);
    } catch (err) {
      setError(err.message || 'Fetch failed');
      setData([]);
      console.error('API error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
};

export default useApi;