import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

interface ImageGenerationRequest {
  prompt: string;
}


export async function POST(request: NextRequest) {
  try {
    const body: ImageGenerationRequest = await request.json();
    const { prompt } = body;

    if (!prompt || prompt.trim() === '') {
      return NextResponse.json(
        { error: 'Prompt is required' }, 
        { status: 400 }
      );
    }

    const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN);

    const imageBlob = await hf.textToImage({
      inputs: prompt,
      model: 'stabilityai/stable-diffusion-3.5-large',
    });

    const arrayBuffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const imageUrl = `data:image/png;base64,${base64Image}`;

    return NextResponse.json({ 
      imageUrl,
      message: 'Image generated successfully' 
    });

  } catch (error) {
    console.error('Image generation error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate image',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}