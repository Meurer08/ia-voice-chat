'use client';
import styles from './AudioRecorder.module.css';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useEffect } from 'react';

type Props = {
  onStopAudioRecording: (audio: Blob) => void;
};

export function AudioRecorder({ onStopAudioRecording }: Props) {
  const {
    startRecording,
    stopRecording,
    isRecording,
    audioBlobRef,
    error,
  } = useAudioRecorder();


  return (
    <div>
      {error && <p>{error}</p>}

      {!isRecording ? (
        <button className={styles.recordButton} onClick={startRecording}>Gravar</button>
      ) : (
        <button className={styles.stopButton} onClick={() => stopRecording(onStopAudioRecording)}>Parar</button>
      )}
    </div>
  );
}