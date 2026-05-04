export enum AccountType {
  IB = 'The Insurance Boss',
  QC = 'Quick Coverage',
  LIB = 'The Life Insurance Boss'
}

export enum WeekTheme {
  WEEK1 = 'Foundation & Authority',
  WEEK2 = 'Authority + Retargeting',
  WEEK3 = 'Growth + Boosting',
  WEEK4 = 'Conversion Week'
}

export type SocialPlatform = 'ALL' | 'Instagram' | 'Facebook' | 'LinkedIn' | 'X' | 'YouTube';

export const ACCOUNT_PLATFORMS: Record<AccountType, SocialPlatform[]> = {
  [AccountType.IB]: ['Instagram', 'Facebook', 'LinkedIn', 'X', 'YouTube'],
  [AccountType.QC]: ['Instagram', 'Facebook', 'LinkedIn', 'X'],
  [AccountType.LIB]: ['Instagram', 'Facebook']
};

export type PostCategory = 'Reel' | 'Video' | 'Carousel';

export interface PostTask {
  id: string;
  day: number;
  date: string;
  week: number;
  weekTheme: WeekTheme;
  account: AccountType;
  title: string;
  content: string;
  category: PostCategory;
  backgroundImagePrompt?: string;
  copy?: string;
  hashtags?: string;
  description?: string;
}

export interface GeneratedPrompt {
  taskId: string;
  text: string;
}

export type QuoteCategory = 
  | 'P&C' 
  | 'Life' 
  | 'Claims/Fraud' 
  | 'Wealth' 
  | 'Retirement' 
  | 'Business' 
  | 'Real Estate' 
  | 'Savings' 
  | 'Family' 
  | 'Humor' 
  | 'Driving' 
  | 'Coffee' 
  | 'Organic' 
  | 'Bakery' 
  | 'Weekend' 
  | 'Holiday' 
  | 'Monday'
  | 'Commercial Risk'
  | 'Lender FAQ'
  | 'Insurance Agents'
  | 'Protection'
  | 'Life Insurance Agents'
  | 'Whole Life Insurance'
  | 'Universal Life Insurance'
  | 'Term Life Insurance'
  | 'Mortgage Protection Insurance'
  | 'Disability Insurance'
  | 'Life Insurance'
  | 'Meme';

export interface QuoteItem {
  id: string;
  text: string;
  category: QuoteCategory;
  account: AccountType;
}