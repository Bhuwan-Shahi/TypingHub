"use client"

export interface TextCategory {
  id: string
  name: string
  description: string
  icon: string
  difficulty: "easy" | "medium" | "hard"
}

export interface TextContent {
  id: string
  category: string
  text: string
  difficulty: "easy" | "medium" | "hard"
  source?: string
  tags?: string[]
}

export const TEXT_CATEGORIES: TextCategory[] = [
  {
    id: "quotes",
    name: "Famous Quotes",
    description: "Inspirational and famous quotes from history",
    icon: "💭",
    difficulty: "easy",
  },
  {
    id: "literature",
    name: "Literature",
    description: "Excerpts from classic and modern literature",
    icon: "📚",
    difficulty: "medium",
  },
  {
    id: "programming",
    name: "Programming",
    description: "Code snippets and programming concepts",
    icon: "💻",
    difficulty: "hard",
  },
  {
    id: "news",
    name: "News Articles",
    description: "Current events and news excerpts",
    icon: "📰",
    difficulty: "medium",
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific articles and explanations",
    icon: "🔬",
    difficulty: "hard",
  },
  {
    id: "business",
    name: "Business",
    description: "Business articles and professional content",
    icon: "💼",
    difficulty: "medium",
  },
  {
    id: "common-words",
    name: "Common Words",
    description: "Most frequently used English words",
    icon: "🔤",
    difficulty: "easy",
  },
  {
    id: "numbers",
    name: "Numbers",
    description: "Practice typing numbers and symbols",
    icon: "🔢",
    difficulty: "medium",
  },
]

export const TEXT_CONTENT: Record<string, TextContent[]> = {
  quotes: [
    {
      id: "quote-1",
      category: "quotes",
      text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle.",
      difficulty: "easy",
      source: "Steve Jobs",
    },
    {
      id: "quote-2",
      category: "quotes",
      text: "Innovation distinguishes between a leader and a follower. Your time is limited, so don't waste it living someone else's life.",
      difficulty: "easy",
      source: "Steve Jobs",
    },
    {
      id: "quote-3",
      category: "quotes",
      text: "The future belongs to those who believe in the beauty of their dreams. It is during our darkest moments that we must focus to see the light.",
      difficulty: "easy",
      source: "Eleanor Roosevelt",
    },
    {
      id: "quote-4",
      category: "quotes",
      text: "Success is not final, failure is not fatal: it is the courage to continue that counts. We make a living by what we get, but we make a life by what we give.",
      difficulty: "medium",
      source: "Winston Churchill",
    },
    {
      id: "quote-5",
      category: "quotes",
      text: "Be yourself; everyone else is already taken. I can resist everything except temptation. We are all in the gutter, but some of us are looking at the stars.",
      difficulty: "medium",
      source: "Oscar Wilde",
    },
  ],
  literature: [
    {
      id: "lit-1",
      category: "literature",
      text: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness.",
      difficulty: "medium",
      source: "Charles Dickens - A Tale of Two Cities",
    },
    {
      id: "lit-2",
      category: "literature",
      text: "In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.",
      difficulty: "medium",
      source: "J.R.R. Tolkien - The Hobbit",
    },
    {
      id: "lit-3",
      category: "literature",
      text: "All happy families are alike; each unhappy family is unhappy in its own way. Everything was in confusion in the Oblonskys' house. The wife had discovered that the husband was carrying on an intrigue with a French girl, who had been a governess in their family.",
      difficulty: "hard",
      source: "Leo Tolstoy - Anna Karenina",
    },
    {
      id: "lit-4",
      category: "literature",
      text: "To be or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them?",
      difficulty: "hard",
      source: "William Shakespeare - Hamlet",
    },
  ],
  programming: [
    {
      id: "prog-1",
      category: "programming",
      text: "function calculateSum(arr) { return arr.reduce((sum, num) => sum + num, 0); } const numbers = [1, 2, 3, 4, 5]; console.log(calculateSum(numbers));",
      difficulty: "hard",
      source: "JavaScript",
      tags: ["javascript", "functions", "arrays"],
    },
    {
      id: "prog-2",
      category: "programming",
      text: "class Rectangle { constructor(width, height) { this.width = width; this.height = height; } getArea() { return this.width * this.height; } }",
      difficulty: "hard",
      source: "JavaScript",
      tags: ["javascript", "classes", "oop"],
    },
    {
      id: "prog-3",
      category: "programming",
      text: "def fibonacci(n): if n <= 1: return n else: return fibonacci(n-1) + fibonacci(n-2) for i in range(10): print(fibonacci(i))",
      difficulty: "hard",
      source: "Python",
      tags: ["python", "recursion", "algorithms"],
    },
    {
      id: "prog-4",
      category: "programming",
      text: "import React, { useState, useEffect } from 'react'; const Counter = () => { const [count, setCount] = useState(0); return <button onClick={() => setCount(count + 1)}>{count}</button>; };",
      difficulty: "hard",
      source: "React",
      tags: ["react", "hooks", "jsx"],
    },
  ],
  news: [
    {
      id: "news-1",
      category: "news",
      text: "Technology companies are investing heavily in artificial intelligence research and development. The rapid advancement of machine learning algorithms has opened new possibilities for automation and data analysis across various industries.",
      difficulty: "medium",
      source: "Tech News",
    },
    {
      id: "news-2",
      category: "news",
      text: "Climate change continues to be a pressing global issue, with scientists calling for immediate action to reduce carbon emissions. Renewable energy sources are becoming more cost-effective and widely adopted worldwide.",
      difficulty: "medium",
      source: "Environmental News",
    },
    {
      id: "news-3",
      category: "news",
      text: "The global economy shows signs of recovery as international trade volumes increase. Supply chain disruptions that affected many industries are gradually being resolved through improved logistics and technology.",
      difficulty: "medium",
      source: "Economic News",
    },
  ],
  science: [
    {
      id: "sci-1",
      category: "science",
      text: "Photosynthesis is the process by which plants convert light energy, usually from the sun, into chemical energy that can be later released to fuel the organism's activities. This process occurs in the chloroplasts of plant cells.",
      difficulty: "hard",
      source: "Biology",
    },
    {
      id: "sci-2",
      category: "science",
      text: "The theory of relativity, developed by Albert Einstein, fundamentally changed our understanding of space, time, and gravity. It consists of two interrelated theories: special relativity and general relativity.",
      difficulty: "hard",
      source: "Physics",
    },
    {
      id: "sci-3",
      category: "science",
      text: "DNA, or deoxyribonucleic acid, is a molecule that carries genetic instructions for the development, functioning, growth, and reproduction of all known living organisms and many viruses.",
      difficulty: "hard",
      source: "Genetics",
    },
  ],
  business: [
    {
      id: "bus-1",
      category: "business",
      text: "Effective leadership requires clear communication, strategic thinking, and the ability to inspire and motivate team members. Successful leaders adapt their management style to different situations and individuals.",
      difficulty: "medium",
      source: "Management",
    },
    {
      id: "bus-2",
      category: "business",
      text: "Market research is essential for understanding customer needs and preferences. Companies use various methods including surveys, focus groups, and data analytics to gather insights about their target audience.",
      difficulty: "medium",
      source: "Marketing",
    },
    {
      id: "bus-3",
      category: "business",
      text: "Financial planning involves setting goals, assessing resources, and creating strategies to achieve desired outcomes. It includes budgeting, investment planning, and risk management to ensure long-term financial stability.",
      difficulty: "medium",
      source: "Finance",
    },
  ],
  "common-words": [
    {
      id: "words-1",
      category: "common-words",
      text: "the be to of and a in that have it for not on with he as you do at this but his by from they she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take people into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us",
      difficulty: "easy",
      source: "Common English Words",
    },
  ],
  numbers: [
    {
      id: "num-1",
      category: "numbers",
      text: "1234567890 !@#$%^&*() 1+1=2 2*3=6 4/2=2 5-3=2 The price is $19.99 and the tax is 8.25%. Call us at (555) 123-4567 or email support@company.com for assistance.",
      difficulty: "medium",
      source: "Numbers and Symbols",
    },
    {
      id: "num-2",
      category: "numbers",
      text: "Invoice #2024-001: Item A ($15.50) + Item B ($23.75) + Tax (7.5%) = Total: $42.69. Payment due: 30 days. Account: 1234-5678-9012-3456.",
      difficulty: "hard",
      source: "Business Numbers",
    },
  ],
}

export class TextGenerator {
  static getRandomText(category?: string, difficulty?: "easy" | "medium" | "hard", wordCount?: number): string {
    let availableTexts: TextContent[] = []

    if (category && TEXT_CONTENT[category]) {
      availableTexts = TEXT_CONTENT[category]
    } else {
      // Get texts from all categories
      availableTexts = Object.values(TEXT_CONTENT).flat()
    }

    // Filter by difficulty if specified
    if (difficulty) {
      availableTexts = availableTexts.filter((text) => text.difficulty === difficulty)
    }

    if (availableTexts.length === 0) {
      return "The quick brown fox jumps over the lazy dog."
    }

    const randomText = availableTexts[Math.floor(Math.random() * availableTexts.length)]

    // If word count is specified, truncate or extend the text
    if (wordCount && category !== "common-words") {
      const words = randomText.text.split(" ")
      if (words.length > wordCount) {
        return words.slice(0, wordCount).join(" ")
      } else if (words.length < wordCount) {
        // Repeat the text to reach desired word count
        let result = randomText.text
        while (result.split(" ").length < wordCount) {
          result += " " + randomText.text
        }
        return result.split(" ").slice(0, wordCount).join(" ")
      }
    }

    return randomText.text
  }

  static generateCommonWords(count: number): string {
    const commonWords = [
      "the",
      "be",
      "to",
      "of",
      "and",
      "a",
      "in",
      "that",
      "have",
      "it",
      "for",
      "not",
      "on",
      "with",
      "he",
      "as",
      "you",
      "do",
      "at",
      "this",
      "but",
      "his",
      "by",
      "from",
      "they",
      "she",
      "or",
      "an",
      "will",
      "my",
      "one",
      "all",
      "would",
      "there",
      "their",
      "what",
      "so",
      "up",
      "out",
      "if",
      "about",
      "who",
      "get",
      "which",
      "go",
      "me",
      "when",
      "make",
      "can",
      "like",
      "time",
      "no",
      "just",
      "him",
      "know",
      "take",
      "people",
      "into",
      "year",
      "your",
      "good",
      "some",
      "could",
      "them",
      "see",
      "other",
      "than",
      "then",
      "now",
      "look",
      "only",
      "come",
      "its",
      "over",
      "think",
      "also",
      "back",
      "after",
      "use",
      "two",
      "how",
      "our",
      "work",
      "first",
      "well",
      "way",
      "even",
      "new",
      "want",
      "because",
      "any",
      "these",
      "give",
      "day",
      "most",
      "us",
      "is",
      "water",
      "been",
      "call",
      "who",
      "oil",
      "sit",
      "now",
      "find",
      "long",
      "down",
      "day",
      "did",
      "get",
      "has",
      "him",
      "his",
      "how",
      "man",
      "new",
      "old",
      "see",
      "two",
      "way",
      "who",
      "boy",
      "did",
      "its",
      "let",
      "put",
      "say",
      "she",
      "too",
      "use",
    ]

    const shuffled = [...commonWords].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count).join(" ")
  }

  static getCategory(categoryId: string): TextCategory | undefined {
    return TEXT_CATEGORIES.find((cat) => cat.id === categoryId)
  }

  static getAllCategories(): TextCategory[] {
    return TEXT_CATEGORIES
  }
}
