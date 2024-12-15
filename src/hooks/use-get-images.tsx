import { useQuery } from "@tanstack/react-query";
import UnsplashImageResponseType from "@/app/api/images/types";


export default function useGetImages() {
  const query = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await fetch('/api/images');

      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data = await response.json();
      return data.data.images as UnsplashImageResponseType[];
    },
  });

  return query;
}