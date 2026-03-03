export const prompts = {
  truth: [
    "What's one thing you've never told me?",
    "What's your biggest fear about us?",
    "When did you first know you loved me?",
    "What's something you wish I did more often?",
    "What's your favorite memory of us?",
    "What do you think is my best quality?",
    "What's one thing you'd change about our relationship?",
    "What's the most romantic thing I've ever done?",
    "What's something that always makes you think of me?",
    "What's your dream date with me?"
  ],
  dare: [
    "Send me a voice note saying why you love me",
    "Share your favorite photo of us",
    "Write me a short poem",
    "Tell me three things you love about me right now",
    "Send me a song that reminds you of us",
    "Plan our next date and tell me about it",
    "Draw something that represents us",
    "Share a secret wish you have for us",
    "Tell me about your favorite moment today",
    "Describe me in exactly 5 words"
  ],
  challenge: [
    "Go 24 hours without saying 'I love you' - show it instead",
    "Send me 3 random photos throughout your day",
    "Write down 10 things you're grateful for about us",
    "Create a playlist of 5 songs that describe our relationship",
    "Take a photo of something that made you smile today",
    "Share your favorite quote and why it matters to you",
    "Tell me about a dream you had recently",
    "Describe your perfect day with me in detail",
    "Share something you learned today",
    "Tell me about someone who inspires you and why"
  ]
}

export const getRandomPrompt = (type) => {
  const list = prompts[type]
  return list[Math.floor(Math.random() * list.length)]
}
