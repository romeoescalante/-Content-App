import { PostTask, AccountType, WeekTheme, QuoteItem, PostCategory, QuoteCategory } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const getFutureDate = (dayOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + (dayOffset - 1));
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const ib = AccountType.IB;
const qc = AccountType.QC;
const lib = AccountType.LIB;
const pb = AccountType.PB; 

// Helper to generate a batch of posts for a specific category/account
const generateCategoryBatch = (account: AccountType, category: PostCategory, items: {title: string, content: string}[]): PostTask[] => {
  return items.map((item, index) => {
    let content = item.content;
    if (account === AccountType.IB) {
      content += " Visit theinsuranceboss.com to find more info.";
    }
    return {
      id: generateId(),
      day: index + 1, // Placeholder day
      date: getFutureDate(index + 1),
      week: Math.floor(index / 7) + 1,
      weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor(index / 7)] || WeekTheme.WEEK4,
      account,
      title: item.title,
      content,
      category
    };
  });
};

const IB_POSTS: PostTask[] = [
  ...generateCategoryBatch(ib, 'Reel', [
    { title: "The Industry Secret", content: "5-8s clip of a dark office. Hook: 'Insurance companies hope business owners never learn this.' Statement: 'They count on your ignorance to protect their margins.' Insight: 'The real risk isn't the premium; it's the exclusion on page 42.' CTA: 'Comment INFO if you want the breakdown.'" },
    { title: "The Lawsuit Trap", content: "5-8s clip of a shredder. Hook: 'This lawsuit is about to destroy thousands of businesses.' Statement: 'Standard policies are built to fail when you need them most.' Insight: 'Nuclear verdicts are the new normal.' CTA: 'Tag a business owner who needs to see this.'" },
    { title: "The Bankrupt Reality", content: "5-8s clip of a silhouetted figure. Hook: 'Most business owners insure everything except the thing that actually bankrupts them.' Statement: 'You're protecting the building but leaving the empire exposed.' Insight: 'Umbrella liability is your only real shield.' CTA: 'Would this bankrupt your company?'" },
    { title: "The One Mistake", content: "5-8s clip of a hand signing a contract. Hook: 'One insurance mistake can wipe out everything you built.' Statement: 'Unvetted indemnity clauses are a death sentence.' Insight: 'We audit the fine print so you don't have to.' CTA: 'Comment INFO for an audit.'" },
    { title: "The $100k Fine Print", content: "5-8s clip of a red pen. Hook: 'This one sentence just cost you $100k.' Statement: 'Your agent didn't even read it because they're too comfortable.' Insight: 'Transparency is the only cure for a bad policy.' CTA: 'Tag a business owner.'" },
    { title: "Why Your Agent is Quiet", content: "5-8s clip of a dark library. Hook: 'Why your agent is so quiet during renewal season.' Statement: 'They aren't busy; they're just waiting for the residuals to hit.' Insight: 'The 90-day cycle is a trap.' CTA: 'Comment INFO to switch.'" },
    { title: "The Concrete Truth", content: "5-8s clip of a construction site. Hook: 'We don't look at the view; we look at the exposures.' Statement: 'Grounded power comes from knowing exactly where you're vulnerable.' Insight: 'Risk is a profit center if managed right.' CTA: 'Would this bankrupt your company?'" },
    { title: "The $50M Reality", content: "5-8s clip of a city skyline. Hook: 'Why $10M is no longer enough for the elite.' Statement: 'The rise of nuclear verdicts has changed the game.' Insight: 'Layering your defense is the only way to survive.' CTA: 'Comment INFO for the strategy.'" },
    { title: "The Workers Comp Heist", content: "5-8s clip of a calculator. Hook: 'How carriers manipulate your E-Mod.' Statement: 'The hidden errors in payroll audits are costing you thousands.' Insight: 'Reclaiming overpayments is our specialty.' CTA: 'Tag a business owner.'" },
    { title: "The AI Liability Trap", content: "5-8s clip of a server room. Hook: 'Your policy doesn't cover AI-driven errors.' Statement: 'The silent exclusion in standard forms is a ticking time bomb.' Insight: 'Bridge the gap before it's too late.' CTA: 'Comment INFO to bridge the gap.'" },
    { title: "The Transparency Manifesto", content: "5-8s clip of a dark office. Hook: 'Why your broker's commission is a secret.' Statement: 'The hidden fees in your premium are funding their lifestyle, not your protection.' Insight: 'Fee-only advisory is the future.' CTA: 'Tag a business owner.'" },
    { title: "The Contractual Warfare", content: "5-8s clip of a contract. Hook: 'Your vendors are shifting their risk to YOU.' Statement: 'The indemnity clause you missed is a liability magnet.' Insight: 'Win the contract war with the Boss Review.' CTA: 'Comment INFO to win.'" },
    { title: "The Renewal Revolution", content: "5-8s clip of a clock. Hook: 'Stop being a victim of the 90-day renewal cycle.' Statement: 'The 365-day risk management strategy is the only way to win.' Insight: 'We architect; we don't shop.' CTA: 'Would this bankrupt your company?'" },
    { title: "The CEO's Audit", content: "5-8s clip of a leader from behind. Hook: '7 things to demand from your agent today.' Statement: 'If they can't answer these, they aren't protecting you.' Insight: 'An audit is the first step to certainty.' CTA: 'Comment INFO for the checklist.'" },
    { title: "The Residual Exposed", content: "5-8s clip of a phone lighting up. Hook: 'The truth about why your agent wants you to stay with the same carrier.' Statement: 'It's about their residuals, not your results.' Insight: 'Transparency is the only way out.' CTA: 'Tag a business owner.'" },
    { title: "The Cyber Gap", content: "5-8s clip of a laptop. Hook: 'The one entry point every mid-market firm misses.' Statement: 'Your cyber policy is full of holes you haven't seen yet.' Insight: 'Expose the gap before the hackers do.' CTA: 'Comment INFO for the audit.'" },
    { title: "The Audit Win", content: "5-8s clip of a check. Hook: 'How we found $42k in overpayments in 15 minutes.' Statement: 'The industry counts on your ignorance.' Insight: 'We find what they hide.' CTA: 'Would this bankrupt your company?'" },
    { title: "The Safety Manual Lie", content: "5-8s clip of a manual. Hook: 'Why your safety manual is actually increasing your liability risk.' Statement: 'Outdated protocols are a legal nightmare.' Insight: 'Update your shield.' CTA: 'Tag a business owner.'" },
    { title: "The Elite's Shield", content: "5-8s clip of a concrete pillar. Hook: 'The top 1% don't buy policies. They buy certainty.' Statement: 'Join the Whistleblower Inner Circle.' Insight: 'Protect the empire.' CTA: 'Comment INFO to join.'" },
    { title: "The Boss POV", content: "5-8s clip of a city view. Hook: 'What the Boss sees that your agent misses.' Statement: 'We look for the exposures that others ignore.' Insight: 'Grounded power is the only way.' CTA: 'Would this bankrupt your company?'" }
  ]),
  ...generateCategoryBatch(ib, 'Carousel', [
    { title: "The 2026 Risk Reset", content: "Slide 1: Why your 2025 policy is a ticking time bomb. Slide 2: The inflation gap in property values. Slide 3: New liability precedents. Slide 4: The Whistleblower Audit. Slide 5: Secure your future. Slide 6: The 2026 Protocol." },
    { title: "The Transparency Manifesto", content: "Slide 1: Why your broker's commission is a secret. Slide 2: The hidden fees in your premium. Slide 3: Our fee-only advisory model. Slide 4: Total transparency, total protection. Slide 5: Join the movement. Slide 6: Audit your agent." },
    { title: "The $50M Umbrella Reality", content: "Slide 1: Why $10M is no longer enough for the elite. Slide 2: The rise of nuclear verdicts. Slide 3: Shielding personal assets from business fallout. Slide 4: Layering your defense. Slide 5: The Boss Umbrella. Slide 6: Build your fortress." },
    { title: "The Workers Comp Heist", content: "Slide 1: How carriers manipulate your E-Mod. Slide 2: The hidden errors in payroll audits. Slide 3: Reclaiming your overpayments. Slide 4: The Whistleblower Protocol. Slide 5: Real recovery stories. Slide 6: Start your audit." }
  ]),
  ...generateCategoryBatch(ib, 'Infographic', [
    { title: "The Liability Iceberg", content: "Exposing the risks below the surface that standard policies ignore. High-contrast diagram. 5% Static content strategy." }
  ])
];

const QC_POSTS: PostTask[] = [
  ...generateCategoryBatch(qc, 'Carousel', [
    { title: "The 2026 Homeowner's Guide", content: "Slide 1: Why 2026 is the year to rethink your coverage. Slide 2: Rising costs vs. The QC Bundle. Slide 3: Protecting your equity in a changing market. Slide 4: Real neighbor success stories. Slide 5: Get your free guide today. Warm golden hour lighting." },
    { title: "Inflation-Proof Your Policy", content: "Slide 1: Don't let inflation shrink your safety net. Slide 2: Adjusting limits without breaking the bank. Slide 3: The QC 'Value Lock' strategy. Slide 4: Real savings data for 2026. Slide 5: Review your policy with a neighbor. Friendly, helpful tone." },
    { title: "The First-Time Buyer's Shield", content: "Slide 1: Just got the keys? Here's your protection plan. Slide 2: Home + Auto = The Foundation. Slide 3: Why gaps in coverage are a new owner's nightmare. Slide 4: The QC welcome package. Slide 5: Secure your first home today. Heartfelt imagery." },
    { title: "Auto Insurance Myths Debunked", content: "Slide 1: 'Red cars cost more' and other lies. Slide 2: The truth about full coverage in 2026. Slide 3: How your commute actually impacts your rate. Slide 4: The QC transparency report. Slide 5: Get the facts, save the money. Bright morning sun." },
    { title: "The Multi-Gen Bundle", content: "Slide 1: Saving together as a family. Slide 2: How multi-gen households can stack discounts. Slide 3: One policy for the whole nest. Slide 4: Real stories of families saving $1,200+. Slide 5: Bring the family to QC. Tech-lifestyle aesthetic." },
    { title: "Smart Tech, Real Savings", content: "Slide 1: Your smart home is a discount machine. Slide 2: Leak detectors, cameras, and smart locks. Slide 3: How tech lowers your risk profile. Slide 4: The QC 'Smart Credit' program. Slide 5: Modernize your protection today. Friendly interactions." },
    { title: "The QC Neighborhood Promise", content: "Slide 1: We're not just your agents; we're your neighbors. Slide 2: Local support when you need it most. Slide 3: Why community-first insurance wins in 2026. Slide 4: Our commitment to you. Slide 5: Join the neighborhood today. Calm, bright aesthetic." }
  ]),
  ...generateCategoryBatch(qc, 'Reel', [
    { title: "The $1,200 Bundle Surprise", content: "A young couple opening an envelope on a sun-drenched porch. 'That moment you realize bundling Home + Auto just paid for your summer vacation.' Warm golden hour." },
    { title: "The 'Just in Case' Coffee", content: "Two neighbors chatting over a fence with coffee. 'Insurance shouldn't be a headache. It's just looking out for each other. Let's talk coverage.' Friendly and authentic." },
    { title: "The 2026 Safe Driver Bonus", content: "POV of a clean car interior driving through a green neighborhood. 'Your good habits are literally putting money back in your pocket this year. See the QC difference.' Bright morning sun." },
    { title: "The First Home Hug", content: "A family hugging in front of a 'Sold' sign. 'Protecting your first big dream is our favorite part of the job. Welcome to the neighborhood.' Heartfelt and emotional." },
    { title: "The Smart Home Savings Hack", content: "Quick clips of a smart doorbell and a leak sensor. 'These little gadgets aren't just cool—they're discount magnets at Quick Coverage.' Tech-lifestyle aesthetic." },
    { title: "The Claims Hero: Flat Tire Edition", content: "A friendly agent arriving with a smile to help a stranded driver. 'We're not just a policy; we're the person who shows up when things go wrong.' Reassuring and helpful." },
    { title: "The Neighborhood Rate Lock", content: "A group of diverse neighbors laughing at a block party. 'In a world of rising costs, we're locking in value for our community. Join the QC family.' Calm, bright aesthetic." }
  ]),
  ...generateCategoryBatch(qc, 'Infographic', [
    { title: "The 2026 Savings Roadmap", content: "A clean, colorful path showing the steps from safe driving to the ultimate multi-policy bundle. Friendly icons." },
    { title: "Bundle vs. Solo: The Math", content: "A side-by-side comparison of two families' budgets. One with QC (thriving) vs. one with split policies (struggling)." },
    { title: "Home Maintenance = Lower Rates", content: "Visual checklist of roof care, gutter cleaning, and pipe insulation with potential savings callouts." },
    { title: "The 3-Step Switch", content: "A simple 1-2-3 photo sequence showing how easy it is to move your policies to QC. No jargon, just help." },
    { title: "Discount Deep Dive", content: "A visual map of a family home highlighting hidden credits: security, smart tech, and safe neighborhood bonuses." },
    { title: "The Claims Safety Net", content: "A reassuring photo-based flow chart: 1. Stay Safe, 2. Call Your Neighbor, 3. We Handle It, 4. Peace of Mind." },
    { title: "Your Family's Protection Shield", content: "A friendly diagram showing how Home, Auto, and Life insurance overlap to create a total safety net." }
  ]),
  ...generateCategoryBatch(qc, 'YouTube Shorts', [
    { title: "The $400 Challenge", content: "Send us your dec page and we'll beat it or coffee's on us. Shot in a bright local cafe." },
    { title: "Don't Forget Renters", content: "Quick tip for apartment dwellers about the $10/mo policy that saves your life." },
    { title: "New SUV Hack", content: "Why you should quote insurance BEFORE you buy the car at the dealership." },
    { title: "The Roof Secret", content: "How a 10-year roof can double your home insurance if you don't update the age." },
    { title: "Good Student Credit", content: "Reminding parents to send in report cards for that 15% car discount." },
    { title: "Water Heater Alert", content: "If yours is over 12 years old, your policy might be in trouble. Check it now." },
    { title: "Welcome Home!", content: "A 15-second celebrate of a new homeowner getting their binders in time for closing." }
  ]),
  ...generateCategoryBatch(qc, 'Meme', [
    { title: "The Loyalty Penalty", content: "Photo of someone sadly paying a huge bill. Caption: When you stay with the same carrier for 10 years without shopping." },
    { title: "The Bundle Smile", content: "A happy family at a BBQ. Caption: That feeling when your Home+Auto bundle drops the rate by 30%." },
    { title: "Direct Quote Disaster", content: "Photo of someone frustrated at a laptop. Caption: Trying to understand a 1-800 agent's fine print." },
    { title: "Quick Coverage Speed", content: "Photo of a friendly agent handing over keys. Caption: We got the binder done before the realtor finished the paperwork." },
    { title: "The 2026 Savings", content: "Caption: Me finding $600 in my budget after one phone call to QC." },
    { title: "Safe Driver Flex", content: "Photo of a safe driver app screen (re-enacted with people). Caption: Getting that 20% discount for my daily commute." },
    { title: "Neighborly Help", content: "Photo of neighbors talking over a fence. Caption: Telling the neighbors how much you saved on your bundle." }
  ]),
  ...generateCategoryBatch(qc, 'Text', [
    { title: "Why Bundling Still Wins", content: "A warm, helpful explanation of the multi-policy math for 2026." },
    { title: "Protecting the Nest", content: "Heartfelt advice for first-time parents on setting up a safety net." },
    { title: "The Realtor's Secret", content: "Why agents love working with Quick Coverage for their clients' closings." },
    { title: "Spring Home Prep", content: "A checklist for homeowners to lower their risk and their rates this season." },
    { title: "The Truth About Life", content: "Simple, non-scary talk about term life insurance for young families." },
    { title: "Car Insurance 101", content: "Explaining deductibles and liability limits in plain English for parents." },
    { title: "The QC Promise", content: "Why we treat every client like a next-door neighbor." }
  ]),
  ...generateCategoryBatch(qc, 'Story', [
    { title: "Coffee & Coverage", content: "Friendly agent chat in a bright morning sun. Full color, warm vibes." },
    { title: "Closing Day Success", content: "Celebrating a family getting the keys to their first home. Cinematic lighting." },
    { title: "New Car Prep", content: "Adding a new vehicle to a policy in 30 seconds while in the driveway." },
    { title: "Bundle Savings Reveal", content: "A quick screenshot of a 'Saved $540' notification (re-enacted)." },
    { title: "Storm Prep Tips", content: "Friendly tips on securing outdoor furniture before the rain hits." },
    { title: "Community Shoutout", content: "Highlighting a local family business we just protected." },
    { title: "Ask Me Anything", content: "Quick Q&A on homeowners insurance for young buyers." }
  ]),
  ...generateCategoryBatch(qc, 'Video', [
    { title: "The $600 Savings Story", content: "A 60-second mini-doc following a real family through the quoting process." },
    { title: "Home Insurance Decoded", content: "A friendly, bright video explaining what 'Replacement Cost' actually means." },
    { title: "The Bundle Masterclass", content: "Explaining the benefits of having all your policies under one roof." },
    { title: "Safe Home, Safe Rates", content: "A walkthrough of a modern home showing the small devices that save big on premiums." },
    { title: "The Realtor Partnership", content: "Interview with a local real estate pro on why QC is their first call." },
    { title: "Teen Driver Safety", content: "Tips for parents on keeping rates low when the kids start driving." },
    { title: "Life for Beginners", content: "A warm, emotional video on why term life insurance is the ultimate family gift." }
  ]),
  ...generateCategoryBatch(qc, 'Slide', [
    { title: "5 Steps to Savings", content: "Visualizing the switch process with warm family photos." },
    { title: "The Bundle Breakdown", content: "Showing Home vs Auto vs Bundle rates with simple icons." },
    { title: "Claims Help Checklist", content: "Photos of what to do in an accident (stay calm, call us)." },
    { title: "New Homeowner Tips", content: "Important things to check on your first week." },
    { title: "Discounts Available", content: "A simple list of things that lower your premiums." },
    { title: "The QC Process", content: "How we get you a better rate in under 10 minutes." },
    { title: "Family Protection Tiers", content: "Simple visual of basic vs premium safety nets." }
  ]),
  ...generateCategoryBatch(qc, 'Holiday', [
    { title: "Safe 4th of July", content: "Friendly tips on fireworks safety in the backyard. Sun-drenched family photos." },
    { title: "Home for the Holidays", content: "Protecting the house while you travel. Warm winter home interior." },
    { title: "Thanksgiving Table", content: "Grateful for the families who trust us with their security. Cinematic kitchen." },
    { title: "Halloween Safety", content: "Tips for trick-or-treaters and porch safety. Warm evening lighting." },
    { title: "Mother's Day Shield", content: "Honoring the protectors of the home. Heartfelt family moment." },
    { title: "Father's Day Strength", content: "For the dads who build the foundation. Cinematic backyard grill." },
    { title: "New Year, New Quote", content: "The best resolution for your budget. Bright morning sun." }
  ])
];

const generatePlaceholders = (account: AccountType): PostTask[] => {
    const cats: PostCategory[] = ['Reel', 'Slide', 'Meme', 'Story', 'Text', 'Video', 'Holiday', 'YouTube Shorts', 'Infographic', 'Carousel'];
    let batch: PostTask[] = [];
    
    const getAccountTitles = (acc: AccountType, cat: PostCategory) => {
        if (acc === AccountType.LIB) {
            switch (cat) {
                case 'Carousel':
                    return [
                        { title: "The Life Shield", content: "Slide 1: Why life insurance is the ultimate act of love. Slide 2: Term vs Whole Life. Slide 3: Protecting your family's future. Slide 4: The cost of waiting. Slide 5: Get covered today." },
                        { title: "Legacy Secrets", content: "Slide 1: Building generational wealth. Slide 2: Tax-free growth. Slide 3: The power of cash value. Slide 4: Passing the torch. Slide 5: The LIB Blueprint." },
                        { title: "The Provider's Edge", content: "Slide 1: Protecting your most valuable asset. Slide 2: Income replacement math. Slide 3: Debt elimination. Slide 4: Education funding. Slide 5: Total security." },
                        { title: "Term vs Whole", content: "Slide 1: The great debate. Slide 2: When Term wins. Slide 3: When Whole Life is a must. Slide 4: The hybrid strategy. Slide 5: Ask the Boss." },
                        { title: "The Cost of Waiting", content: "Slide 1: Age is your biggest risk factor. Slide 2: Health rating impact. Slide 3: The compound loss of delay. Slide 4: Locking in your rate. Slide 5: Act now." },
                        { title: "Family Security Audit", content: "Slide 1: 5 questions to ask today. Slide 2: Beneficiary check. Slide 3: Coverage gap analysis. Slide 4: Policy review. Slide 5: Schedule your audit." },
                        { title: "The Legacy Blueprint", content: "Slide 1: Planning for 100 years. Slide 2: Trust integration. Slide 3: Estate tax protection. Slide 4: The LIB method. Slide 5: Build your empire." }
                    ];
                case 'Reel':
                    return [
                        { title: "Viral Life Hacks", content: "High-energy shots of families and future planning. 'The hack to 10x your family's security in 10 minutes.' Emotional and impactful." },
                        { title: "The Provider's POV", content: "POV shot of signing a policy. 'This isn't a bill; it's a love letter to my kids.' Moody lighting." },
                        { title: "Legacy in 60 Seconds", content: "Fast-paced montage of family moments. 'Wealth isn't what you leave; it's who you leave it to.' Cinematic B&W." },
                        { title: "The Audit Reaction", content: "Reaction video to a massive coverage gap. 'Don't let this happen to your family.' Authoritative tone." },
                        { title: "Life Insurance Truths", content: "Direct address to camera. 'Why the industry wants you to stay under-insured.' Whistleblower vibes." },
                        { title: "The Peace of Mind Walk", content: "Walking through a quiet park. 'Knowing they're safe is the only way I sleep.' Grounded power." },
                        { title: "Boss Strategy Session", content: "Quick clip of a strategy board. 'Mapping out a 3-generation legacy.' High energy." }
                    ];
                case 'Infographic':
                    return [
                        { title: "The Life Insurance Pyramid", content: "Visualizing the layers of protection from basic term to complex legacy planning. B&W aesthetic." },
                        { title: "The Cost of Delay Map", content: "A chart showing how premiums rise every year you wait. High contrast." },
                        { title: "Term vs. Whole Comparison", content: "A side-by-side breakdown of features, costs, and benefits. Clear and strategic." },
                        { title: "The Legacy Flowchart", content: "How a policy payout transforms into generational wealth. LIB style." },
                        { title: "Income Replacement Math", content: "A simple formula for calculating how much coverage your family actually needs." },
                        { title: "The Asset Shield", content: "How life insurance protects your other investments from estate taxes." },
                        { title: "7 Steps to Coverage", content: "The LIB onboarding process from audit to binder. Practical guide." }
                    ];
                case 'YouTube Shorts':
                    return [
                        { title: "The $1M Lie", content: "Why $1M in life insurance isn't enough for a family of four in 2026." },
                        { title: "Age vs. Premium", content: "The shocking difference between buying at 25 vs. 35. Don't wait." },
                        { title: "The Beneficiary Trap", content: "The one mistake that sends your life insurance to probate. Fix it now." },
                        { title: "Term Conversion Hack", content: "How to turn your cheap term policy into a wealth-building asset later." },
                        { title: "The 'Free' Work Policy", content: "Why relying on your employer's life insurance is a dangerous gamble." },
                        { title: "Instant Approval Secrets", content: "How to get covered in minutes without a medical exam. The LIB way." },
                        { title: "Legacy in a Box", content: "The 3 documents every provider needs to have in their safe today." }
                    ];
                case 'Meme':
                    return [
                        { title: "The Uninsured Panic", content: "B&W photo of someone looking stressed at a hospital bill. Caption: When you 'saved money' by skipping life insurance." },
                        { title: "The Legacy Flex", content: "Someone sitting calmly with their family. Caption: Knowing the empire is protected for 3 generations." },
                        { title: "The Audit Discovery", content: "Focus on a highlighter on a policy. Caption: Finding the $2M gap in your 'full coverage' policy." },
                        { title: "The Provider's Sleep", content: "A peaceful night city shot. Caption: The sleep you get when your family's future is signed and sealed." },
                        { title: "The 'Later' Excuse", content: "A photo of a dusty clock. Caption: 'I'll get life insurance when I'm older' - The most expensive sentence ever." },
                        { title: "The LIB Difference", content: "Caption: Explaining to the kids why they're already millionaires in the eyes of the Boss." },
                        { title: "The Signature Moment", content: "Caption: The exact moment you become a Life Insurance Boss." }
                    ];
                case 'Text':
                    return [
                        { title: "The Provider's Manifesto", content: "A deep dive into the moral obligation of life insurance for the modern provider." },
                        { title: "Legacy vs. Inheritance", content: "Why we build legacies that teach, not just inheritances that spoil. The LIB philosophy." },
                        { title: "The Math of Love", content: "Breaking down why a policy is the most logical expression of emotional commitment." },
                        { title: "2026 Legacy Outlook", content: "Why the next decade requires a more aggressive approach to family protection." },
                        { title: "The Wealth Gap Fix", content: "How life insurance is the ultimate tool for closing the generational wealth gap." },
                        { title: "The CEO of the Home", content: "Treating your family's security like a Fortune 500 company. Strategic and relentless." },
                        { title: "The Boss's Promise", content: "Our commitment to ensuring no family is left behind in the new economy." }
                    ];
                case 'Story':
                    return [
                        { title: "The Audit Walk", content: "Quick clips of reviewing a family's current coverage. Finding the gaps. Moody B&W." },
                        { title: "Legacy Session", content: "Behind the scenes of a legacy planning meeting. No faces, just the strategy. Cinematic." },
                        { title: "The Binder Win", content: "Showing a 'Policy Issued' notification. Another family secured. Grounded power." },
                        { title: "Provider Tips", content: "Quick talking head on the importance of beneficiary updates. Direct and authoritative." },
                        { title: "The LIB Lifestyle", content: "Glimpses of a secure, well-planned life. Peace of mind in every frame. B&W." },
                        { title: "Join the Mission", content: "Call to action for those ready to become a Life Insurance Boss. Direct." },
                        { title: "The Morning Review", content: "Espresso and a stack of policy reviews. The grind of protection. Cinematic." }
                    ];
                case 'Video':
                    return [
                        { title: "The Legacy Story", content: "A 3-minute mini-doc on a family that used LIB to build a 3-generation empire." },
                        { title: "Life Insurance Decoded", content: "A strategic tutorial on the different types of coverage and how to choose." },
                        { title: "The Audit Masterclass", content: "A walkthrough of our Whistleblower Audit process for life insurance." },
                        { title: "Wealth Building 101", content: "How to use permanent life insurance as a bank for your business. The LIB way." },
                        { title: "The Provider's Journey", content: "The story of why we focus on life insurance as the foundation of every empire." },
                        { title: "Claims Reality", content: "A sobering look at what happens to families without proper protection. Authoritative." },
                        { title: "Boss Origins: LIB", content: "The moment we realized the industry was failing families and decided to fix it." }
                    ];
                case 'Slide':
                    return [
                        { title: "5 Legacy Traps", content: "Text-based slide on common estate planning mistakes in 2026." },
                        { title: "The Wealth Ladder", content: "Visualizing the steps from debt to generational wealth via LIB. B&W." },
                        { title: "Estate Tax 2026", content: "Key data points for high-net-worth families on protecting their assets." },
                        { title: "The Audit Checklist", content: "7 things to check in your life insurance policy today. Practical." },
                        { title: "Term Conversion Math", content: "When and why to convert your term policy to permanent. The numbers." },
                        { title: "Beneficiary Strategy", content: "How to structure your payouts to avoid probate and taxes. Strategic." },
                        { title: "The LIB Commitment", content: "Our values and the promise we make to every family we shield." }
                    ];
                case 'Holiday':
                    return [
                        { title: "Father's Day Legacy", content: "The ultimate gift for your children is a future that's already paid for. B&W." },
                        { title: "Mother's Day Shield", content: "Protecting the heart of the home with relentless strategic planning. Cinematic." },
                        { title: "New Year's Audit", content: "Starting the year with a total family security review. The Boss way." },
                        { title: "Thanksgiving Legacy", content: "Grateful for the peace of mind that comes with a complete shield. B&W." },
                        { title: "Christmas Protection", content: "The best thing under the tree is a signed policy they'll never have to worry about." },
                        { title: "Independence Day", content: "True independence is knowing your family is free from financial risk. B&W." },
                        { title: "The Year-End Review", content: "Closing the year by ensuring the legacy is stronger than ever. Cinematic." }
                    ];
                default:
                    return [
                        { title: "The Life Shield", content: "Slide 1: Why life insurance is the ultimate act of love. Slide 2: Term vs Whole Life. Slide 3: Protecting your family's future. Slide 4: The cost of waiting. Slide 5: Get covered today." },
                        { title: "Legacy Secrets", content: "What they don't tell you about building generational wealth through life insurance." },
                        { title: "Viral Life Hacks", content: "High-energy shots of families and future planning. Emotional and impactful." },
                        { title: "The Provider's Edge", content: "Protecting your most valuable asset: your life and your family's security." },
                        { title: "Street Smart Life", content: "Navigating the complexities of life insurance with confidence and clarity." },
                        { title: "The Shifting Gear", content: "Transitioning to better protection for your family's long-term goals." },
                        { title: "Night Drive Security", content: "The peace of mind that comes with knowing your family is safe, no matter what." }
                    ];
            }
        }
        if (acc === AccountType.PB) {
            switch (cat) {
                case 'Carousel':
                    return [
                        { title: "The Protection Blueprint", content: "Slide 1: Why standard insurance is a gamble. Slide 2: The PB Shield. Slide 3: Comprehensive risk management. Slide 4: Real-world protection. Slide 5: Get shielded today." },
                        { title: "Risk Mitigation 101", content: "Slide 1: Identifying your hidden exposures. Slide 2: The PB Audit. Slide 3: Strategic defense. Slide 4: Continuous monitoring. Slide 5: The Boss standard." },
                        { title: "The Guardian's Strategy", content: "Slide 1: Protecting your empire from the inside out. Slide 2: Employee risk. Slide 3: Cyber defense. Slide 4: Liability layers. Slide 5: Total protection." },
                        { title: "Asset Defense", content: "Slide 1: Your wealth is a target. Slide 2: How we shield it. Slide 3: Legal precedents. Slide 4: The PB method. Slide 5: Secure your assets." },
                        { title: "The Cost of Exposure", content: "Slide 1: One mistake can end it all. Slide 2: The math of loss. Slide 3: The PB safety net. Slide 4: Real recovery stories. Slide 5: Don't wait for the storm." },
                        { title: "Empire Security Audit", content: "Slide 1: 5 gaps you need to fill today. Slide 2: Contractual risk. Slide 3: Operational safety. Slide 4: Policy review. Slide 5: Schedule your audit." },
                        { title: "The PB Manifesto", content: "Slide 1: Why we exist. Slide 2: Relentless advocacy. Slide 3: The gold standard. Slide 4: Join the protected. Slide 5: The Protection Boss." }
                    ];
                case 'Reel':
                    return [
                        { title: "The Guardian's Promise", content: "Emotional look at family security and the legacy you leave. 'We don't just sell policies; we deploy shields.' Moody lighting." },
                        { title: "Legacy Architecture", content: "Building a future that lasts for generations to come. 'The act of protection is the highest form of leadership.' Cinematic B&W." },
                        { title: "The Silent Shield", content: "Protection that works while you sleep, guarding your home. 'Your legacy is uninsurable, but the events that threaten it are not.' Grounded power." },
                        { title: "Generational Wealth", content: "Insuring the next chapter of your family's story. 'We architect safety nets as strong as your dreams.' Emotional and secure." },
                        { title: "The Heart of the Home", content: "Focus on what truly matters: the people you love. 'A signature today is a fortress tomorrow.' Moody lighting." },
                        { title: "A Father's Legacy", content: "Securing the path for your children with deep protection. 'The Protection Boss: Relentless advocacy for the persistent.' Cinematic B&W." },
                        { title: "The Final Signature", content: "The peace of mind that comes with a complete protection plan. 'Signed, sealed, and secured.' Grounded power." }
                    ];
                case 'Infographic':
                    return [
                        { title: "The Protection Pyramid", content: "Visualizing the layers of defense from basic liability to elite asset shielding. B&W aesthetic." },
                        { title: "The Risk Exposure Map", content: "A chart showing common business gaps and how PB fills them. High contrast." },
                        { title: "Standard vs. PB Protection", content: "A side-by-side comparison of coverage quality and advocacy. Clear and strategic." },
                        { title: "The Shield Flowchart", content: "How our audit process leads to total security. PB style." },
                        { title: "The Math of Mitigation", content: "A simple formula for calculating the ROI of proactive risk management." },
                        { title: "The Asset Fortress", content: "How we layer policies to create an untouchable shield for your wealth." },
                        { title: "7 Steps to Security", content: "The PB onboarding process from audit to total protection. Practical guide." }
                    ];
                default:
                    return [
                        { title: "The Guardian's Promise", content: "Emotional look at family security and the legacy you leave." },
                        { title: "Legacy Architecture", content: "Building a future that lasts for generations to come." },
                        { title: "The Silent Shield", content: "Protection that works while you sleep, guarding your home." },
                        { title: "Generational Wealth", content: "Insuring the next chapter of your family's story." },
                        { title: "The Heart of the Home", content: "Focus on what truly matters: the people you love." },
                        { title: "A Father's Legacy", content: "Securing the path for your children with deep protection." },
                        { title: "The Final Signature", content: "The peace of mind that comes with a complete protection plan." }
                    ];
            }
        }
        return [
            { title: `${cat} Strategy 1`, content: `Drafting content for ${acc} ${cat}. Focus on brand identity.` },
            { title: `${cat} Strategy 2`, content: `Drafting content for ${acc} ${cat}. Focus on engagement.` },
            { title: `${cat} Strategy 3`, content: `Drafting content for ${acc} ${cat}. Focus on education.` },
            { title: `${cat} Strategy 4`, content: `Drafting content for ${acc} ${cat}. Focus on values.` },
            { title: `${cat} Strategy 5`, content: `Drafting content for ${acc} ${cat}. Focus on conversion.` },
            { title: `${cat} Strategy 6`, content: `Drafting content for ${acc} ${cat}. Focus on community.` },
            { title: `${cat} Strategy 7`, content: `Drafting content for ${acc} ${cat}. Focus on the 2026 outlook.` }
        ];
    };

    cats.forEach(cat => {
        batch = [...batch, ...generateCategoryBatch(account, cat, getAccountTitles(account, cat))];
    });
    return batch;
};

export const PLAYBOOK_DATA: PostTask[] = [
  ...IB_POSTS,
  ...QC_POSTS,
  ...generatePlaceholders(lib),
  ...generatePlaceholders(pb)
];

// Helper for generating Batch of Quotes
const generateQuoteBatch = (account: AccountType, category: QuoteCategory, texts: string[]): QuoteItem[] => {
  return texts.map(text => ({
    id: generateId(),
    text,
    category,
    account
  }));
};

export const QUOTES_DATA: QuoteItem[] = [
    // --- THE INSURANCE BOSS (IB) ---
    ...generateQuoteBatch(ib, 'Residual Income', [
      "Residuals are the scoreboard of trust. If yours aren't growing, you aren't protecting.",
      "The industry wants you to trade time for money. The Boss trades protection for freedom.",
      "A book of business is a living organism. Feed it with transparency, and it feeds your legacy.",
      "Stop selling policies and start building a fortress of recurring revenue.",
      "The most expensive commission is the one you lose because you stopped caring after the sale.",
      "Residual income is the reward for being the only one who didn't lie to the client.",
      "Your bank account should be a reflection of the disasters you've prevented.",
      "In 2026, the only safe income is the one built on unshakeable client advocacy.",
      "Don't just collect a check; collect a reputation that pays dividends forever.",
      "The whistleblower doesn't hunt for leads; they hunt for the truth that keeps clients for life.",
      "Leverage is having a book that works harder than you do.",
      "True wealth in insurance is measured by the renewals you didn't have to beg for.",
      "The 'set it and forget it' model is a death sentence for your residuals.",
      "Protect the client's bottom line, and they'll protect yours through every renewal."
    ]),
    ...generateQuoteBatch(ib, 'Commercial Risk', [
      "Your GL policy is a participation trophy. It doesn't mean you're actually safe.",
      "Risk isn't something you avoid; it's something you engineer out of your business.",
      "The biggest risk in your company is the agent who told you 'you're fully covered'.",
      "A certificate of insurance is just a piece of paper until the lawsuit hits the desk.",
      "If your risk transfer strategy fits on a napkin, your business is a target.",
      "We don't look for the obvious fires; we look for the slow-burn liability traps.",
      "Commercial insurance is a weapon. In the wrong hands, it backfires on the owner.",
      "The E-Mod is a report card for your leadership. What grade are you getting?",
      "Standard markets are for standard businesses. Empires need custom-built shields.",
      "Cyber liability is the silent assassin of the mid-market. Are your doors locked?",
      "Risk management is the only insurance that doesn't have a deductible.",
      "Don't let a $50k oversight erase a $50M legacy.",
      "The Boss Audit: Because 'hope' is not a viable risk management strategy.",
      "We find the gaps that the 'nice guy' agent was too afraid to mention."
    ]),
    ...generateQuoteBatch(ib, 'Lender FAQ', [
      "The bank doesn't care about your business; they care about their collateral. We protect both.",
      "A binder is a promise. A Boss binder is a guarantee that the deal closes on time.",
      "Lenders want 'Full Replacement Cost' because they know the math of 2026 inflation.",
      "Don't let a $1,500 insurance dispute stall a $15M construction loan.",
      "We speak the language of underwriters so you don't have to.",
      "Escrow is a tool, not a trap. Use it to smooth your empire's cash flow.",
      "The 'Additional Insured' clause is where most deals go to die. We keep them alive.",
      "Lender requirements aren't suggestions; they're the rules of the game. Play to win.",
      "Force-placed insurance is the bank's way of saying they don't trust your agent.",
      "We deliver the 'Evidence of Insurance' before the ink on the loan docs is dry.",
      "SBA 7(a) or 504? We know the specific insurance hurdles for every government loan.",
      "The Whistleblower Audit satisfies the most demanding compliance officers in the country.",
      "Your insurance should be the easiest part of your closing, not the bottleneck.",
      "When the lender sees 'The Insurance Boss', they know the risk is vetted."
    ]),
    ...generateQuoteBatch(ib, 'Business', [
      "Scaling a business without a shield is just inviting a bigger disaster.",
      "The CEO's job is vision. Our job is making sure the vision survives the reality of risk.",
      "Insurance is the only expense that can literally save your entire company in a day.",
      "A board of directors without a D&O policy is a group of people with targets on their backs.",
      "Your employees are your greatest asset—and your greatest liability. Insure accordingly.",
      "Business continuity isn't a plan; it's a funded reality.",
      "The elite don't buy insurance; they buy certainty in an uncertain economy.",
      "If you aren't auditing your agent every 24 months, you're leaving your vault unlocked.",
      "Transparency is the only currency that matters in the 2026 insurance market.",
      "We don't sell policies; we architect corporate safety nets for the persistent.",
      "Your reputation is uninsurable, but the events that destroy it are not.",
      "The Boss Mindset: Protect the downside so the upside can take care of itself.",
      "Efficiency is doing things right. Effectiveness is doing the right things—like insuring your legacy.",
      "The Insurance Boss: The silent partner in every protected empire."
    ]),
    ...generateQuoteBatch(ib, 'Insurance Agents', [
      "Stop being a 'quote monkey' and start being a Whistleblower for your clients.",
      "The industry is broken. We're the ones fixing it, one audit at a time.",
      "If you're still selling on price, you're already obsolete in 2026.",
      "The best agents don't have 'customers'; they have a protected inner circle.",
      "Transparency is the ultimate competitive advantage in a world of hidden commissions.",
      "Your value isn't in the policy; it's in the advocacy you provide when the world burns.",
      "The Whistleblower Protocol: A higher standard for the modern insurance professional.",
      "Don't just renew the book; revolutionize the way your clients see risk.",
      "The elite agents focus on the E-Mod, not just the premium.",
      "If you can't explain the 'why' behind the coverage, you shouldn't be holding the license.",
      "We don't compete with other agents; we compete with the status quo of mediocrity.",
      "The Insurance Boss Agent: Authoritative, transparent, and relentlessly protective.",
      "Your license is a responsibility to expose the traps the big agencies set.",
      "Join the movement of agents who actually put the client's empire first."
    ]),

    // --- QUICK COVERAGE (QC) ---
    ...generateQuoteBatch(qc, 'Savings', [
      "The 'Loyalty Tax' is real. If you haven't shopped in 3 years, you're overpaying by $600.",
      "Speed is the ultimate luxury. We get you a better rate in the time it takes to brew coffee.",
      "In 2026, bundling isn't just a discount; it's a survival strategy against inflation.",
      "Your phone is your agent. Our tech finds the savings; our humans provide the heart.",
      "Stop waiting for a callback from a 1-800 number. Get covered in 300 seconds.",
      "The best neighbor is the one who helps you keep more of your hard-earned money.",
      "Efficiency is how we keep our rates low and our clients happy. Simple as that.",
      "Don't just renew your policy; review your possibilities with Quick Coverage.",
      "The algorithm hunts for discounts; we deliver the peace of mind. The perfect pair.",
      "A fatter wallet starts with a faster quote. Let's get to work.",
      "Auto + Home + Life = The Triple Threat to high premiums. Bundle and win.",
      "Insurance shouldn't be a chore. We make saving money feel like a victory.",
      "We don't just beat rates; we beat the red tape that slows your life down.",
      "Quick Coverage: Because your time is worth more than a hold music loop."
    ]),
    ...generateQuoteBatch(qc, 'Family', [
      "Protecting your nest shouldn't cost your future. We find the balance.",
      "A house is made of bricks; a home is made of memories. We insure both.",
      "From the first car to the forever home, QC grows with your family's story.",
      "Family peace of mind is the highest ROI you'll ever see on a monthly bill.",
      "Building a legacy takes a lifetime. Protecting it takes a five-minute conversation.",
      "We treat your family like our own because we're neighbors first, agents second.",
      "Security for them, savings for you. That's the Quick Coverage promise.",
      "We don't just insure property; we insure the people who make it a home.",
      "Smart insurance is the best inheritance you can provide for your children.",
      "Every milestone deserves a safety net that actually catches you. No gaps.",
      "Sleep better knowing the people you love are shielded by the best in the business.",
      "Bundle their future into certainty with a family-first protection plan.",
      "The 'Guardian Mindset' starts with the very first policy you sign with us.",
      "Family first. Savings second. With QC, you never have to choose between them."
    ]),
    ...generateQuoteBatch(qc, 'Real Estate', [
      "Closing on a dream home? Don't let a slow binder turn it into a nightmare.",
      "Home equity is your wealth. Our insurance is the fence that keeps it safe.",
      "First-time buyer? We speak human, not insurance-jargon. Let's get you home.",
      "Renters insurance: The $15/mo shield that protects everything you've built.",
      "Investment properties need specialized eyes. We see the risks you might miss.",
      "A new roof is a lower rate. We make sure the math works in your favor.",
      "Condo life requires more than a master policy. We fill the gaps for you.",
      "Airbnb or Short-Term Rental? Standard policies are a trap. We have the fix.",
      "We handle the binder speed-run so you can focus on the moving truck.",
      "A house is just a building until it's protected by a Quick Coverage policy.",
      "Don't let your closing date slip because of a missing 'Evidence of Insurance'.",
      "Refinancing is the perfect time to audit your rate. Most families save $400.",
      "From the foundation to the shingles, we've got every square inch covered.",
      "QC: The Real Estate Agent's favorite partner for a reason. We're fast."
    ]),
    ...generateQuoteBatch(qc, 'Savings', [
      "One bill, one agent, one massive discount. That's the power of the bundle.",
      "Bundling isn't just a feature; it's a high-impact financial strategy for 2026.",
      "The sum of the parts is always cheaper when you bring them under one roof.",
      "Auto + Home = The $800 high-five. Who couldn't use an extra $800?",
      "Simplify your life and fortify your coverage with a QC Multi-Policy plan.",
      "Unbundled insurance is unoptimized money. Let's fix your budget today.",
      "The multi-policy discount is the ultimate hack for the modern homeowner.",
      "Protect the driveway and the doorstep together for the maximum savings.",
      "Cohesion in your coverage leads to clarity when it's time to make a claim.",
      "Don't divide your loyalty between three companies; multiply your savings with one.",
      "One login, total protection, and significantly less money out of your pocket.",
      "QC Bundles: The gold standard for families who value both time and money.",
      "Stop the piecemeal protection. It's time to bundle up and save big.",
      "Efficiency meets economy in every Quick Coverage bundle we architect."
    ]),
    ...generateQuoteBatch(qc, 'Claims/Fraud', [
      "The best policy is the one that actually pays when the world turns upside down.",
      "Claims are stressful; we are your flashlight in the dark. We'll guide you.",
      "Don't just file a claim; follow through with a neighbor who has your back.",
      "A claim is the 'moment of truth' for an insurance company. We pass the test.",
      "Document first, despair never. We're here to handle the heavy lifting for you.",
      "From a minor fender bender to a major flood, we're with you every step.",
      "The adjuster works for the carrier; we work for you. That's the QC difference.",
      "Get back to normal faster with our streamlined claims preparation process.",
      "Your agent should be your first call, not a 1-800 number in another state.",
      "Claim denied? Let's check the fine print together. We hunt for the 'Yes'.",
      "Recovery is a team sport. Consider Quick Coverage your most valuable player.",
      "Integrity in the claims process is the foundation of the QC neighborhood.",
      "Don't let a loss become a tragedy. File smart, file fast, and file with us.",
      "QC: Turning claims into solutions so you can get back to what matters."
    ]),
    ...generateQuoteBatch(qc, 'Meme', [
      "When you see your unbundled insurance bill: 👁️👄👁️",
      "Me doing the math on how much I saved by switching to QC: 📈📉",
      "When the 1-800 agent puts you on hold for the 5th time... 💀",
      "My roof turning 15 years old: 'My time has come.' 🏚️",
      "That 'I just saved $700' walk to the mailbox. 🚶‍♂️💨",
      "When your neighbor gets a trampoline and you immediately check your umbrella policy. ☂️",
      "Me sneaking another Amazon package past my spouse... completely uninsured. 📦",
      "Trying to explain a deductible to my teenager like 🗣️🧱",
      "When you realize renters insurance is cheaper than your daily latte habit. ☕",
      "My wallet when I tell it we're switching to Quick Coverage: 🙌💸",
      "The 'Check Engine' light: the ultimate test of my emotional stability. 🚙🚨",
      "Me looking at my old policy's 'loyalty penalty': We are never ever getting back together. 🙅‍♂️",
      "When the claims process is actually easy and you don't know what to complain about anymore. 🤔",
      "Installing a $25 leak detector to save $25,000. #Stonks 📈",
      "My dog judging my parallel parking skills from the passenger seat. 🐕🚗",
      "When you get that 'Proof of Insurance' PDF 2 minutes before the dealership closes. 🦸‍♂️",
      "Adulting is being genuinely excited about a new fire extinguisher discount. 🧯",
      "Me explaining to my wife why the new smart thermostat is a 'high-yield investment'. 🧠",
      "That feeling when you actually understand your declaration page. 🤯",
      "When you find out the 'Good Student Discount' pays for their entire gas budget. ⛽",
      "Me waiting for the 1-800 agent to 'check with their supervisor' for the 3rd time. 🤡",
      "The face you make when the bundle discount hits your bank account. 🤑"
    ]),

    // --- THE LIFE INSURANCE BOSS (LIB) ---
    ...generateQuoteBatch(lib, 'Life', [
      "Life insurance is the only contract that guarantees your love lives forever.",
      "The best time to buy life insurance was yesterday. The second best time is today.",
      "You don't buy life insurance because you're going to die; you buy it because they're going to live.",
      "A policy is a promise that your family's story doesn't end when yours does.",
      "Term life is the foundation; whole life is the fortress. Build both.",
      "Don't leave their future to chance. Leave it to a Life Insurance Boss policy.",
      "The cost of life insurance is a fraction of the cost of not having it.",
      "Your income is their lifestyle. Insure it like the asset it is.",
      "Life insurance: The ultimate gift of certainty in an uncertain world.",
      "Protect the people who make life worth living. Start your legacy today."
    ]),
    ...generateQuoteBatch(lib, 'Life Insurance Agents', [
      "Stop selling death benefits and start selling family continuity.",
      "The best life agents are architects of generational wealth.",
      "If you aren't talking about life insurance, you aren't truly protecting the client.",
      "Life insurance is the most emotional product in the world. Treat it with respect.",
      "Your value as an agent is measured by the claims you pay, not the premiums you collect.",
      "The Life Insurance Boss Agent: Compassionate, strategic, and relentlessly protective.",
      "Master the math of the 'Human Life Value' and you'll never struggle to sell again.",
      "We don't just close deals; we open doors to a secure future for families.",
      "Transparency in life insurance is the only way to build a legacy as an agent.",
      "Join the movement of agents who put the family's mission above the commission."
    ]),

    // --- THE PROTECTION BOSS (PB) ---
    ...generateQuoteBatch(pb, 'Family', [
      "Legacy isn't what you leave for them; it's what you build around them.",
      "The ultimate act of love is a signature that protects them when you aren't there.",
      "We don't just insure lives; we architect the future of your lineage.",
      "Your children's children deserve a world where their inheritance is unshakeable.",
      "A father's legacy is only as strong as the shield he places over his home.",
      "Protecting the nest is a full-time commitment to the people who matter most.",
      "The Guardian mindset: Seeing the storm before it reaches your doorstep.",
      "Family security is the only investment with a guaranteed 100% emotional ROI.",
      "We shield the hearts of 2026 by securing the assets of today.",
      "Don't let a single unforeseen event rewrite your family's history.",
      "The Protection Boss: Because 'good enough' is never enough for your family.",
      "A legacy of love is written in the ink of a comprehensive protection plan.",
      "Your name is an asset. We make sure it stays protected for generations.",
      "Signature of strength. Legacy of love. The PB way."
    ]),
    ...generateQuoteBatch(pb, 'Wealth', [
      "True wealth is the ability to say 'no' to risk and 'yes' to continuity.",
      "Your portfolio needs a bodyguard that never sleeps. That's our mission.",
      "High net worth requires high-level shielding. Standard policies need not apply.",
      "Assets grow through effort but survive through strategic insulation.",
      "Financial freedom is a myth without a fortress of risk management.",
      "We protect the engine of your success so you can focus on the next horizon.",
      "Estate taxes and lawsuits shouldn't be the ones to inherit your hard work.",
      "Cash value is the silent partner in your journey toward generational wealth.",
      "The wealthy don't just accumulate; they fortify their positions relentlessly.",
      "Capital preservation is the ultimate victory in an uncertain 2026 economy.",
      "Your wealth architecture should be as sophisticated as your investment strategy.",
      "Leave a fortune that lasts, not a tax bill that destroys.",
      "The Protection Boss: Defensive excellence for the world's most aggressive builders.",
      "Shielding your success is our only business."
    ]),
    ...generateQuoteBatch(pb, 'Protection', [
      "The Shield of 2026: Modern protection for a modern world of risk.",
      "Protection is a verb. It's the active defense of everything you've built.",
      "A signature today is a fortress tomorrow. Don't wait for the storm.",
      "We don't just sell policies; we deploy shields over empires.",
      "The act of protection is the highest form of leadership for any provider.",
      "Your assets are a target. Our job is to make them untouchable.",
      "Comprehensive protection means leaving no stone unturned and no gap unfilled.",
      "The Protection Boss: Relentless advocacy for the persistent and the protected.",
      "In a world of uncertainty, our shield is the only constant you can count on.",
      "We architect safety nets that are as strong as the dreams they protect.",
      "The 2026 Risk Outlook: Why standard protection is the fastest way to lose it all.",
      "Signed, sealed, and secured. That's the peace of mind we deliver daily.",
      "Your legacy is uninsurable, but the events that threaten it are not.",
      "PB Protection: The gold standard for the elite guardian."
    ])
];
