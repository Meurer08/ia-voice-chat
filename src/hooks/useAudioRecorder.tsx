"use client";

import { useRef, useState } from 'react';

export function useAudioRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioBlobRef = useRef<Blob | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startRecording = async () => {
    audioBlobRef.current = null
    setError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      setError('Erro ao acessar o microfone.');
    }
  };

const stopRecording = (onStop: (blob: Blob) => void) => {
  const mediaRecorder = mediaRecorderRef.current;
  if (!mediaRecorder) return;

  mediaRecorder.onstop = () => {
    const blob = new Blob(audioChunksRef.current, {
      type: 'audio/webm',
    });

    audioBlobRef.current = blob;
    onStop(blob);

    mediaRecorder.stream.getTracks().forEach(track => track.stop());
  };

  mediaRecorder.stop();
  setIsRecording(false);
};

  return {
    startRecording,
    stopRecording,
    isRecording,
    audioBlobRef,
    error,
  };
}
