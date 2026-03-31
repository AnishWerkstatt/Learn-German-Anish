import React, { useState, useRef } from 'react';
import RecordRTC from 'recordrtc';

const AudioRecorder = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [recording, setRecording] = useState(false);
  const recorder = useRef(null);

  // Start recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    recorder.current = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      recorderType: RecordRTC.AudioRecorder, // Use Mono instead of Stereo
    });
    recorder.current.startRecording();
    setRecording(true);
  };

  // Stop recording with a delay to ensure the Blob is properly generated
  const stopRecording = async () => {
    await recorder.current.stopRecording();

    // Add a slight delay before checking the Blob
    setTimeout(() => {
      const audioBlob = recorder.current.getBlob();

      // Log the audioBlob to check what it's returning
      console.log("Audio Blob:", audioBlob);

      // Check if the Blob is valid
      if (audioBlob && audioBlob.size > 0) {
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      } else {
        console.error('Failed to record audio, no valid blob or Blob is empty.');
      }
      setRecording(false);
    }, 500); // Delay of 500ms
  };

  return (
    <div className="p-4 text-center">
      <button
        onClick={recording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded ${recording ? "bg-red-500" : "bg-blue-500"} text-white`}
      >
        🎤 {recording ? "Stop Recording" : "Start Recording"}
      </button>

      {audioUrl && (
        <div className="mt-4">
          <audio controls autoplay src={audioUrl}></audio>
          <a href={audioUrl} download="recording.wav" className="block mt-2 text-blue-600 underline">
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;