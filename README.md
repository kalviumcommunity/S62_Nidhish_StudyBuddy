# 📘 StudyBuddy – Your AI Learning Companion

StudyBuddy is an AI-powered educational assistant that helps students understand topics, ask follow-up questions, and generate quizzes or flashcards for practice. It combines the power of LLMs with Retrieval-Augmented Generation (RAG), function calling, structured outputs, and precise prompting to make learning interactive, accurate, and scalable.

---

## 🔥 Overview

> "Instead of googling 10 different articles and watching 5 YouTube videos, just ask StudyBuddy."

StudyBuddy is designed as a **chat-based learning assistant**. A student can ask:

- “Explain how photosynthesis works”
- “Summarize the French Revolution”
- “Create a quiz for me on Python functions”

And StudyBuddy responds with:

- Accurate explanations
- Contextual summaries from real documents
- Custom quizzes or flashcards via function calls

---

## ⚙️ Tech Stack

| Layer          | Tool/Service Used                       |
| -------------- | --------------------------------------- |
| Backend        | Node.js / Python (FastAPI)              |
| Frontend       | React.js (Chat UI)                      |
| LLM API        | Deekseek or Gemini                      |
| RAG Backend    | Pinecone / Weaviate / FAISS + LangChain |
| Auth & Storage | Supabase / Firebase                     |
| Deployment     | Vercel + Railway / Render               |

---

## 🚀 Key Features

- ✅ Topic Explanation in Simple Terms
- ✅ Follow-up Q&A
- ✅ Contextual Answers using RAG
- ✅ Auto-generated Flashcards & Quizzes
- ✅ JSON Structured Output
- ✅ Multi-topic Learning Sessions

---

## 📚 Core Concepts & Implementation

### 1. 🧠 Prompting

Prompting controls how the AI responds.

#### ✅ System Prompt:

```text
You are StudyBuddy, a helpful and friendly AI tutor. You explain concepts simply, provide examples, and encourage students to keep learning. Never answer without verifying your response.
```

#### ✅ User Prompt Examples:

```text
“Explain binary search with code.”

“Summarize this PDF.”

“Make flashcards on acids and bases.”

```

Prompts are dynamically engineered based on user intent and available context (e.g., document chunks or prior Q&A history).

---

### 2. 📦 Structured Output

For consistency and parsing, StudyBuddy returns data in well-structured formats (JSON) especially for:

- Flashcards
- Quizzes
- Topic Summaries

#### ✅ Example Output:

```json
{
  "type": "flashcards",
  "topic": "Photosynthesis",
  "cards": [
    {
      "question": "What is the role of chlorophyll in photosynthesis?",
      "answer": "Chlorophyll absorbs sunlight and converts it into energy."
    },
    ...
  ]
}
```

This structure helps the frontend render components like card decks, quizzes, etc., automatically.

---

### 3. 🔧 Function Calling

We use LLM function calling to trigger backend utilities such as:

- generate_quiz()
- create_flashcards()
- fetch_documents()

#### ✅ Example:

User prompt: “Make a quiz on WW2, medium difficulty.”

LLM triggers:

```json
{
  "function": "generate_quiz",
  "arguments": {
    "topic": "World War 2",
    "difficulty": "medium"
  }
}
```

Backend handles the logic (e.g., question templates, answer choices), ensuring responses are not just generated text but well-structured objects.

---

### 4. 🔍 RAG – Retrieval Augmented Generation

To ensure factual accuracy and depth, StudyBuddy uses RAG to fetch documents before answering.

#### ✅ Implementation Steps:

1.  Document Indexing: Upload NCERT books, Wikipedia extracts, or custom notes into a vector database (Pinecone or FAISS).
2.  User Query: “Explain the causes of WW1.”
3.  Vector Search: Use embedding model to retrieve top matching documents.
4.  LLM Prompt:

```text
Using the following sources, explain the causes of WW1:
[Document snippets]
```

5. Final Answer: Grounded, contextual, and cited.

This ensures the AI doesn’t hallucinate and remains grounded in reality.

---

### 📌 Future Enhancements

- Multilingual Support (Hindi, Tamil, etc.)
- Voice-based chat
- Custom learning paths for each user
- Leaderboards for quiz challenges

---

### 💡 Why this matters

Students today are overloaded with scattered information. StudyBuddy gives them a focused, factual, interactive way to learn—powered by AI, made human through smart engineering.
