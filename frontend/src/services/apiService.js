import axios from 'axios';

const API_BASE_URL = 'http://localhost:8002';

export const startConversationWithAudio = async (scenarioName, audioFile) => {
  try {
    const formData = new FormData();
    formData.append('scenarioName', scenarioName);
    formData.append('audio', audioFile, audioFile.name);

    const response = await axios.post(
      `${API_BASE_URL}/converse/audio`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'json',
      }
    );

    const { audio, germanText, englishText } = response.data;
    const audioBlob = new Blob(
      [Uint8Array.from(atob(audio), c => c.charCodeAt(0))],
      { type: 'audio/mpeg' }
    );

    return {
      audio: audioBlob,
      germanText,
      englishText
    };
  } catch (error) {
    throw error;
  }
};

// Function for starting a conversation with text input
export const startConversationWithText = async (scenarioName) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/converse/text`,
      { scenarioName },
      { responseType: 'json' } // Expecting an audio response
    );

    const { audio, germanText, englishText } = response.data;
    const audioBlob = new Blob(
      [Uint8Array.from(atob(audio), c => c.charCodeAt(0))],
      { type: 'audio/mpeg' }
    );

    return {
      audio: audioBlob,
      germanText,
      englishText
    };
  } catch (error) {
    throw error;
  }
};
