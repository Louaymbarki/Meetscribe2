const axios = require('axios');

const startWhisperASR = async (audioStream) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/whisper/asr',
      { audio: audioStream },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error in Whisper ASR:', error);
    return null;
  }
};

const handleAudioStream = async (audioStream) => {
  const transcription = await startWhisperASR(audioStream);
  if (transcription) {
    console.log('Transcription:', transcription);
  } else {
    console.error('Failed to transcribe audio');
  }
};

async function getAudioStream() {
  try {
  const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  handleAudioStream(audioStream);
  } catch (error) {
  console.error("Error getting audio stream:", error);
  }
  }
  
  function handleAudioStream(audioStream) {
  // Replace the following line with the code to get the audio stream
  const audioContext = new AudioContext();
  const source = audioContext.createMediaStreamSource(audioStream);
  
  // Call the handleAudioStream function with the audio stream
  sendAudioData(source);
  }
  
  // Call the getAudioStream function to start capturing the audio stream
  getAudioStream();