'use client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ChatMessage } from "@/types/chat";
import styles from './ChatMessage.module.css';

type Props = {
  message: ChatMessage;
};

export function Message({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div key={message.id}
      className={`${styles.message} ${
        isUser ? styles.user : styles.assistant
      }`}
    >
      <div
        className={`${styles.bubble} ${
          isUser ? styles.userBubble : styles.assistantBubble
        }`}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
