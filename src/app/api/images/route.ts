"use server";
import { unsplash } from '@/lib/unsplash';
import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_IMAGES_COUNT = 50;
const DEFAULT_COLLECTION_IDS = ["317099"]; // it is collections or albums of photos


export async function GET(request: NextRequest) {
  try {
    const images = await unsplash.photos.getRandom({
      count: DEFAULT_IMAGES_COUNT,
      collectionIds: DEFAULT_COLLECTION_IDS,
    });

    if (images.errors) {
      throw new Error("Failed to fetch images from Unsplash");
    }

    const response = Array.isArray(images.response) 
      ? images.response 
      : [images.response];

    return NextResponse.json({ 
      data: { images: response } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : "Unexpected error occurred" 
      }, 
      { status: 400 }
    );
  }
}