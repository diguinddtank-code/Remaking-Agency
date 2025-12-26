
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

// Store chat session globally to maintain conversation history across calls
let chatSession: Chat | null = null;

// Initialize the chat session with the specified system instructions and model
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Use process.env.API_KEY directly as per SDK requirements
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'REM-AI', the strategic consultant for Remaking Agency.
      Remaking is a premium marketing agency focused on exponential results for the US Market.
      
      Core Services:
      - AI Automation: Intelligent workflows and CRM agents.
      - Performance Traffic: Meta Ads, Google Ads, TikTok Ads dominance.
      - Cinematic Content: High-end production and media strategy.
      - Ecosystem Management: Complete social media authority.
      
      Tone: Authoritative, visionary, professional, and highly business-focused (US Corporate/Tech style). Use emojis sparingly like 📈, 🤖, 🎥, 💎.
      
      Keep answers short (max 60 words), punchy, and direct. If asked about pricing, state that every protocol is custom-engineered for the client's scale.`,
    },
  });

  return chatSession;
};

// Handle sending messages to the Gemini model and extracting the generated text
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    // sendMessage returns GenerateContentResponse
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    // Correctly access .text as a property, not a method
    return response.text || "Transmission failed. Re-aligning satellites...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Strategic connection error. Please retry uplink.";
  }
};
