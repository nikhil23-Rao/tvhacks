import axios from "axios";

export const callAPI = async (
  question: string,
  setMessages: (i: any) => void,
  messages: any[],
  setTyping: (i: boolean) => void
) => {
  setTyping(true);
  const options = {
    method: "POST",
    url: "https://simple-chatgpt-api.p.rapidapi.com/ask",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "5db5fe023cmsh90258ea5c33841cp19ee95jsnaff46b46a51d",
      "X-RapidAPI-Host": "simple-chatgpt-api.p.rapidapi.com",
    },
    data: {
      question,
    },
  };

  try {
    const response = await axios.request(options);
    const body = response.data.answer;
    //     console.log(response.data);
    if (body) {
      setMessages([
        ...messages,
        {
          from: "them",
          body,
        },
      ]);
      setTyping(false);
    }
  } catch (error) {
    console.error(error);
  }
};
