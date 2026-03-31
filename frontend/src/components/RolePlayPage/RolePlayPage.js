import React, { useEffect, useCallback, useState } from 'react';
import { startConversationWithAudio } from '../../services/apiService';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';
import { useAudioManager } from '../../hooks/useAudioManager';
import { saveAudioLocally, initializeMicrophone } from '../../services/audioService';
import SpeechWave from './SpeechWave';
import ControlButtons from './ControlButtons';
import './RolePlayPage.css';
import TranslationDisplay from './TranslationDisplay';

const RolePlayPage = ({ selectedScenario, audioSrc, german, english }) => {
  const { audioRef, isPlaying, setIsPlaying, playAudio } = useAudioManager();
  const [recordedFile, setRecordingFile] = useState(null);
  const [germanText, setGermanText] = useState(german);
  const [englishText, setEnglishText] = useState(english);
  const [toggleTranslation, setToggleTranslation] = useState(false);

  useEffect(() => {
    setGermanText(german);
  }, [german])

  useEffect(() => {
    setEnglishText(english);
  }, [english])

  const { isRecording, toggleRecording } = useSpeechRecognition((file) => {
    if (file && file.size > 0) {
      setRecordingFile(file);
    } else {
      console.error('Error: Recorded file is empty.');
    }
  });

  const handleSaveLocally = useCallback(() => {
    saveAudioLocally(recordedFile);
  }, [recordedFile]);

  // Send recorded audio file to endpoint and receive response
  const sendMessageToEndpoint = useCallback(async (file) => {
    if (!file || file.size === 0) {
      console.error('Error: Attempted to send an empty file.');
      return;
    }

    try {
      const { audio, germanText, englishText } = await startConversationWithAudio(selectedScenario, file);
      const newAudioUrl = URL.createObjectURL(audio);
      await playAudio(newAudioUrl);

      // Set the texts in the state
      setGermanText(germanText);
      setEnglishText(englishText);
    } catch (error) {
      console.error('Error sending message to endpoint:', error);
    }
  }, [selectedScenario, playAudio]);

  useEffect(() => {
    initializeMicrophone(); // Initialize the microphone when the component mounts
  }, []);

  useEffect(() => {
    if (audioSrc) {
      playAudio(audioSrc); // If an audio source is provided, play it
    }
  }, [audioSrc, playAudio]);

  // Send the recorded file when recording stops
  useEffect(() => {
    if (recordedFile && !isRecording) {
      console.log('FILE IS RECORDED')
      sendMessageToEndpoint(recordedFile);
    }
  }, [recordedFile, isRecording, sendMessageToEndpoint]);

  return (
    <div className="role-play-page">
      <SpeechWave isPlaying={isPlaying} />

      <audio
        ref={audioRef}
        autoPlay
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        Your browser does not support the audio element.
      </audio>

      <ControlButtons
        isRecording={isRecording}
        isPlaying={isPlaying}
        recordedFile={recordedFile}
        onToggleRecording={toggleRecording}
        onSaveLocally={handleSaveLocally}
        onToggleTranslation={() => setToggleTranslation(!toggleTranslation)}
      />

      {toggleTranslation && (
        <TranslationDisplay
          germanText={germanText}
          englishText={englishText}
        />
      )}
    </div>
  );
};

export default RolePlayPage;
