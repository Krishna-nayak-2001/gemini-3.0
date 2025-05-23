import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { Context } from "../../context/GeminiContext";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { onSent, prevPrompt, setPrevPrompt, newChat } = useContext(Context);

  const prompts = async (prompt) => {
    // setPrevPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar ">
      <div className="top">
        <img
          onClick={() => setOpen((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="menu"
        />
        <div onClick={()=>newChat()} className="new-chat">
          <img className="icon w-4" src={assets.plus_icon} alt="plus_icon" />
          {open && <span className="">New Chat</span>}
        </div>
        <div className="recent">
          {open && <p className="recent-title">Recent</p>}
          {prevPrompt.map((item, i) => {
            return (
              <div key={i} onClick={()=>prompts(item)} className="recent-entry">
                <img
                  className="icon w-5"
                  src={assets.message_icon}
                  alt="message_icon"
                />
                {open && <p className="">{item.slice(0, 20)}...</p>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bottom">
        <div className="recent-entry bottom-entry">
          <img className="icon w-5" src={assets.question_icon} alt="" />
          {open && <p className="text">Help</p>}
        </div>
        <div className="recent-entry bottom-entry">
          <img className="icon w-5" src={assets.history_icon} alt="" />
          {open && <p className="text">Activity</p>}
        </div>
        <div className="recent-entry bottom-entry">
          <img className="icon w-5" src={assets.setting_icon} alt="" />
          {open && <p className="text">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
