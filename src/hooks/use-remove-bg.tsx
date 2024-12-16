import { useMutation } from "@tanstack/react-query";

interface ImageGenerationResponse {
  base64img: string;
}

interface RemoveBgRequestData {
  image: string;
}

export default function useRemoveBG() {
  return useMutation<ImageGenerationResponse, Error, RemoveBgRequestData>({
    mutationFn: async (data) => {
      const response = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to remove background');
      }

      return response.json();
    },
  });
}