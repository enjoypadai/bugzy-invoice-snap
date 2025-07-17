import { useState, useEffect } from 'react';

interface TextToSpeechProps {
  text: string;
  apiKey?: string;
  autoPlay?: boolean;
  voice?: string;
}

export const useTextToSpeech = ({ text, apiKey, autoPlay = false, voice = "EXAVITQu4vr4xnSDxMaL" }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const speak = async () => {
    if (!apiKey) {
      setError("ElevenLabs API key is required");
      return;
    }

    if (!text.trim()) {
      setError("No text to speak");
      return;
    }

    try {
      setIsPlaying(true);
      setError(null);

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioElement.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      audioElement.onerror = () => {
        setIsPlaying(false);
        setError("Error playing audio");
        URL.revokeObjectURL(audioUrl);
      };

      setAudio(audioElement);
      await audioElement.play();
    } catch (err) {
      setIsPlaying(false);
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  const stop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (autoPlay && apiKey && text.trim()) {
      speak();
    }
  }, [autoPlay, apiKey, text]);

  return {
    speak,
    stop,
    isPlaying,
    error,
  };
};

export default useTextToSpeech;