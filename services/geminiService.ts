import { GoogleGenAI } from "@google/genai";
import type { Emotion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateImageForEmotion = async (emotion: Emotion): Promise<string> => {
    try {
        // Updated prompt to use the specific imagePrompt from the emotion object for more varied and contextual images.
        const prompt = `Create a beautiful, artistic, high-resolution illustration that visually represents the following scene or feeling: "${emotion.imagePrompt}". The style should be warm, aesthetically pleasing, and suitable as a background. IMPORTANT: The image must not contain any text, letters, or words.`;
        
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
        });

        if (!response.generatedImages || response.generatedImages.length === 0) {
            throw new Error("No images were generated.");
        }

        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        return imageUrl;
    } catch (error) {
        console.error("Error generating image from Gemini API:", error);
        if (error instanceof Error && (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED"))) {
            throw new Error("API_QUOTA_EXCEEDED");
        }
        throw new Error("Failed to generate image.");
    }
};