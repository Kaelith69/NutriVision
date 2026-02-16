
import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem } from "../types";

const getAI = () => {
  const apiKey = localStorage.getItem('gemini_api_key') || process.env.API_KEY || "";
  return new GoogleGenAI({ apiKey });
};

const foodAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING, description: "Unique item ID" },
          name: { type: Type.STRING, description: "Common name of the food" },
          portionGrams: { type: Type.NUMBER, description: "Estimated weight in grams" },
          calories: { type: Type.NUMBER, description: "Total kilocalories" },
          protein: { type: Type.NUMBER, description: "Protein in grams" },
          fat: { type: Type.NUMBER, description: "Total fats in grams" },
          carbs: { type: Type.NUMBER, description: "Total carbohydrates in grams" },
          fiber: { type: Type.NUMBER, description: "Dietary fiber in grams" },
          sodium: { type: Type.NUMBER, description: "Sodium in milligrams" },
          confidence: { type: Type.NUMBER, description: "Detection confidence score (0-1)" }
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
      model: 'gemini-1.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: `ACT AS A QUANTITATIVE DIETITIAN. 
            TASK: Volumetric plate decomposition.
            REFERENCE: ${scaleContext || 'Standard visual cues.'}
            LOGIC:
            1. Identify every discrete food component.
            2. Infer component density based on food type.
            3. Estimate physical volume in cubic centimeters using standard plate/utensil references.
            4. Convert volume to mass (grams).
            5. Map mass to macro/micro-nutrient data.
            OUTPUT: Valid JSON items according to schema.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: foodAnalysisSchema,
        temperature: 0.1,
      }
    });

    const text = response.text;
    if (!text) throw new Error("Vision interface timeout.");

    const result = JSON.parse(text);
    return result.items || [];
  } catch (error) {
    console.error("Metabolic Analysis Error:", error);
    throw error;
  }
};
