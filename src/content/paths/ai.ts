import { course, docs, gitStop, PYTHON_BASICS, video } from './shared';
import type { CareerPath } from './types';

export const AI_ENGINEER: CareerPath = {
  id: 'ai',
  title: 'AI Engineer',
  tagline: 'Build apps and tools powered by AI models',
  job: 'Builds products on top of large language models: chatbots, document search, coding helpers and automations. Connects models to data and APIs and checks the answers are reliable.',
  months: '8–10 months',
  icon: 'M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z',
  color: '#7C3AED',
  ink: '#6227C9',
  soft: '#F1EAFE',
  sections: [
    {
      title: 'Programming',
      stops: [
        { id: 'python', title: 'Python basics', why: 'Most AI tools and libraries are used from Python.', modules: PYTHON_BASICS },
        {
          id: 'python-more',
          title: 'Classes, errors and problem solving',
          why: 'Write code that handles messy model output without crashing.',
          modules: ['p-class-1', 'p-err-1', 'p-ps-1'],
        },
        {
          id: 'apis',
          title: 'APIs and JSON',
          why: 'AI models are used through web APIs that send and receive JSON.',
          modules: ['n-json-1', 'n-api-1'],
          links: [docs('Requests quickstart', 'https://requests.readthedocs.io/en/latest/user/quickstart/')],
        },
        gitStop,
      ],
    },
    {
      title: 'How AI models work',
      stops: [
        {
          id: 'neural-nets',
          title: 'Neural networks, intuitively',
          why: 'What a model is, how it learns, and why it can be confidently wrong.',
          links: [video('Neural networks (3Blue1Brown)', 'https://www.3blue1brown.com/topics/neural-networks')],
        },
        {
          id: 'llms',
          title: 'Large language models',
          why: 'Tokens, context windows, embeddings and why models hallucinate.',
          links: [course('LLM course (Hugging Face)', 'https://huggingface.co/learn/llm-course', 'Free')],
        },
        {
          id: 'ml-basics',
          title: 'Machine learning basics',
          why: 'Training, testing and evaluation, so you can judge a model properly.',
          optional: true,
          links: [course('Machine Learning Crash Course (Google)', 'https://developers.google.com/machine-learning/crash-course', 'Free')],
        },
      ],
    },
    {
      title: 'Building with AI',
      stops: [
        {
          id: 'prompting',
          title: 'Prompt engineering',
          why: 'Clear instructions, examples and structure get reliable answers from a model.',
          links: [docs('Prompt engineering guide (Anthropic)', 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview')],
        },
        {
          id: 'ai-apis',
          title: 'Calling AI model APIs',
          why: 'Send messages to a model from your own code, stream answers and handle errors and costs.',
          links: [docs('Claude API docs', 'https://docs.claude.com/en/docs/intro')],
        },
        {
          id: 'rag',
          title: 'Search over your own documents (RAG)',
          why: 'Embeddings and vector search let a model answer from your company’s data instead of guessing.',
          links: [course('LLM course (Hugging Face)', 'https://huggingface.co/learn/llm-course', 'Free')],
        },
        {
          id: 'tools',
          title: 'Tools and agents',
          why: 'Let a model call functions, search the web or run code to finish multi-step tasks.',
          optional: true,
          links: [docs('Tool use (Anthropic)', 'https://docs.claude.com/en/docs/agents-and-tools/tool-use/overview')],
        },
        {
          id: 'safety',
          title: 'Testing and responsible AI',
          why: 'Check answers for mistakes, bias and privacy leaks before real users see them.',
          links: [docs('Responsible AI practices (Google)', 'https://ai.google/responsibility/responsible-ai-practices/')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [
        {
          id: 'project',
          title: 'Project: an AI assistant',
          why: 'Build a chatbot that answers questions from documents you choose, with a small web page in front.',
          project: true,
          links: [docs('Streamlit get started', 'https://docs.streamlit.io/get-started')],
        },
        {
          id: 'interviews',
          title: 'Interview preparation',
          why: 'Explain how your project handles wrong answers and cost, plus Python and ML basics.',
          links: [video('Krish Naik', 'https://www.youtube.com/@krishnaik06', 'Hindi')],
        },
      ],
    },
  ],
};
