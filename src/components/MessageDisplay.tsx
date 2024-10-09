interface UserMessage {
  role: string;
  content: string;
}

interface MessageDisplayProps {
  message: UserMessage;
}



const MessageDisplay = ({message: {role, content}}: MessageDisplayProps) => {
  return (
    <div className="message-display">
      <p id="icon">⊚</p>
      {/* <p>{message.role}</p> */}
      <p>{content}</p> 
    </div>
  );
}
export default MessageDisplay;
