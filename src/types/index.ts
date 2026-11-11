export type SceneType =
  | 'loading'
  | 'pin'
  | 'welcome'
  | 'gallery'
  | 'games'
  | 'timeline'
  | 'letter'
  | 'finale';

export type GameType = 'quiz' | 'memory' | 'puzzle' | 'none';

export interface PhotoItem {
  id: number;
  src: string;
  caption: string;
  date: string;
  rotation: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  emoji: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

export interface MemoryCard {
  id: number;
  emoji: string;
  label: string;
}

export interface PuzzleConfig {
  clue: string;
  hint: string;
  answer: string;
  secretMessage: string;
}

export interface VoucherItem {
  id: string;
  serial: string;
  title: string;
  subtitle: string;
  reward: string;
  instructions: string;
  theme: 'pink' | 'gold' | 'rose';
  recipient: string;
  validUntil?: string;
}

export interface DinnerDetails {
  date: string;
  restaurant: string;
  location: string;
  time?: string;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface BirthdayConfig {
  girlfriendName: string;
  myName: string;
  birthdayDate: string;
  pin: string;
  greetingText: string;
  letterParagraphs: string[];
  photos: PhotoItem[];
  timeline: TimelineEvent[];
  quizQuestions: QuizQuestion[];
  memoryCards: MemoryCard[];
  puzzle: PuzzleConfig;
  vouchers: VoucherItem[];
  dinnerDetails: DinnerDetails;
  theme: ThemeColors;
}
