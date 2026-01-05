'use client';
import styles from './AudioRecorder.module.css';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useEffect } from 'react';

type Props = {
  onAudioRecordered: (audio: Blob) => void;
};

export function AudioRecorder({ onAudioRecordered }: Props) {
  const {
    startRecording,
    stopRecording,
    isRecording,
    audioBlob,
    error,
  } = useAudioRecorder();

  useEffect(() => {
    if (audioBlob) {
      onAudioRecordered(audioBlob);
      console.log(audioBlob)
    }
  }, [audioBlob])

  return (
    <div>
      {error && <p>{error}</p>}

      {!isRecording ? (
        <button className={styles.recordButton} onClick={startRecording}>Gravar</button>
      ) : (
        <button className={styles.stopButton} onClick={stopRecording}>Parar</button>
      )}
    </div>
  );
}