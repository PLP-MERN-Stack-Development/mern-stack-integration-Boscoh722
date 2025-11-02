import { useState, useCallback } from 'react';

const useApi = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (endpoint, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : null,
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Network response was not ok');
      }
      const json = await res.json();
      setData(Array.isArray(json) ? json : [json]); // Normalize to array
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []); // Empty deps: fetchData is stable across renders

  return { data, loading, error, fetchData };
};

export default useApi;