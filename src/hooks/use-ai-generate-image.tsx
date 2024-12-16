import { useMutation } from "@tanstack/react-query";

interface ImageGenerationResponse {
  imageUrl?: string;
  message?: string;
  error?: string;
}


export default function useAiGenerateImage() {
  const mutation = useMutation<ImageGenerationResponse, Error, { prompt: string }>({
    mutationFn: async (data) => {
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      return response.json();
    }
  });

  return mutation;
}