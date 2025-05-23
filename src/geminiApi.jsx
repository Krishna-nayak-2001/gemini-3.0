import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDT_GSXkOUKlNKFsdzrZmDsh0OeHYw_nxw");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (prompt) => {
    const result = await model.generateContent(prompt);
    const text = await result.response.text(); 
    // console.log("text", text);
    return text; 
}