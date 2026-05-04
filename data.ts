import { PostTask, AccountType, WeekTheme, QuoteItem, QuoteCategory } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

const getFutureDate = (dayOffset: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + (dayOffset - 1));
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const ib = AccountType.IB;
const qc = AccountType.QC;
const lib = AccountType.LIB;

const IB_POSTS: PostTask[] = [
  // 20 Carousels
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 1,
    date: getFutureDate(i + 1),
    week: Math.floor(i / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor(i / 7)] || WeekTheme.WEEK4,
    account: ib,
    category: 'Carousel' as const,
    title: ["The Whistleblower Manifesto", "Transparency Protocol", "The $50M Shield", "Workers Comp Secrets", "The Broker Trap", "Nuclear Verdicts", "Contractual Warfare", "The CEO's Playbook", "Residual Wealth", "The Industry Manifesto", "Liability Gaps", "The Premium Myth", "Asset Protection", "The Audit Trail", "Policy Loopholes", "The Risk Architect", "Wealth Preservation", "The Industry Lie", "Strategic Coverage", "The Boss Standard"][i] || `Strategy ${i + 1}`,
    content: "Carousel Strategy",
    copy: `Don't let your agent's comfort be your company's downfall. We expose what they hide. #InsuranceBoss #RiskManagement #BusinessProtection`,
    hashtags: "#InsuranceBoss #RiskManagement #BusinessProtection #Whistleblower #CorporateSecurity",
    description: "A high-authority carousel designed to position IB as the ultimate risk architect."
  })),
  // 20 Reels
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 21,
    date: getFutureDate(i + 21),
    week: Math.floor((i + 20) / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor((i + 20) / 7)] || WeekTheme.WEEK4,
    account: ib,
    category: 'Reel' as const,
    title: ["The Industry Secret", "The Lawsuit Trap", "The Bankrupt Reality", "The One Mistake", "Why Your Agent is Quiet", "The Hidden Fee", "The Policy Truth", "Risk Exposure", "The Audit Hack", "Wealth Strategy", "The Broker Lie", "Liability Shield", "The CEO Secret", "Contractual Risk", "The Boss Move", "Industry Exposure", "The Silent Threat", "Asset Defense", "The Whistleblower", "The Final Audit"][i] || `Reel Topic ${i + 1}`,
    content: "High-impact Reel strategy.",
    backgroundImagePrompt: [
      "Cinematic, dark boardroom with a single lit chair, moody shadows, 8k.",
      "Dramatic shot of a legal gavel hitting a marble table, blurred background, corporate setting, 8k.",
      "Abstract visualization of falling dominoes made of high-end glass, representing financial collapse, 8k.",
      "Close-up of an eye reflecting a digital policy document, intense lighting, 8k.",
      "A quiet, luxury office hallway with deep shadows, cinematic B&W, 8k.",
      "Close-up of a magnifying glass over a contract with fine print highlighted, 8k.",
      "A stack of leather-bound policy books on a mahogany desk, moody lighting, 8k.",
      "Visualization of a heat map over a corporate building, representing risk exposure, 8k.",
      "A hand typing precisely on a high-end mechanical keyboard in a dark room, 8k.",
      "Golden bars stacked in a pyramid shape, reflecting a modern city skyline at sunset, 8k.",
      "A blurry silhouette of two corporate figures shaking hands in a dark alley, cinematic, 8k.",
      "A heavy steel vault door partially open, revealing a glow from inside, 8k.",
      "A high-end CEO looking out of a floor-to-ceiling window at night, 8k.",
      "Two fountain pens crossed over a contract, dramatic lighting, 8k.",
      "A luxury sports car parked in front of a modern glass skyscraper, cinematic lighting, 8k.",
      "Close-up of a digital screen showing flashing red alert signals in a dark server room, 8k.",
      "A single candle burning in a massive, dark corporate lobby, symbolic of a silent threat, 8k.",
      "A shield emblem etched into a granite wall, strong shadows, 8k.",
      "A microphone on a stand in a dark room, spotlight focusing on it, whistleblower aesthetic, 8k.",
      "A finished puzzle piece being placed into a complex board, representing the final audit, 8k."
    ][i] || `Cinematic, dark, high-end corporate office, moody lighting, 8k resolution.`,
    copy: `The truth about your policy is on page 42. We've already read it. #InsuranceBoss #BusinessOwner #Liability`,
    hashtags: "#InsuranceBoss #BusinessOwner #Liability #InsuranceAudit #Whistleblower",
    description: "Fast-paced, high-impact reel with a whistleblower vibe."
  })),
  // 20 Videos
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 41,
    date: getFutureDate(i + 41),
    week: Math.floor((i + 40) / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor((i + 40) / 7)] || WeekTheme.WEEK4,
    account: ib,
    category: 'Video' as const,
    title: ["The $50M Reality", "Workers Comp Heist", "The AI Liability", "Contract War", "Renewal Revolution", "The Risk Blueprint", "Wealth Engineering", "The Audit Masterclass", "Liability Defense", "The CEO Protocol", "Strategic Protection", "The Industry Shift", "Asset Security", "The Risk Factor", "The Boss Perspective", "Corporate Defense", "The Audit Standard", "Wealth Architecture", "The Policy War", "The Final Word"][i] || `Video Deep Dive ${i + 1}`,
    content: "Professional video deep dive.",
    backgroundImagePrompt: `Cinematic, dark, high-end corporate office overlooking a city at night, moody lighting, 8k resolution, professional aesthetic.`,
    copy: `In the world of mid-market business, 'fully covered' is a dangerous lie. Here is how we architect real certainty.`,
    hashtags: "#InsuranceBoss #CorporateStrategy #RiskAudit #BusinessGrowth #EliteProtection",
    description: "A professional video with an animated background for high engagement."
  }))
];

const QC_POSTS: PostTask[] = [
  // 20 Carousels
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 1,
    date: getFutureDate(i + 1),
    week: Math.floor(i / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor(i / 7)] || WeekTheme.WEEK4,
    account: qc,
    category: 'Carousel' as const,
    title: ["The 2026 Home Guide", "Inflation-Proofing", "First-Time Shield", "Auto Myth Busters", "The Multi-Gen Bundle", "Smart Tech Savings", "Neighborhood Promise", "The $1200 Hack", "Safe Driver Bonus", "Spring Home Prep", "The Bundle Hack", "Local Savings", "Family Shield", "The Tech Advantage", "Community Trust", "The Savings Protocol", "Home Security", "The Neighborhood Way", "Smart Coverage", "The QC Standard"][i] || `Neighbor Guide ${i + 1}`,
    content: "Community Carousel Strategy",
    copy: `Insurance shouldn't be a headache. We're your neighbors, here to help you save. #QuickCoverage #HomeInsurance #SaveMoney`,
    hashtags: "#QuickCoverage #HomeInsurance #SaveMoney #Neighborhood #FamilyProtection",
    description: "Friendly, bright, and helpful carousel for the local community."
  })),
  // 20 Reels
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 21,
    date: getFutureDate(i + 21),
    week: Math.floor((i + 20) / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor((i + 20) / 7)] || WeekTheme.WEEK4,
    account: qc,
    category: 'Reel' as const,
    title: ["The $1,200 Surprise", "The Fence Chat", "Safe Driver POV", "The First Home Hug", "Smart Home Hack", "The Local Hero", "Savings in 60s", "The Neighborhood View", "Community Care", "The QC Way", "Home Hacks", "Auto Tips", "The Bundle Win", "Safe Streets", "The Neighborly Move", "Quick Tips", "Family Moments", "The Porch Talk", "Street Smart", "The Final Save"][i] || `Community Reel ${i + 1}`,
    content: "Warm, authentic community Reel.",
    backgroundImagePrompt: [
      "Warm, sun-drenched envelope with a $1,200 check partially visible, on a kitchen table, 8k.",
      "Two neighbors talking over a white picket fence, sun setting in the background, warm light, 8k.",
      "POV shot from a driver's seat of a safe car on a quiet neighborhood street, sunny morning, 8k.",
      "A young couple hugging in front of their new home, bright morning sun, joyful, 8k.",
      "Close-up of a smart home doorbell being used, modern friendly house background, 8k.",
      "A local agent helping an elderly neighbor with groceries, warm community setting, 8k.",
      "A digital timer showing 60 seconds over a piggy bank, bright sunny background, 8k.",
      "Aerial view of a beautiful, green suburban neighborhood with kids playing, 8k.",
      "A bowl of fresh apples on a community table, people talking in a sunny park background, 8k.",
      "The Quick Coverage logo on a friendly neighborhood office window, bright morning, 8k.",
      "Close-up of a toolbox next to a home improvement project, sunny backyard, 8k.",
      "A set of car keys on a wooden table next to a sunny window, friendly and cozy, 8k.",
      "A gift box with a ribbon, appearing as a 'bundle', on a doorstep in the sun, 8k.",
      "A quiet, safe street with a 'Slow: Children at Play' sign, bright afternoon light, 8k.",
      "A neighbor bringing over a pie, warm golden hour lighting, authentic, 8k.",
      "A hand-written checklist with 'Savings' checked off, sunny coffee shop setting, 8k.",
      "A happy family having a picnic in their own backyard, bright and cheerful, 8k.",
      "Two chairs on a front porch with a glass of lemonade, warm afternoon sun, 8k.",
      "A smart car driving slowly through a modern neighborhood at dusk, warm lights, 8k.",
      "A piggy bank being filled with coins, bright and happy lighting, 8k."
    ][i] || `Warm, sun-drenched suburban neighborhood, friendly house, bright morning light, 8k resolution.`,
    copy: `We're not just your agents; we're your neighbors. Let's talk coverage. #QuickCoverage #Neighborly #InsuranceSavings`,
    hashtags: "#QuickCoverage #Neighborly #InsuranceSavings #Community #SafeDriving",
    description: "Warm, authentic reel with a community focus."
  })),
  // 20 Videos
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 41,
    date: getFutureDate(i + 41),
    week: Math.floor((i + 40) / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor((i + 40) / 7)] || WeekTheme.WEEK4,
    account: qc,
    category: 'Video' as const,
    title: ["The $600 Story", "Home Decoded", "Bundle Masterclass", "Safe Home Rates", "Realtor Partnership", "The Community Story", "Savings Walkthrough", "The Neighborhood Guide", "Family Protection", "The QC Promise", "Homeowner Tips", "Auto Safety", "The Bundle Advantage", "Local Impact", "The Neighborly Standard", "Quick Coverage Deep Dive", "Family Security", "The Porch Perspective", "Street Safety", "The Final Word"][i] || `Community Deep Dive ${i + 1}`,
    content: "Friendly neighborhood video walkthrough.",
    backgroundImagePrompt: `Warm, sun-drenched suburban neighborhood, friendly house with a green lawn, bright morning light, cozy and inviting, 8k resolution.`,
    copy: `Real stories from real neighbors. See how Quick Coverage is changing the way we protect our homes.`,
    hashtags: "#QuickCoverage #Homeowner #FamilyFirst #LocalBusiness #InsuranceTips",
    description: "Bright and reassuring video with an animated neighborhood background."
  }))
];

const LIB_POSTS: PostTask[] = [
  // 20 Carousels
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 1,
    date: getFutureDate(i + 1),
    week: Math.floor(i / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor(i / 7)] || WeekTheme.WEEK4,
    account: lib,
    category: 'Carousel' as const,
    title: ["The Life Shield", "Legacy Secrets", "The Provider's Edge", "Term vs Whole", "The Cost of Waiting", "Family Security Audit", "The Legacy Blueprint", "Wealth Gap Fix", "The CEO of Home", "The Boss's Promise", "Generational Wealth", "The Love Letter", "Asset Fortress", "The Future Proof", "Legacy Building", "The LIB Standard", "Wealth Architecture", "Family First", "The Boss Strategy", "The Final Promise"][i] || `Legacy Strategy ${i + 1}`,
    content: "Legacy Carousel Strategy",
    copy: `Life insurance is the ultimate act of love. We help you build a fortress for your family's future. #LifeInsuranceBoss #Legacy #FamilyProtection`,
    hashtags: "#LifeInsuranceBoss #Legacy #FamilyProtection #WealthBuilding #FutureProof",
    description: "Elegant, emotional, and strategic carousel focused on legacy."
  })),
  // 20 Reels
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 21,
    date: getFutureDate(i + 21),
    week: Math.floor((i + 20) / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor((i + 20) / 7)] || WeekTheme.WEEK4,
    account: lib,
    category: 'Reel' as const,
    title: ["Viral Life Hacks", "The Provider's POV", "Legacy in 60s", "The Audit Reaction", "Life Insurance Truths", "The Wealth Hack", "Family First POV", "Legacy Moments", "The Boss View", "Future Security", "The Love Policy", "Wealth Strategy", "The Provider's Move", "Legacy Tips", "The LIB Way", "Quick Legacy", "Family Wealth", "The Boss POV", "Future Proof", "The Final Word"][i] || `Legacy Reel ${i + 1}`,
    content: "Cinematic, emotional legacy Reel.",
    backgroundImagePrompt: [
      "Elegant, high-end library with an iPad showing a viral financial video, cinematic lighting, 8k.",
      "POV of a father watching his children play through a large study window, warm nostalgic light, 8k.",
      "A vintage hourglass on a stack of leather books, warm fireplace glow, 8k.",
      "A shocked expression of a person looking at a document in a high-end office, dramatic side-lighting, 8k.",
      "Close-up of a hand-written letter titled 'TO MY FAMILY', on a wooden desk with a candle, 8k.",
      "A golden key sitting on an architectural blueprint, elegant and sharp, 8k.",
      "POV of a parent's hand holding a child's hand in a sunlit field, soft and cinematic, 8k.",
      "A sepia-toned photograph of a classic family car, sitting on a modern walnut shelf, 8k.",
      "A silhouette of the Life Insurance Boss looking out at a sunrise from a sky-high balcony, 8k.",
      "A strong, modern safe box elegantly integrated into a wooden library wall, 8k.",
      "A heart shape formed by a wedding ring and its reflection on a polished table, 8k.",
      "A complex chess game mid-play, focusing on a protective move, moody lighting, 8k.",
      "A high-end provider walking into a modern glass office, confidence and power, 8k.",
      "A close-up of a digital tablet showing 'Legacy Checklist' with items checked off, 8k.",
      "The LIB logo elegantly embossed on a leather-bound journal, warm lighting, 8k.",
      "A fast-paced blur of light through a timeless library corridor, representing time, 8k.",
      "A large family tree illustrated on a classic canvas in a grand hallway, 8k.",
      "The Boss's perspective looking over a family trust document, cinematic and serious, 8k.",
      "A shield made of light protecting a silhouette of a family, abstract and cinematic, 8k.",
      "The final page of a book being closed, a sense of completion and peace, 8k."
    ][i] || `Elegant, timeless library, warm fireplace glow, soft cinematic lighting, 8k resolution.`,
    copy: `Wealth isn't what you leave; it's who you leave it to. Become a Life Insurance Boss today. #LifeInsuranceBoss #Legacy #Wealth`,
    hashtags: "#LifeInsuranceBoss #Legacy #Wealth #FamilyLegacy #Protection",
    description: "Cinematic, emotional reel with a focus on family and future."
  })),
  // 20 Videos
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: generateId(),
    day: i + 41,
    date: getFutureDate(i + 41),
    week: Math.floor((i + 40) / 7) + 1,
    weekTheme: [WeekTheme.WEEK1, WeekTheme.WEEK2, WeekTheme.WEEK3, WeekTheme.WEEK4][Math.floor((i + 40) / 7)] || WeekTheme.WEEK4,
    account: lib,
    category: 'Video' as const,
    title: ["The Legacy Story", "Life Decoded", "Audit Masterclass", "Wealth Building", "The Provider's Journey", "The Empire Story", "Legacy Walkthrough", "The Future Guide", "Family Security", "The LIB Promise", "Wealth Architecture", "The Boss Journey", "Legacy Deep Dive", "Future Planning", "The Provider's Standard", "Empire Building", "Legacy Strategy", "The Boss Perspective", "Wealth Protocol", "The Final Word"][i] || `Legacy Deep Dive ${i + 1}`,
    content: "Cinematic legacy exploration video.",
    backgroundImagePrompt: `Elegant, timeless library with leather-bound books, warm fireplace glow, soft cinematic lighting, 8k resolution, sophisticated atmosphere.`,
    copy: `Your family's story deserves a foundation that never crumbles. Here is how we build legacies that last for generations.`,
    hashtags: "#LifeInsuranceBoss #LegacyPlanning #FamilyWealth #Protection #BossMindset",
    description: "Cinematic and sophisticated video with an animated library background."
  }))
];

const IB_SPECIAL_REELS: PostTask[] = [
  ...Array.from({ length: 15 }).map((_, i) => {
    const subCats = ["Whole Life", "Universal Life", "Term Life", "Mortgage Protection", "Disability"];
    const subCat = subCats[i % subCats.length];
    const topicIndex = Math.floor(i / subCats.length); // 0, 1, or 2
    
    const topics: Record<string, string[]> = {
      "Whole Life": ["The Private Bank Blueprint", "Legacy That Never Expires", "The Fixed Premium Guarantee"],
      "Universal Life": ["The Swiss Army Knife of Wealth", "Indexed Growth: The IUL Blueprint", "Flexible Protection for Visionaries"],
      "Term Life": ["The High-Leverage Shield", "Income Replacement Blueprint", "The Conversion Strategy"],
      "Mortgage Protection": ["Sanctuary Security Blueprint", "Beyond the Death Benefit", "Home Equity Protection"],
      "Disability": ["The Income Engine Blueprint", "Own-Occupation Protection", "The 1-in-4 Reality"]
    };

    const topic = topics[subCat][topicIndex];

    const imagePrompts: Record<string, string[]> = {
      "Whole Life": [
        "Cinematic B&W, high-end private vault with stacks of gold bars, moody lighting, shallow depth of field, 8k resolution.",
        "Cinematic B&W, elegant family portrait in a timeless mansion, soft lighting, emotional and strong, 8k resolution.",
        "Cinematic B&W, close-up of a high-end fountain pen signing a document on a marble desk, dramatic lighting, 8k resolution."
      ],
      "Universal Life": [
        "Cinematic B&W, high-tech command center with holographic financial data, futuristic and elite, 8k resolution.",
        "Cinematic B&W, abstract visualization of a safety floor and rising stock charts, clean and powerful, 8k resolution.",
        "Cinematic B&W, a visionary leader looking through a massive glass window at a modern city skyline, dramatic and flexible, 8k resolution."
      ],
      "Term Life": [
        "Cinematic B&W, a powerful shield reflecting a stormy sky, protective and high-leverage, 8k resolution.",
        "Cinematic B&W, a young family playing in a park, blurred background focusing on their happiness and security, 8k resolution.",
        "Cinematic B&W, a set of keys and a deed on a modern desk, focusing on the moment of transition and growth, 8k resolution."
      ],
      "Mortgage Protection": [
        "Cinematic B&W, close-up of a modern home facade with a strong shadow, focusing on the foundation and safety, 8k resolution.",
        "Cinematic B&W, a hand placing a protective glass dome over a small model of a house, detailed and symbolic, 8k resolution.",
        "Cinematic B&W, a family silhouette silhouetted in a brightly lit doorway of a home at night, warm but high-contrast, 8k resolution."
      ],
      "Disability": [
        "Cinematic B&W, close-up of high-end machinery gears slowing down but not stopping, mechanical and precise, 8k resolution.",
        "Cinematic B&W, a surgical laser beam hitting a Target, representing precision and professional care, 8k resolution.",
        "Cinematic B&W, a businessman standing firm while a chess board in front of him shows a complex winning move, strategic and resilient, 8k resolution."
      ]
    };

    const scripts: Record<string, string[]> = {
      "Whole Life": [
        "Do you know what happened if you die without life insurance? Your family's financial security is left to chance. But with the Private Bank Blueprint, we use Whole Life to build a living asset. You get guaranteed cash value growth and returns that are tax-advantaged. Plus, you can access policy loans to fund your own empire while your money continues to grow. It's about taking control of your banking and your legacy. Secure your private bank today.",
        "Do you know what happened if you die without life insurance? Your legacy evaporates the moment you're gone. Our Legacy Blueprint ensures your protection never expires. Unlike term, Whole Life stays with you forever, with a death benefit that is guaranteed. It's the ultimate estate planning tool, providing a tax-free windfall for your heirs and creditor protection for your assets. Build a legacy that lasts forever with The Insurance Boss.",
        "Do you know what happened if you die without life insurance? Your family faces rising costs with zero backup. The Fixed Premium Blueprint locks in your security. Your premiums never increase, no matter your age or health changes. It's a forced savings discipline that builds wealth every single day. You're not just buying a policy; you're buying a guarantee that your family will always be protected at a price you can afford today."
      ],
      "Universal Life": [
        "Do you know what happened if you die without life insurance? The industry's rigid rules can leave your family exposed. Universal Life is the Swiss Army Knife of Wealth. It separates the cost of insurance from interest crediting, giving you ultimate flexibility. You can adjust your premium payments and your death benefit as your life and empire evolve. It's dynamic protection for a dynamic life. Get the flexible blueprint your family deserves.",
        "Do you know what happened if you die without life insurance? You miss out on the power of indexed growth. Our IUL Blueprint offers permanent protection with market-linked upside and a 0% floor. You participate in the gains of the market without the risk of losing your principal. It's tax-advantaged accumulation that builds a massive cash value for your future. Protect your family and grow your wealth simultaneously.",
        "Do you know what happened if you die without life insurance? Your family is stuck with a plan that doesn't fit their reality. The Visionary Blueprint uses Universal Life to provide complete transparency and a no-lapse guarantee. Whether you're planning for your estate or your business, this plan pivots with you. It's permanent protection with a dynamic design that ensures you're always in control of your financial destiny."
      ],
      "Term Life": [
        "Do you know what happened if you die without life insurance? Your family loses their primary income source instantly. The High-Leverage Shield is the most affordable way to protect your future. It's pure, simple protection that gives you the highest coverage for the lowest monthly cost. Secure a million-dollar shield for the price of a dinner out. It's the essential first step for every Boss building an empire.",
        "Do you know what happened if you die without life insurance? Your family faces major expenses alone. Our Income Replacement Blueprint is designed to cover the 10, 20, or 30 years when your family needs you most. It ensures your mortgage is paid, your children's education is secured, and your spouse never has to worry about the bills. It's budget-friendly coverage you can count on when it matters most.",
        "Do you know what happened if you die without life insurance? You lose the chance to build permanent wealth. The Conversion Strategy starts with affordable Term Life but gives you the right to convert to permanent insurance later without a medical exam. It's the smart way to lock in your insurability today while you're young and healthy, giving you the flexibility to upgrade your blueprint as your income grows."
      ],
      "Mortgage Protection": [
        "Do you know what happened if you die without life insurance? Your sanctuary becomes a liability. The Sanctuary Security Blueprint is a targeted shield that pays off your mortgage balance directly. It ensures that if the unthinkable happens, the roof stays over their heads and the bank stays out of your driveway. Don't leave your home to luck; secure the sanctuary for the people you love.",
        "Do you know what happened if you die without life insurance? It's a tragedy, but what if you survive a critical illness? Our Mortgage Protection goes beyond the death benefit. It includes riders for disability, job loss, and chronic illness. If you can't work, the policy can cover your mortgage payments for you. It's comprehensive protection for your most important asset and your family's peace of mind.",
        "Do you know what happened if you die without life insurance? Your family loses the home equity you've worked so hard to build. The Home Equity Blueprint protects your investment. With a simple approval process and no lender involvement, we ensure that your family keeps the home and the equity. It's the most effective way to keep your family in the home they love, no matter what life throws your way."
      ],
      "Disability": [
        "Do you know what happened if you die without life insurance? It's a tragedy. But what happens if you survive an injury and can't work? The Income Engine Blueprint protects your ability to earn. Your income is the fuel for your entire empire. If the engine stops, the lifestyle stops. Disability insurance replaces your paycheck so you can keep paying bills and building your dream. Protect the engine today.",
        "Do you know what happened if you die without life insurance? You're gone, but if you're disabled, you're still here with even more expenses. Our Own-Occupation Protection is the professional's shield. It ensures you're paid if you can't perform your specific job, even if you can work in another field. It's the highest standard of protection for high-income earners who refuse to settle for anything less than the best.",
        "Do you know what happened if you die without life insurance? It's a 1-in-1000 risk. But the risk of disability before age 65 is 1-in-4. The Reality Blueprint exposes the truth about income protection. Our benefits are tax-free and the coverage is portable, meaning it stays with you even if you change employers. Don't let an accident derail your life. Get the portable safety net that keeps the cash flowing."
      ]
    };

    return {
      id: `ib-special-${i}`,
      day: 100 + i,
      date: getFutureDate(100 + i),
      week: 1,
      weekTheme: WeekTheme.WEEK1,
      account: ib,
      category: 'Reel' as const,
      title: topic,
      content: scripts[subCat][topicIndex] || `Do you know what happened if you die without life insurance? Deep dive into ${subCat} insurance with a whistleblower perspective.`,
      backgroundImagePrompt: imagePrompts[subCat][topicIndex],
      copy: `Do you know what happened if you die without life insurance? We're exposing the truth about ${subCat} with our ${topic}. #InsuranceBoss #LifeInsurance #WealthProtection`,
      hashtags: "#InsuranceBoss #LifeInsurance #Legacy #Wealth #Whistleblower",
      description: `Special high-impact reel focusing on: ${topic}.`
    };
  })
];

const IB_SPECIAL_CAROUSELS: PostTask[] = [
  ...Array.from({ length: 15 }).map((_, i) => {
    const subCats = ["Whole Life", "Universal Life", "Term Life", "Mortgage Protection", "Disability"];
    const subCat = subCats[i % subCats.length];
    const topicIndex = Math.floor(i / subCats.length); // 0, 1, or 2

    const topics: Record<string, string[]> = {
      "Whole Life": ["The Private Bank Blueprint", "Legacy That Never Expires", "The Fixed Premium Guarantee"],
      "Universal Life": ["The Swiss Army Knife of Wealth", "Indexed Growth: The IUL Blueprint", "Flexible Protection for Visionaries"],
      "Term Life": ["The High-Leverage Shield", "Income Replacement Blueprint", "The Conversion Strategy"],
      "Mortgage Protection": ["Sanctuary Security Blueprint", "Beyond the Death Benefit", "Home Equity Protection"],
      "Disability": ["The Income Engine Blueprint", "Own-Occupation Protection", "The 1-in-4 Reality"]
    };

    const topic = topics[subCat][topicIndex];
    
    const carouselContent: Record<string, string[]> = {
      "Whole Life": [
        "Discover the Private Bank Blueprint: How to use Whole Life to build a living asset with guaranteed cash value and tax-advantaged growth. Learn about policy loans and taking control of your banking.",
        "The Legacy Blueprint: Why permanent protection is the ultimate estate planning tool. Ensure your death benefit is guaranteed and provide a tax-free windfall for your heirs.",
        "The Fixed Premium Guarantee: Lock in your family's security with premiums that never increase. Explore the forced savings discipline of Whole Life and build wealth every day."
      ],
      "Universal Life": [
        "The Swiss Army Knife of Wealth: Explore the dynamic design of Universal Life. Learn how to adjust premiums and death benefits as your life and empire evolve.",
        "Indexed Growth Blueprint: How IUL offers market-linked upside with a 0% floor. Build massive cash value without the risk of market losses.",
        "The Visionary Blueprint: Transparency and flexibility for your estate or business. See how Universal Life pivots with your financial destiny."
      ],
      "Term Life": [
        "The High-Leverage Shield: Maximum protection for minimum cost. Learn why Term Life is the essential first step for every Boss building an empire.",
        "Income Replacement Blueprint: Protecting your family for 10, 20, or 30 years. Ensure the mortgage, education, and lifestyle are always covered.",
        "The Conversion Strategy: Start with affordable term and lock in your insurability. Learn how to upgrade to permanent protection later without a medical exam."
      ],
      "Mortgage Protection": [
        "Sanctuary Security Blueprint: A targeted shield to pay off your mortgage balance. Keep the bank out of your driveway and the roof over your family's head.",
        "Beyond the Death Benefit: Explore living riders for disability, job loss, and critical illness. See how your policy can pay your mortgage if you can't work.",
        "Home Equity Protection: Simple approval and no lender involvement. Protect your investment and ensure your family keeps the home they love."
      ],
      "Disability": [
        "The Income Engine Blueprint: Why your ability to earn is your greatest asset. Learn how disability insurance replaces your paycheck and keeps your dream alive.",
        "Own-Occupation Protection: The professional's shield. Ensure you're paid if you can't perform your specific job, regardless of other work options.",
        "The 1-in-4 Reality: Exposing the truth about disability risk. Discover portable, tax-free benefits that stay with you throughout your career."
      ]
    };

    return {
      id: `ib-special-carousel-${i}`,
      day: 120 + i,
      date: getFutureDate(120 + i),
      week: 1,
      weekTheme: WeekTheme.WEEK1,
      account: ib,
      category: 'Carousel' as const,
      title: topic,
      content: carouselContent[subCat][topicIndex] || `A strategic carousel showcasing our ${subCat} offerings.`,
      copy: `We're showcasing the ${topic} at The Insurance Boss. Here is the blueprint for your family's financial security. #InsuranceBoss #WealthStrategy #Legacy`,
      hashtags: "#InsuranceBoss #LifeInsurance #WealthStrategy #BusinessOwner #FinancialSecurity",
      description: `Informative carousel focusing on: ${topic}.`
    };
  })
];

export const PLAYBOOK_DATA: PostTask[] = [
  ...IB_POSTS,
  ...QC_POSTS,
  ...LIB_POSTS,
  ...IB_SPECIAL_REELS,
  ...IB_SPECIAL_CAROUSELS
];

const generateQuoteBatch = (account: AccountType, category: QuoteCategory, texts: string[]): QuoteItem[] => {
  return texts.map(text => ({
    id: generateId(),
    text,
    category,
    account
  }));
};

export const QUOTES_DATA: QuoteItem[] = [
    ...generateQuoteBatch(ib, 'Life Insurance', [
      "The industry wants you to think life insurance is an expense. The Boss knows it's the ultimate family shield.",
      "Don't let your family's future be a line item in a carrier's profit margin.",
      "The elite don't 'buy' life insurance; they architect family fortresses.",
      "Your family's lifestyle shouldn't be a variable in a corporate algorithm.",
      "The whistleblower's truth: Most life policies are built for the carrier, not your kids.",
      "A Boss-level life policy is the only thing standing between your family and a financial cliff.",
      "Stop funding the industry's towers and start building your family's empire.",
      "The ultimate act of authority is ensuring your family never has to ask for permission to survive.",
      "The industry hides the real math of family protection. We expose it.",
      "Your children's future is the only ROI that actually matters.",
      "Life insurance isn't about death; it's about the Boss's promise to the living.",
      "Don't leave your family's legacy to a 'standard' policy trap.",
      "The Boss uses life insurance to buy certainty in an uncertain world.",
      "Your family deserves a strategy, not just a certificate.",
      "The industry profits from your delay. Your family pays the price.",
      "A true Boss protects the pride first. Life insurance is the weapon of choice.",
      "Exposing the truth: Your family is the most undervalued asset in the industry's eyes. Change that.",
      "The elite family office starts with a bulletproof life insurance strategy.",
      "Don't let a tragedy be the first time your family realizes they were under-protected.",
      "The Boss's final whistle: Your family's security is non-negotiable."
    ]),
    ...generateQuoteBatch(ib, 'Commercial Risk', [
      "Risk is a variable to be managed, not a monster to be feared.",
      "Your agent's ignorance is your company's greatest liability.",
      "A 'standard' policy is a standard way to lose your business in a lawsuit.",
      "The elite don't buy insurance; they architect certainty through contracts.",
      "Liability is the silent thief of corporate equity.",
      "If you can't explain your exclusions, you aren't actually covered.",
      "The Boss finds the gaps before the lawyers find the courthouse.",
      "Workers Comp is a controllable expense, not an inevitable tax.",
      "A certificate of insurance is a placebo; a contract is the cure.",
      "Nuclear verdicts are built on the foundation of lazy risk management.",
      "Risk engineering is the difference between a setback and a shutdown.",
      "The industry profits from your fear; the Boss profits from your precision.",
      "Don't let a $50M lawsuit be the first time you read your policy.",
      "Transparency in risk is the ultimate competitive advantage.",
      "Your broker works for the carrier; the Boss works for the result.",
      "Asset protection starts with the fine print, not the premium.",
      "The biggest risk is the one you didn't think was worth mentioning.",
      "Insurance is a tool, but strategy is the weapon.",
      "Audit your risk today, or the world will audit your legacy tomorrow.",
      "In the game of high-stakes business, protection is the only winning move."
    ]),
    ...generateQuoteBatch(qc, 'Savings', [
      "Saving $1,200 on insurance is like getting a free vacation every year.",
      "Why pay for a big name when you can pay for a big life?",
      "The 'Loyalty Tax' is the price you pay for not checking your rates.",
      "Quick Coverage means more money for the things that actually matter.",
      "We're your neighbors, and neighbors don't let neighbors overpay.",
      "Get a better rate in less time than it takes to order a pizza.",
      "Insurance shouldn't be a luxury; it should be a smart decision.",
      "Bundle your home and auto to unlock the savings the big guys hide.",
      "Our tech finds the discounts; our heart keeps the promise.",
      "Stop funding the carrier's Super Bowl ads and start funding your dreams.",
      "A dollar saved on your premium is a dollar earned for your family.",
      "Efficiency is how we keep our prices low and your spirits high.",
      "The neighborhood secret to lower rates is finally out.",
      "Don't wait for a renewal notice to start saving money.",
      "Smart insurance for smart people who value their time and money.",
      "We cut the red tape so you can keep the green in your wallet.",
      "High-speed savings for a high-speed world.",
      "Your budget's best friend is a Quick Coverage policy.",
      "Better coverage, lower rates, zero headaches.",
      "Instantly compare, instantly save, instantly breathe easier."
    ]),
    ...generateQuoteBatch(qc, 'Family', [
      "We protect the roof over your head and the hearts inside your home.",
      "Insurance is the invisible hug that keeps your family safe.",
      "From the first tricycle to the first car, we're with you every mile.",
      "A safe home is the foundation of a happy life.",
      "We don't just insure houses; we protect the places where memories live.",
      "Family first isn't just a slogan; it's our underwriting philosophy.",
      "Your family's peace of mind is our community's greatest asset.",
      "The neighborhood way: Real people looking out for real families.",
      "Protecting your nest is the ultimate act of neighborly love.",
      "We're here for the rainy days, so you can enjoy the sunny ones.",
      "A promise made to a neighbor is a promise we always keep.",
      "Your kids deserve a future that's already been protected.",
      "Quick Coverage: Because your family's safety shouldn't wait.",
      "The heart of our business is the families in our neighborhood.",
      "Simple coverage for the most important people in your world.",
      "We're the safety net that lets your family dream bigger.",
      "Building a safe community, one family at a time.",
      "Your home is your sanctuary; let's keep it that way together.",
      "Neighborly care meets professional protection.",
      "The QC family shield: Strong, simple, and always there."
    ]),
    ...generateQuoteBatch(lib, 'Life', [
      "The Life Insurance Boss doesn't just sell policies; we architect family empires.",
      "Your legacy isn't a conversation for 'one day'—it's a directive for today.",
      "The ultimate act of leadership is ensuring your absence never equals your family's failure.",
      "We convert your life's effort into a permanent fortress of financial certainty.",
      "Stop letting the industry dictate your value. The Boss defines the legacy.",
      "A signed policy is the code of honor for every true head of household.",
      "The Life Q standard: Protection that grows as fast as your dreams do.",
      "We don't settle for 'standard' coverage. We demand elite security for elite families.",
      "Your family's future is the only IPO that truly matters.",
      "The Boss uses life insurance to buy back the time your family deserves.",
      "Don't just be a provider; be a protector whose reach extends through generations.",
      "A Life Insurance Boss policy is the whistle that signals the end of financial worry.",
      "We build the shield so you can build the legacy.",
      "Strategic love looks like a fully funded, bulletproof life insurance plan.",
      "The industry hides the power of life insurance; the Life Q exposes the wealth.",
      "Your name should be the anchor of your family's financial freedom.",
      "The Boss knows that the best time to protect was yesterday; the second best time is now.",
      "We turn your current income into your family's future independence.",
      "A legacy is built in the quiet moments of planning, not the loud moments of crisis.",
      "Life Insurance Boss: Where authority meets absolute family security."
    ]),
    ...generateQuoteBatch(ib, 'Whole Life Insurance', [
      "Whole life isn't just a policy; it's a private bank for your legacy.",
      "The Boss doesn't rent protection; the Boss owns it for life.",
      "Cash value is the ultimate whistleblower against market volatility.",
      "Whole life insurance: Where certainty meets compounding growth.",
      "Stop paying for temporary fixes. Build a permanent fortress.",
      "The industry wants you to buy term and invest the rest. The Boss does both with one signature.",
      "Guaranteed growth is the scoreboard of a strategic provider.",
      "Your policy should be an asset, not just an expense.",
      "Whole life is the foundation of the elite family office.",
      "Dividends are the residuals of a well-structured life policy.",
      "Don't leave your family's future to the whims of the stock market.",
      "The Boss knows that liquidity is king in times of crisis.",
      "Whole life insurance is the only asset that guarantees a result.",
      "Build a legacy that grows every single day, guaranteed.",
      "Your cash value is your own private line of credit.",
      "The ultimate act of love is a policy that never expires.",
      "Whole life is the anchor of a multi-generational wealth strategy.",
      "Stop chasing returns and start building a guaranteed future.",
      "The Boss uses whole life to fund the next generation's dreams.",
      "Permanent protection for a permanent legacy."
    ]),
    ...generateQuoteBatch(ib, 'Universal Life Insurance', [
      "Flexibility is the weapon of the strategic provider.",
      "Universal life: The adjustable shield for an evolving empire.",
      "The Boss adapts to the market; your policy should too.",
      "Cash value growth with the flexibility to pivot when needed.",
      "Universal life insurance is the Swiss Army knife of wealth protection.",
      "Don't get locked into a rigid plan. Stay agile, stay protected.",
      "The industry fears the agent who knows how to structure a UL policy.",
      "Your premiums should work as hard as you do.",
      "Universal life: High-end protection for the modern visionary.",
      "Adjust your coverage, not your lifestyle.",
      "The Boss knows that life changes. Your insurance should keep up.",
      "Universal life is the bridge between protection and opportunity.",
      "Maximize your cash value potential with a Boss-level UL strategy.",
      "The ultimate tool for the business owner's personal balance sheet.",
      "Stay in control of your legacy with universal flexibility.",
      "Universal life insurance: Designed for those who demand more.",
      "Your policy, your terms, your legacy.",
      "The Boss uses UL to bridge the gap between risk and reward.",
      "Agile protection for a fast-paced world.",
      "Universal life is the elite choice for the flexible provider."
    ]),
    ...generateQuoteBatch(ib, 'Term Life Insurance', [
      "Term life is the high-leverage shield for the building years.",
      "Protect the most valuable years of your life for the price of a dinner out.",
      "The Boss knows that leverage is the key to massive protection.",
      "Term life insurance: Maximum coverage, minimum cost, zero excuses.",
      "Don't leave your family's most vulnerable years to chance.",
      "The industry wants to overcomplicate it. The Boss keeps it simple and strong.",
      "Term life is the foundation of every young empire.",
      "High-limit protection for the provider on the rise.",
      "Your family's standard of living shouldn't be a gamble.",
      "Term life insurance is the ultimate peace of mind for the busy Boss.",
      "Protect your income while you build your wealth.",
      "The Boss uses term to cover the big risks while the assets grow.",
      "Don't wait until you're 'rich' to be protected. Start today with term.",
      "Term life: The strategic choice for the growing family.",
      "Maximum ROI on your family's security.",
      "The industry hides the simplicity of term. We expose the value.",
      "Your kids' future is worth more than a monthly subscription.",
      "Term life insurance: The essential tool for the modern provider.",
      "Big protection for the big dreams of your family.",
      "The Boss starts with term and builds to a legacy."
    ]),
    ...generateQuoteBatch(ib, 'Mortgage Protection Insurance', [
      "Your home is your sanctuary. Make sure it stays that way.",
      "Don't let a tragedy turn into an eviction notice.",
      "Mortgage protection: The shield that keeps the roof over their heads.",
      "The Boss protects the home first, the legacy second.",
      "Your family shouldn't have to move because you aren't there.",
      "The industry calls it 'optional'. The Boss calls it 'essential'.",
      "Mortgage protection insurance: The ultimate gift of stability.",
      "Ensure your family's home is paid for, no matter what.",
      "The biggest debt in your life deserves the biggest protection.",
      "Don't leave your mortgage to your grieving family.",
      "Mortgage protection is the foundation of a safe neighborhood.",
      "The Boss knows that a paid-off home is the ultimate security.",
      "Your sanctuary deserves a bulletproof shield.",
      "Mortgage protection insurance: Because 'I'm sorry' doesn't pay the bank.",
      "Keep the memories in the house, and the bank out of it.",
      "The strategic move for every homeowner: Mortgage protection.",
      "Your family's stability starts with a secure home.",
      "The industry hides the risk of an unprotected mortgage.",
      "Mortgage protection: The Boss's promise to the family home.",
      "A paid-off home is the first step to generational wealth."
    ]),
    ...generateQuoteBatch(ib, 'Disability Insurance', [
      "Your income is your most valuable asset. Protect it like one.",
      "The Boss knows that a paycheck is the fuel for the empire.",
      "Disability insurance: The shield for your ability to earn.",
      "Don't let an accident bankrupt your family's future.",
      "The industry ignores disability. The Boss prepares for it.",
      "Your lifestyle depends on your income. What happens if it stops?",
      "Disability insurance is the ultimate whistleblower against bad luck.",
      "Protect the engine that builds your wealth.",
      "The Boss doesn't gamble with their ability to provide.",
      "Disability insurance: The essential tool for the career professional.",
      "Your paycheck is the foundation of your family's dreams.",
      "Don't let a health crisis become a financial catastrophe.",
      "Disability insurance: The Boss's safety net for the daily grind.",
      "The strategic choice for the high-earning provider.",
      "Your ability to work is your family's greatest resource.",
      "The industry hides the statistics. The Boss knows the risks.",
      "Disability insurance: Because life doesn't stop when you do.",
      "Protect your earning power, protect your legacy.",
      "The Boss uses disability insurance to ensure the empire keeps growing.",
      "Income protection for the visionary who never stops."
    ]),
    ...generateQuoteBatch(lib, 'Life Insurance', [
      "Every heartbeat is a billable hour for your family's future. Protect it.",
      "The Life Insurance Boss ensures your sweat equity lives on forever.",
      "It's not about the premium; it's about the promise of a preserved lifestyle.",
      "The ultimate strategy: Turning a monthly payment into a multi-generational windfall.",
      "The industry wants you to think life insurance is an expense. The Boss knows it's the ultimate family shield.",
      "Your family's standard of living shouldn't be a gamble on the stock market.",
      "A Life Q strategy is the silent partner in your family's success story.",
      "We don't just cover deaths; we fund life's next chapters.",
      "The Boss knows that insurance is the only asset that's 100% tax-free and 100% certain.",
      "Don't leave your family to guess. Leave them a blueprint for prosperity.",
      "Life insurance is the foundation upon which every great family office is built.",
      "Your kids' dreams shouldn't have an expiration date based on your health.",
      "The whistleblower's truth: A cheap policy is the most expensive mistake you'll ever make.",
      "Architect your family's freedom with the precision of a Life Insurance Boss.",
      "We transform your earning power into a permanent family bank.",
      "The Life Q standard means your family never has to compromise on their future.",
      "Stop chasing 'investments' until your 'protections' are bulletproof.",
      "Your legacy is your signature. Make sure it carries the weight of a Boss.",
      "The ultimate gift to your children is a name that signifies security.",
      "Life Insurance Boss: The final word in family wealth preservation."
    ])
];

