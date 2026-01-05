export async function sendAudioToWhisper(audioBlob: Blob) {
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');

    const response = await fetch('/api/ia/transcript', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erro ao transcrever áudio');
    }

    return response.json();
  }