import { GoogleGenAI } from "@google/genai";
import { AIModuleType } from "../types";

// Types
export interface GenerationResult {
  imageUrl: string;
  recommendation?: string;
}

interface GenerateParams {
  image: string; // Base64
  module: AIModuleType;
  options: Record<string, string>;
  modelId?: string;
  apiKey: string;
}

// Helper to sanitize base64
const cleanBase64 = (b64: string) => b64.replace(/^data:image\/(png|jpeg|jpg|webp);base64,/, '');

export const generateBeautyEdit = async ({
  image,
  module,
  options,
  modelId = 'gemini-3-pro-image-preview',
  apiKey
}: GenerateParams): Promise<GenerationResult> => {

  const ai = new GoogleGenAI({ apiKey });
  
  // Construct a prompt based on the module
  let promptText = "";
  const style = options.style || 'natural';
  const intensity = options.intensity || 'medium';
  const color = options.color || 'matching';

  switch (module) {
    case AIModuleType.Makeup:
      promptText = `Apply a ${style} makeup look with ${intensity} intensity. Focus on eyeshadow, lipstick, and blush. Keep facial features and identity exactly the same. High fashion salon style.`;
      break;
    case AIModuleType.Nails:
      promptText = `Change the nail polish to a ${color} color with a ${style} finish. Keep the hands and skin tone exactly the same. Focus only on the nails.`;
      break;
    case AIModuleType.Hair:
      promptText = `Change the hairstyle to ${style}. Keep the face and identity exactly the same. Realistic salon finish.`;
      break;
    case AIModuleType.HairColor:
      promptText = `Change the hair color to ${color}. Keep the style and length the same. Keep the face exactly the same.`;
      break;
    case AIModuleType.Bridal:
      promptText = `Transform into a bridal look. Soft glam makeup, elegant hairstyle suitable for a wedding. White dress hint if visible. Keep identity 100% same.`;
      break;
    case AIModuleType.Skin:
      promptText = `Retouch skin to look glowing and smooth. Remove blemishes but keep skin texture realistic. Do not make it look plastic. "Glass skin" effect.`;
      break;
    default:
      promptText = `Enhance the beauty of this image. Salon quality retouch.`;
  }

  // Add constraints
  promptText += " Return ONLY the modified image. Maintain high resolution. Preserve the original lighting and background.";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64(image)
            }
          },
          { text: promptText }
        ]
      },
      config: {
        // Nano Banana models don't support responseMimeType/Schema usually, 
        // but imageConfig is valid for 3-pro-image-preview
        imageConfig: {
            aspectRatio: "1:1" // Defaulting to square for consistency
        }
      }
    });

    // Extract image
    let generatedImage = '';
    const parts = response.candidates?.[0]?.content?.parts;
    
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          generatedImage = `data:image/jpeg;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!generatedImage) {
      throw new Error("No image generated.");
    }

    return {
      imageUrl: generatedImage,
      recommendation: `Based on this ${module} look, we recommend booking our "${module === 'bridal' ? 'Full Bridal Package' : 'Premium Service'}" with Haneen.`
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};