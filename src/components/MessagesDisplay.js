import MessageDisplay from "./MessageDisplay.js";

interface UserMessage {
  role: string;
  content: string;
}

interface MessagesDisplayProps {
  userMessages: ChatData[];
}

const MessagesDisplay = ({userMessages}) => {
  return (
    <div className="messages-display">
      {userMessages.map((userMessage, _index) => 
      <MessageDisplay key={_index} message={userMessage}/>
      )}
    </div>
  );
}
export default MessagesDisplay;
