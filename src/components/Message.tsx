// Dependencies
import React from "react";

// Types
import CSS from "csstype";

// Hooks
import { useState } from "react";

// This is the type for the component below so we get good intellisense when writing code
interface MessageProps {
  sender: "them" | "us";
  body: string;
  author: { name: string };
  className?: string;
  style?: any;
}

// Message bubble component
const Message: React.FC<MessageProps> = ({
  sender,
  body,
  className,
  style,
}: MessageProps) => {
  // Return JSX code
  return (
    <div
      style={style}
      className={`bubble ${
        sender === "them" ? "sender" : "recipient"
      } ${className} `}
    >
      <h2>{body}</h2>
    </div>
  );
};

export default Message;
