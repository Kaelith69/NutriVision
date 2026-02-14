
import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem } from "../types";

// Always create a new instance or use the globally available API_KEY from process.env
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

const foodAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "A unique temporary ID for this item" },
          name: { type: Type.STRING, description: "Name of the food item" },
          portionGrams: { type: Type.NUMBER, description: "Estimated weight in grams" },
          calories: { type: Type.NUMBER, description: "Total calories for this portion" },
          protein: { type: Type.NUMBER, description: "Protein in grams" },
          fat: { type: Type.NUMBER, description: "Fat in grams" },
          carbs: { type: Type.NUMBER, description: "Carbohydrates in grams" },
          fiber: { type: Type.NUMBER, description: "Fiber in grams" },
          sodium: { type: Type.NUMBER, description: "Sodium in milligrams" },
          confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" }
        },
        required: ["id", "name", "portionGrams", "calories", "protein", "fat", "carbs", "confidence"]
      }
    }
  },
  required: ["items"]
};

export const analyzeFoodImage = async (base64Image: string, scaleContext?: string): Promise<FoodItem[]> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `Analyze this meal photo. Identify all food items, estimate their portion weights in grams, and provide a detailed nutritional breakdown. 
            ${scaleContext ? `Context for scale: ${scaleContext}` : 'If a plate or common object is visible, use it to estimate volume.'}
            Output MUST be structured JSON following the provided schema. Be scientifically objective.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: foodAnalysisSchema,
        temperature: 0.1,
      }
    });

    if (!response.text) {
      throw new Error("Analysis engine failed to produce a response.");
    }

    const result = JSON.parse(response.text);
    return result.items || [];
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
