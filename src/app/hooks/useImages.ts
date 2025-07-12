import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useImages(query: string = '') {
  const { data, error, mutate } = useSWR(`/api/images?q=${query}`, fetcher);

  const addImage = async (image: { name: string; base64: string; type: string }) => {
    await fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image),
    });
    mutate();
  };

  const deleteImage = async (id: string) => {
    await fetch(`/api/images?id=${id}`, { method: 'DELETE' });
    mutate();
  };

  return { images: data, addImage, deleteImage, isLoading: !data && !error, isError: error };
}
