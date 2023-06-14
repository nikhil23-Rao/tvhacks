import Message from "@/components/Message";
import { Navigation } from "@/components/Navigation";
import { colors } from "@/config/colors";
import { useEffect, useState } from "react";

const Chat = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [screen, setScreen] = useState<"car" | "learn" | "media">("car");
  const [messages, setMessages] = useState([
    {
      sender: "them",
      author: { name: "chatbot" },
      body:
        "Hi! Welcome to the bot! To begin on which car you would desire, let's start basic, how big would you like your car to be.",
      options: ["Minivan Size", "SUV Size", "Standard"],
      id: 1,
      optionsStep: 2,
    },
  ]);
  const [options, setOptions] = useState([
    {
      forMessageId: 1,
      options: ["Minivan Size", "SUV Size", "Standard"],
    },
  ]);

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") as "light" | "dark");
    } else setTheme("light");
  }, []);

  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: theme === "dark" ? "#1A212D" : "",
        }}
      >
        <header>
          <nav style={{ backgroundColor: colors.primary }}>
            <ul>
              <li
                style={{ fontWeight: screen === "car" ? "bold" : "" }}
                onClick={() => {
                  setScreen("car");
                }}
              >
                <a style={{ cursor: "pointer" }}>Recomend Car</a>
              </li>
              <li
                style={{ fontWeight: screen === "learn" ? "bold" : "" }}
                onClick={() => {
                  setScreen("learn");
                }}
              >
                <a style={{ cursor: "pointer" }}>Learn</a>
              </li>
              <li
                style={{ fontWeight: screen === "media" ? "bold" : "" }}
                onClick={() => {
                  setScreen("media");
                }}
              >
                <a style={{ cursor: "pointer" }}>Show Media</a>
              </li>
            </ul>
          </nav>
        </header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              width: "50%",
              height: 100,
              marginTop: 100,
              border: "1px solid #fff",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              display: "flex",
              padding: 20,
            }}
          >
            <img
              src="/robot.jpeg"
              alt=""
              style={{
                width: 70,
                height: 70,
                borderRadius: 200,
                marginTop: -10,
                marginLeft: 20,
                border: "5px solid #4CB564",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1 style={{ color: "#fff", marginTop: -10, marginLeft: 20 }}>
                AI ChatBot
              </h1>
              <p
                style={{
                  color: colors.primary,
                  marginLeft: 20,
                  marginTop: -16,
                }}
              >
                Currently Active
              </p>
            </div>
          </div>
          <div
            style={{ width: "50%", height: "75vh", border: "2px solid #fff" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <h1 style={{ color: "#fff" }}>
                {screen === "car"
                  ? "Recomend Car"
                  : screen === "learn"
                  ? "Learn More"
                  : "Show Media"}
              </h1>
            </div>
            {screen === "car" && (
              <>
                <div>
                  <section
                    className="discussion"
                    style={{ marginLeft: 40, overflowY: "scroll", height: 370 }}
                  >
                    {messages.map((message) => {
                      return (
                        <>
                          <Message
                            key={1}
                            author={{ name: "chatbot" }}
                            body={message.body}
                            sender={"them"}
                            style={{
                              maxWidth: 500,
                              borderRadius: 10,
                              paddingLeft: 20,
                              paddingRight: 20,
                              fontSize: 14,
                            }}
                            className={"middle"}
                          />
                          <div style={{ marginTop: 20 }}>
                            {message.options.map((o) => (
                              <div
                                style={{
                                  width: "50%",
                                  height: 40,
                                  backgroundColor: "lightgreen",
                                  borderRadius: 15,
                                  alignItems: "center",
                                  justifyContent: "center",
                                  display: "flex",
                                  marginBottom: 20,
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  // setResponse
                                }}
                              >
                                {o}
                              </div>
                            ))}
                          </div>
                        </>
                      );
                    })}
                  </section>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* {options.filter().map((o) => {
			return (
				<div
				style={{
				  width: "50%",
				  height: 40,
				  backgroundColor: "lightgreen",
				  borderRadius: 15,
				  alignItems: "center",
				  justifyContent: "center",
				  display: "flex",
				  marginBottom: 20,
				}}
			      >
				
			      </div>
			      
			)
		})} */}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
