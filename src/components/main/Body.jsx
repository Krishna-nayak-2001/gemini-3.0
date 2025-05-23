import React, { useContext, useState } from "react";
import "./body.css";
import { assets } from "../../assets/assets";
import { cardData } from "../../config";
import { Context } from "../../context/GeminiContext";

const Body = () => {
  const {
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
  } = useContext(Context);

  // const [geminiData, setGeminiData] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [input, setInput] = useState("");

  // const geminiApiRes = async () => {
  //   // console.log("loading...............");
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           contents: [
  //             {
  //               parts: [{ text: input }],
  //             },
  //           ],
  //         }),
  //       }
  //     );
  //     const data = await res.json();
  //     setLoading(false);
  //     const replaceStars = data?.candidates[0]?.content?.parts[0]?.text;
  //     setGeminiData(replaceStars.replace(/\*/g, ""));
  //     setInput("");
  //   } catch (error) {
  //     console.log("error", error);
  //     setLoading(false);
  //     setGeminiData("Something went wrong, please try again later.");
  //   }
  // };

  // if (loading) {
  //   return <h1>Processing your request. Please wait :)</h1>;
  // }

  // const handleSend = (e) => {
  //   if (input.trim() !== "") {
  //     geminiApiRes();
  //   }
  // };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSent();
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <img src={assets.gemini_icon} alt="" />
        <img src={assets.user_icon} alt="user" />
      </div>
      {!showResponse ? (
        <div className="main-container">
          <div className="greet">
            <p>
              <span>Hello, Krishna.</span>
            </p>
            <p>How can i help you today?</p>
          </div>
          <div className="cards">
            {cardData.map((card, index) => (
              <div key={index} className="card">
                <p>{card.title}</p>
                <img src={card.icon} alt="compass" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="response">
          <div className="response-title">
            <img src={assets.user_icon} alt="user" />
            <p>{currentPrompt}</p>
          </div>
          <div className="response-data">
            <img src={assets.gemini_icon} alt="gemini" />
            {loading ? (
              <div className="loader">
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: geminiData }}></div>
            )}
          </div>
        </div>
      )}

      <div className="main-bottom">
        <div className="search-box">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Enter a prompt here"
          />
          <div>
            <img src={assets.gallery_icon} alt="gallery" />
            <img src={assets.mic_icon} alt="mic" />
            <img onClick={() => onSent()} src={assets.send_icon} alt="send" />
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate information about people, places, or
          facts. It’s not a substitute for professional advice. Always verify
          with trusted sources.
        </p>
      </div>
    </div>
  );
};

export default Body;
