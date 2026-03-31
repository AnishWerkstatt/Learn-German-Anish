export const initializeSpeechRecognition = (lang = 'de-DE') => {
  if (!('webkitSpeechRecognition' in window)) {
    throw new Error('Speech recognition not supported');
  }

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = lang;
  recognition.maxAlternatives = 1;

  return recognition;
};