import { NextRequest, NextResponse } from 'next/server';
import { RemoveBgResult, RemoveBgError, removeBackgroundFromImageUrl, removeBackgroundFromImageBase64 } from "remove.bg";


function isValidImageUrl(string: string) {
  try {
    const url = new URL(string);
    if (!url.protocol || !url.host) return false;
    
    if (!url.protocol.match(/^https?:/)) return false;
    
    return true;
  } catch (_) {
    return false;
  }
}

function isBase64Image(string: string) {
  if (string.startsWith('data:image')) {
    const base64Data = string.split(',')[1];
    return base64Data;
  } else {
    try {
      return Buffer.from(string, 'base64').length > 0 ? string : null;
    } catch {
      return null;
    }
  }
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    try {
      let result: RemoveBgResult;

      if (isValidImageUrl(image)) {
        result = await removeBackgroundFromImageUrl({
          url: image,
          apiKey: process.env.REMOVE_BG_API_KEY as string,
          size: "full",
          format: "png",
        });
      } else {
        const base64Data = isBase64Image(image);
        if (!base64Data) {
          return NextResponse.json({ 
            error: 'Invalid image format. Please provide a valid URL or base64 image.' 
          }, { status: 400 });
        }

        result = await removeBackgroundFromImageBase64({
          base64img: base64Data,
          apiKey: process.env.REMOVE_BG_API_KEY as string,
          size: "full",
          format: "png",
        });
      }

      return NextResponse.json({ 
        base64img: result.base64img 
      });

    } catch (error) {
      console.error('Remove.bg API error:', error);
      const errors = error as Array<RemoveBgError>;
      
      if (Array.isArray(errors) && errors.length > 0) {
        return NextResponse.json({
          error: 'Failed to remove background',
          details: errors
        }, { status: 400 });
      }

      return NextResponse.json({
        error: 'Failed to process image'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}