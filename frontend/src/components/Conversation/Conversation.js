import React, { useState } from 'react';
import { startConversationWithText } from '../../services/apiService';
import Button from '../common/Button';
import './Conversation.css';

const Conversation = ({ scenario, messages }) => {
  const [isListening, setIsListening] = useState(false);

  const handleStartRolePlay = async () => {
    try {
      const { audio: audioBlob } = await startConversationWithText(scenario);
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
    } catch (error) {
      console.error('Error starting role play:', error);
    }
  };

  return (
    <div className="conversation">
      <h2>Conversation</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <Button onClick={handleStartRolePlay}>Start Role Play</Button>
      <Button onClick={() => setIsListening(!isListening)}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
    </div>
  );
};

export default Conversation;