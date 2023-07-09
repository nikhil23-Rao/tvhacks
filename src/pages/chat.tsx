import Message from "@/components/Message";
import { Navigation } from "@/components/Navigation";
import { colors } from "@/config/colors";
import { useEffect, useState } from "react";
import { callAPI } from "../callapi";
import axios from "axios";

const Chat = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [screen, setScreen] = useState<"car" | "learn" | "media">("learn");
  const [typing, setTyping] = useState(false);
  const [type, setType] = useState("pictures");
  const [media, setMedia] = useState([]);
  const [searchMedia, setSearchMedia] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "them",
      body:
        "Welcome to Recycle IT! We are made to save the world from plastic pollution. Feel free to ask any questions recycling that you may have.",
    },
  ]);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme") as "light" | "dark");
    } else setTheme("light");
  }, []);

  useEffect(() => {
    var objDiv = document.getElementById("scroll");
    if (objDiv && screen === "learn") objDiv.scrollTop = objDiv?.scrollHeight;
  }, [messages, screen]);

  useEffect(() => {
    console.log("MEDA", media);
  }, [media]);

  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: theme === "dark" ? "#1A212D" : "",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            top: -50,
            position: "relative",
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
                  marginTop: -20,
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
                flexDirection: "column",
              }}
            >
              <h1 style={{ color: "#fff" }}>Learn More</h1>
              {screen === "car" && (
                <div className="input-box" style={{ width: "40%" }}>
                  <i className="fa fa-search"></i>
                  <input
                    type="text"
                    placeholder="Search by type or name..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.currentTarget.value);
                    }}
                  />
                </div>
              )}
            </div>

            <div
              style={{ height: 300, overflowY: "scroll", marginTop: 20 }}
              id="scroll"
            >
              {screen === "learn" && (
                <>
                  <section
                    className="discussion"
                    style={{ marginLeft: 60, marginTop: -60 }}
                  >
                    {typing && (
                      <>
                        <img
                          src="/robot.jpeg"
                          alt=""
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: 200,
                            border: "5px solid #4CB564",
                            position: "absolute",
                            bottom: 105,
                            marginLeft: 14,
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: 73,
                            zoom: 1.56,
                            marginLeft: 50,
                          }}
                        >
                          <div className="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        </div>
                      </>
                    )}
                    {messages.map((message) => {
                      if (message.from === "them") {
                        return (
                          <div className="yours messages">
                            <div className="message">{message.body}</div>
                          </div>
                        );
                      } else
                        return (
                          <div className="mine messages">
                            <div className="message last">{message.body}</div>
                          </div>
                        );
                    })}
                  </section>
                </>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  width: 750,
                  bottom: 50,
                }}
              >
                {screen === "learn" && (
                  <div
                    className="input-box"
                    style={{
                      width: "80%",
                      height: 50,
                    }}
                  >
                    <i className="fa fa-send"></i>
                    <input
                      type="text"
                      placeholder="Ask a question..."
                      value={text}
                      onChange={(e) => {
                        setText(e.currentTarget.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && text.length > 0) {
                          const oldMessages = [...messages];
                          setMessages([
                            ...messages,
                            { from: "me", body: text },
                          ]);
                          callAPI(
                            text,
                            setMessages,
                            [...oldMessages, { from: "me", body: text }],
                            setTyping
                          );
                          setText("");
                        }
                      }}
                    />
                  </div>
                )}
                {screen === "media" && (
                  <div
                    className="input-box"
                    style={{ width: "80%", height: 50 }}
                  >
                    {type === "videos" ? (
                      <i
                        className="fa fa-play"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setMedia([]);
                          setType("pictures");
                        }}
                      ></i>
                    ) : (
                      <i
                        className="fa fa-camera"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setMedia([]);
                          setType("videos");
                        }}
                      ></i>
                    )}
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchMedia}
                      onChange={(e) => {
                        setSearchMedia(e.currentTarget.value);
                      }}
                      onKeyDown={async (e) => {
                        if (e.key === "Enter" && searchMedia.length > 0) {
                          if (type === "pictures") {
                            const { data } = await axios.get(
                              `https://api.pexels.com/v1/search?query="${e.currentTarget.value}"&per_page=5`,
                              {
                                headers: {
                                  Authorization:
                                    "SdjW1ao3WKkJSzGaEITOoRHrrIcpKs4Ej60wAPDKtwrUXQq9tR6A7piu",
                                },
                              }
                            );
                            setMedia(data.photos);
                            setSearchMedia("");
                          } else {
                            const { data } = await axios.get(
                              `https://api.pexels.com/videos/search?query="${e.currentTarget.value}"&per_page=5`,
                              {
                                headers: {
                                  Authorization:
                                    "SdjW1ao3WKkJSzGaEITOoRHrrIcpKs4Ej60wAPDKtwrUXQq9tR6A7piu",
                                },
                              }
                            );
                            setMedia(data.videos);
                            setSearchMedia("");
                          }
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
