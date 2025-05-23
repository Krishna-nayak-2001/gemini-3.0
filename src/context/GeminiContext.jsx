import React, { createContext, useState } from "react";
import { generateContent } from "../geminiApi";

export const Context = createContext();

const GeminiContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResponse, setShowResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geminiData, setGeminiData] = useState("");

  const delayResponse = (index, next) => {
    setTimeout(() => {
      setGeminiData((prev) => prev + next);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResponse(false);
  };

  const onSent = async (prompt) => {
    setGeminiData("");
    setLoading(true);
    setShowResponse(true);

    let response;
    let actualPrompt;

    if (prompt !== undefined) {
      response = await generateContent(prompt);
      setCurrentPrompt(prompt);
      actualPrompt = prompt;
    } else {
      setPrevPrompt((prev) => [...prev, input]);
      response = await generateContent(input);
      setCurrentPrompt(input);
      actualPrompt = input;
    }

    try {
      if (!response) {
        setGeminiData("Something went wrong or no response received.");
        setLoading(false);
        return;
      }

      let resArr = response.split("**");
      let newRes = "";

      for (let i = 0; i < resArr.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newRes += resArr[i];
        } else {
          newRes += "<b>" + resArr[i] + "</b>";
        }
      }
      console.log(newRes);

      let newRes2 = newRes.split("*").join("<br/>");
      let newResArr = newRes2.split(" ");
      for (let i = 0; i < newResArr.length; i++) {
        const next = newResArr[i];
        delayResponse(i, next + " ");
      }
    } catch (error) {
      console.error("Error generating content:", error);
      setGeminiData("An error occurred while generating content.");
    }

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    input,
    setInput,
    currentPrompt,
    setCurrentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResponse,
    setShowResponse,
    loading,
    setLoading,
    geminiData,
    setGeminiData,
    onSent,
    newChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default GeminiContextProvider;
