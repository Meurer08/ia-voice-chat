"use client";
import { AudioRecorder } from '@/components/AudioRecorder/AudioRecorder';
import styles from './page.module.css';
import { useEffect, useRef, useState } from 'react';
import { sendAudioToWhisper } from '@/services/transcript';
import { sendTextToChatApi } from '@/services/generate';
import { ChatMessage } from '@/types/chat';
import { Message } from '@/components/ChatMessage/ChatMessage';
import { TypingIndicator } from '@/components/TypingIndicator/TypingIndicator';

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [idMessages, setIdMessages] = useState<number>(1)

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    resset();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, isTranscribing, isGenerating]);

  async function generateResponseGPT(textoAudio: string, id: number) {
    console.log("Dentro do Generator");

    const data = await sendTextToChatApi(textoAudio);

    const aiMessage: ChatMessage = {
      id: id.toString(),
      role: 'assistant',
      content: data.reply,
    };


    setMessages(prev => [...prev, aiMessage]);
  }

  async function handleStopRecording(blob: Blob) {
    if (!blob) return;

    try {

      setIsTranscribing(true);

      const data = await sendAudioToWhisper(blob);

      const userMessage: ChatMessage = {
        id: (idMessages + 1).toString(),
        role: 'user',
        content: data.text,

      };
      setMessages(prev => [...prev, userMessage]);
      setIsTranscribing(false);
      setIsGenerating(true);
      await generateResponseGPT(data.text, (idMessages + 2));

    } catch (error) {
      console.error('Erro no processamento do áudio', error);
    } finally {
      setIsTranscribing(false);
      setIsGenerating(false);
      setIdMessages(idMessages + 2)
    }
  }

  function resset() {
    setIdMessages(1)
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Olá, Como posso ajudar você hoje?',

      },
    ]);
  }

  return (
    <div className={styles.appContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>Histórico</div>
        <button className={styles.newChatBtn} onClick={resset}>+ Nova Conversa</button>
      </aside>

      <main className={styles.mainContent}>
        <header className={styles.sidebarHeader}>
          <h1>IA VOICE CHAT</h1>
        </header>

        <div className={styles.chatArea}>
          {messages.map((m) => <Message message={m} key={m.id} />)}
          {isTranscribing && <TypingIndicator role="user" />}
          {isGenerating && <TypingIndicator role="assistant" />}
          <div ref={bottomRef} />
        </div>

        <footer className={styles.chatFooter}>
          <span className={styles.statusText}>Toque no botão para falar</span>
          <AudioRecorder onStopAudioRecording={handleStopRecording} />
        </footer>
      </main>
    </div>
  );
}