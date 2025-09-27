export type Verdict = 'ALLOW' | 'NEEDS_FIX' | 'BLOCK';

export interface ReviewResult {
  verdict: Verdict;
  reasons: string[];
  sanitizedPrompt: string;
  aiResponse?: string;
}

export interface PromptReview {
  id: string;
  prompt: string;
  verdict: Verdict;
  reasons: string[];
  sanitizedPrompt: string;
  aiResponse?: string;
  createdAt: Date;
}

const BANNED_WORDS = [
  'bomb', 'kill', 'hack', 'gun', 'murder', 'attack', 'terrorist', 
  'drugs', 'weapon', 'explode', 'shoot', 'steal', 'fight'
];

const MIN_WORDS = 5;

export function reviewPrompt(prompt: string): ReviewResult {
  const reasons: string[] = [];
  let verdict: Verdict = 'ALLOW';
  
  // Sanitize prompt (replace banned words with ***)
  const sanitizedPrompt = sanitizePrompt(prompt);
  
  // Rule 1: Check length
  const wordCount = prompt.trim().split(/\s+/).length;
  if (wordCount < MIN_WORDS) {
    verdict = 'NEEDS_FIX';
    reasons.push('Prompt is too short and unclear.');
  }
  
  // Rule 2: Check for banned keywords
  const lowerPrompt = prompt.toLowerCase();
  const foundBannedWords = BANNED_WORDS.filter(word => 
    lowerPrompt.includes(word.toLowerCase())
  );
  
  if (foundBannedWords.length > 0) {
    verdict = 'BLOCK';
    reasons.push('Prompt contains unsafe content.');
  }
  
  // If no issues found
  if (reasons.length === 0) {
    reasons.push('Prompt meets all safety guidelines.');
  }
  
  return {
    verdict,
    reasons,
    sanitizedPrompt
  };
}

function sanitizePrompt(prompt: string): string {
  let sanitized = prompt;
  
  BANNED_WORDS.forEach(word => {
    const regex = new RegExp(word, 'gi');
    sanitized = sanitized.replace(regex, '***');
  });
  
  return sanitized;
}

export function saveReview(prompt: string, result: ReviewResult): PromptReview {
  const review: PromptReview = {
    id: Date.now().toString(),
    prompt,
    ...result,
    createdAt: new Date()
  };
  
  // Save to localStorage
  const existing = getReviewHistory();
  const updated = [review, ...existing];
  localStorage.setItem('promptReviews', JSON.stringify(updated));
  
  return review;
}

export function getReviewHistory(): PromptReview[] {
  try {
    const stored = localStorage.getItem('promptReviews');
    if (!stored) return [];
    
    const parsed = JSON.parse(stored);
    return parsed.map((review: any) => ({
      ...review,
      createdAt: new Date(review.createdAt)
    }));
  } catch {
    return [];
  }
}