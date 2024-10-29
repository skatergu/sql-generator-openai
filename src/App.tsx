import CodeDisplay from './components/CodeDisplay';
import MessagesDisplay from './components/MessagesDisplay';
import { useState } from 'react';

interface ChatData {
  role: string;
  content: string;
}

const App = () => {
  const [value, setValue] = useState<string>("");
  const [chat, setChat] = useState<ChatData[]>([]);

  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: value
        })
      };

      const response = await fetch("http://localhost:8000/completions", options);
      const data = await response.json();
      console.log(data);

      const userMessage: ChatData = {
        role: "user",
        content: value
      };

      const assistantMessage: ChatData = {
        role: "assistant",
        content: data.result // Assuming `data.result` contains the SQL query
      };

      setChat(oldChat => [...oldChat, userMessage, assistantMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  const clearChat = () => {
    setValue("");
    setChat([]);
  };

  const filteredUserMessages = chat.filter(message => message.role === "user");
  const latestCode = chat.filter(message => message.role === "assistant").pop();

  return (
    <div className="app">
      {/* Title Section */}
      <div className="title">SQL Query Generator</div>

      {/* Main Interface Components */}
      <MessagesDisplay userMessages={filteredUserMessages} />
      <input value={value} onChange={e => setValue(e.target.value)} placeholder="Type your query here..." />
      <CodeDisplay text={latestCode?.content || ""} />
      
      {/* Button Container */}
      <div className="button-container">
        <button id="get-query" onClick={getQuery}>Get Query!</button>
        <button id="clear-chat" onClick={clearChat}>Clear Chat</button>
      </div>
    </div>
  );
};

export default App;
