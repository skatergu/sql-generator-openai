import MessageDisplay from "./MessageDisplay";

interface UserMessage {
  role: string;
  content: string;
}

interface MessagesDisplayProps {
  userMessages: UserMessage[];
}

const MessagesDisplay = ({userMessages }: MessagesDisplayProps) => {
  return (
    <div className="messages-display">
      {userMessages.map((userMessage, _index) => 
      <MessageDisplay key={_index} message={userMessage}/>
      )}
    </div>
  );
}
export default MessagesDisplay;
