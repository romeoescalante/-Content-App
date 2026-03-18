export enum AccountType {
  IB = 'The Insurance Boss',
  QC = 'Quick Coverage',
  LIB = 'The Life Insurance Boss',
  PB = 'The Protection Boss'
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
  [AccountType.LIB]: ['Instagram', 'Facebook'],
  [AccountType.PB]: ['Instagram', 'Facebook']
};

export type PostCategory = 'Reel' | 'Slide' | 'Meme' | 'Story' | 'Text' | 'Video' | 'Holiday' | 'YouTube Shorts' | 'Infographic' | 'Carousel';

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
  | 'Residual Income'
  | 'Insurance Agents'
  | 'Protection'
  | 'Life Insurance Agents'
  | 'Meme';

export interface QuoteItem {
  id: string;
  text: string;
  category: QuoteCategory;
  account: AccountType;
}