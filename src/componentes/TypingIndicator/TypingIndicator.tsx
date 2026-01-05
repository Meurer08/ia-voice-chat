'use client';

import styles from './TypingIndicator.module.css';

type Props = {
  role: 'user' | 'assistant';
};

export function TypingIndicator({ role }: Props) {
  const isUser = role === 'user';

  return (
    <div
      className={`${styles.message} ${
        isUser ? styles.user : styles.assistant
      }`}
    >
      <div
        className={`${styles.bubble} ${
          isUser ? styles.userBubble : styles.assistantBubble
        }`}
      >
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
    </div>
  );
}
