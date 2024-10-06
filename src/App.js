import CodeDisplay from './components/CodeDisplay.js';
import MessagesDisplay from './components/MessagesDisplay.js';


const App = () => {
  const getQuery = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: "create a table"
        })
      }
      const response = await fetch("http://localhost:8000/completions", options);
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="app">
      <MessagesDisplay />
      <input/>
      <CodeDisplay/>
      <div className="button-container">
        <button id="get-query">onClick={() => {getQuery ()}}Get Query!</button>
        <button id="clear-chat">Clear Chat</button>
      </div>
    </div>
  );
}

export default App;
