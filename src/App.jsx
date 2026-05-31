import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [currentUser, setCurrentUser] = useState("Arun");
  const chattingWith =
  currentUser === "Arun" ? "John" : "Arun";

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    const res = await axios.get(
      `https://chat-app-server-9jdh.onrender.com/messages?user1=${currentUser}&user2=${chattingWith}`
    );

    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    await axios.post("https://chat-app-server-9jdh.onrender.com/messages", {
      sender: currentUser,
      receiver: chattingWith,
      text: message
    });N

    setMessage("");

    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md h-[600px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="bg-blue-500 text-white p-4 text-xl font-semibold">
          Chat with {chattingWith}
        </div>

          <div className="p-4 border-b flex gap-2">
          <button
            onClick={() => setCurrentUser("Arun")}
            className={`px-4 py-2 rounded-xl ${
              currentUser === "Arun"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Arun
          </button>

          <button
            onClick={() => setCurrentUser("John")}
            className={`px-4 py-2 rounded-xl ${
              currentUser === "John"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            John
          </button>
        </div>


        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === currentUser
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                  msg.sender === currentUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

        </div>

        {/* Input */}
        <div className="p-4 border-t flex gap-2">

          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-2 outline-none"
          />

          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 rounded-xl"
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default App;