type GenerateResponseResult = {
  reply: string;
};

export async function sendTextToChatApi( message: string ): Promise<GenerateResponseResult> {
  const response = await fetch('/api/ia/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error('Erro ao gerar resposta');
  }

  return response.json();
}
