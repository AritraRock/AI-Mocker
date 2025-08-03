# AI-Mocker 🎤📹

AI-Mocker is an AI-powered interview simulation platform built with **Next.js**. It enables users to practice mock interviews by generating AI-driven questions, capturing audio/video responses, and evaluating answers using NLP models. Originally developed as a rapid prototype for a hackathon.

## 🚀 Features

- 🔐 Auth via Clerk
- 🤖 Gemini API to dynamically generate interview questions
- 🎙️ Microphone input and speech-to-text transcription
- 📹 Webcam support for video interview simulation
- ✍️ Answer evaluation using HuggingFace API (semantic similarity scoring)
- 📊 Final scoring and feedback

---

## 🧠 How It Works

1. **Input Phase**  
   Users provide basic information (role, topic, difficulty).

2. **Question Generation**  
   The app queries **Google Gemini API** to generate `n` relevant questions.

3. **Interview Simulation**  
   - Each question is read aloud.
   - Users answer using mic (speech is transcribed).
   - Option to skip or move to the next question.

4. **Evaluation Phase**  
   After completion:
   - The system compares user answers with expected responses from Gemini.
   - Uses **Hugging Face Transformers API** to score based on semantic similarity.

5. **Result Display**  
   Final score and feedback are shown to help users identify improvement areas.

---

## 🛠️ Tech Stack

| Layer         | Tools & Libraries                          |
|---------------|--------------------------------------------|
| Frontend      | Next.js, Tailwind CSS, React               |
| Auth          | Clerk.dev                                  |
| Database      | PostgreSQL (Neon.tech) with Drizzle ORM    |
| AI/NLP        | Gemini API (Google), Hugging Face API      |
| Speech/Text   | Web Speech API (speech-to-text)            |
| Deployment    | Vercel                                     |

---

## 📁 Project Structure

```bash
ai-mocker/
├── app/
│   ├── interview/         # Interview flow pages
│   ├── api/               # API routes
│   └── auth/              # Clerk auth pages
├── components/            # Reusable UI components
├── lib/                   # Helpers, API clients, utils
├── db/                    # Drizzle schema and queries
├── public/
├── styles/
├── .env.example
├── next.config.js
└── README.md
```
## 🧪 Environment Variables
### Create a .env file in the root directory and populate with the following keys:
```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Drizzle ORM + Neon PostgreSQL
NEXT_PUBLIC_DRIZZLE_DB_URL=postgresql://...

# Google Gemini API
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSy...

# Hugging Face API (for answer comparison)
NEXT_PUBLIC_HUGGINGFACE_API_KEY=hf_...

# App Configuration
NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT=5
NEXT_PUBLIC_INFORMATION="This is an important message for the interviewee. Please ensure your webcam and microphone are enabled for the interview."
NEXT_PUBLIC_QUESTION_NOTE="Remember to explain your thought process clearly during the interview. It helps interviewers understand your problem-solving approach."
```
## 💻 Running Locally
- Prerequisites
- Node.js 18+
- PostgreSQL DB URL (Neon/PostgreSQL)
- Clerk + Google Gemini + Hugging Face API keys
### Steps
```
git clone https://github.com/yourusername/ai-mocker.git
cd ai-mocker
npm install
cp .env.example .env  # Fill in actual credentials
npm run dev
```
App will be available at [http://localhost:3000](http://localhost:3000) 
