import { GoogleGenAI } from "@google/genai";
import { AccountType, PostTask, SocialPlatform, QuoteItem } from "../types";

const getAccountPersona = (account: AccountType): string => {
  switch (account) {
    case AccountType.IB:
      return "Brand: 'The Insurance Boss'. Voice: The Industry Whistleblower. Tone: Authoritative, fearless, 'No BS'. Focus: Exposing industry traps and elite wealth protection. MANDATORY CTA: Always include 'Visit theinsuranceboss.com to find more info' in captions and scripts.";
    case AccountType.QC:
      return "Brand: 'Quick Coverage'. Voice: The Helpful Neighbor. Tone: Warm, efficient, family-oriented. Focus: Savings hacks and home/auto bundles.";
    case AccountType.LIB:
      return "Brand: 'The Life Insurance Boss'. Voice: The Strategic Provider. Tone: Professional, empathetic, visionary. Focus: Life insurance as the ultimate act of love and a tool for generational wealth.";
    case AccountType.PB:
      return "Brand: 'The Protection Boss'. Voice: The Guardian. Tone: Emotional, deep, urgent, protective. Focus: Legacy, family security, and life insurance missions.";
    default:
      return "Professional Content Creator";
  }
};

const getVisualDiversityRules = (account: AccountType): string => {
    if (account === AccountType.QC) {
        return `
        VISUAL AESTHETIC & PHOTOGRAPHY STYLE (Cinematic Lifestyle):
        - STYLE: Hyper-realistic RAW photography. Professional lifestyle aesthetic.
        - LIGHTING: Cinematic GOLDEN HOUR lighting. Warm backlighting, sun-drenched atmosphere, soft lens flares, and glowing subject edges.
        - CAMERA: Shallow depth of field (f/1.8), sharp focus on the person, beautifully blurred background (bokeh).
        - MANDATORY: REAL HUMAN PEOPLE only. Genuine, warm smiles and authentic interactions.
        - SUBJECTS: Families, children, homeowners, or friendly professionals.
        - SETTINGS: High-end authentic environments (front porches of modern homes, clean designer kitchens, or charming local storefronts/main streets).
        - COLOR: Natural but rich and warm. Vibrant but realistic saturation.
        - FORBIDDEN: ABSOLUTELY NO charts, NO graphs, NO UI overlays, NO floating boxes, NO diagrams, NO icons, and NO text within the image. PURE PHOTOGRAPHY ONLY.
        `;
    }

    const commonRule = `
    VISUAL AESTHETIC & PHOTOGRAPHY STYLE:
    - STYLE: Hyper-realistic RAW photography. Cinematic documentary style.
    - MANDATORY: Deep, cinematic HIGH-CONTRAST BLACK AND WHITE only. No color.
    - CRITICAL RULE: DO NOT SHOW FACES. Subjects must be photographed from behind, neck down, silhouetted, or obscured.
    - FORBIDDEN: No cartoons, no digital illustrations.
    - LOOK: Professional, authentic, high-end. Real-life grainy textures, realistic shadows.
    `;
    
    switch (account) {
        case AccountType.IB:
            return `${commonRule} 
            - UNIQUE CONSTRAINT: NEVER show the subject standing in front of a window, glass wall, or bright window background. This is strictly forbidden. 
            - UNIQUE CONSTRAINT: NEVER show 'Vaults', 'Vault doors', or 'Library books' in the image. This is strictly forbidden.
            - PREFERRED SETTINGS: Solid textured walls (concrete, stone, dark wood), sitting at a heavy stone desk in a corner, walking through a dimly lit hallway. 
            - ATMOSPHERE: Grounded power, solid foundations, heavy dramatic shadows.`;
        case AccountType.LIB:
            return `${commonRule} Settings: Professional and intimate. Silhouetted families, hands signing documents on a dark wooden table, shoulder-up shots of a provider looking out toward a city skyline (no window visible).`;
        case AccountType.PB:
            return `${commonRule} Settings: Intimate and meaningful. Silhouetted parents holding hands, shoulder-up shots of documents on a table. Moody, emotional lighting.`;
        default:
            return commonRule;
    }
};

export const generatePostPrompt = async (task: PostTask, platform: SocialPlatform = 'ALL'): Promise<string> => {
  try {
    const apiKey = "AIzaSyAZIgZ3Eu5e8P69Ose0ko3vBu3FT0IQlDs";
    if (!apiKey) throw new Error("API_KEY is missing");

    const ai = new GoogleGenAI({ apiKey });
    const persona = getAccountPersona(task.account);
    const diversity = getVisualDiversityRules(task.account);
    
    const isCarousel = task.category === 'Carousel';
    const isVideo = ['Reel', 'Video', 'YouTube Shorts'].includes(task.category);

    const systemInstruction = `
        You are an Elite Social Media Creative Director. The Year is 2026.
        ${persona}
        ${diversity}

        TASK: Create a complete social media strategy for a ${task.category}.
        
        ${task.account === AccountType.IB ? "CRITICAL: You MUST include the text 'Visit theinsuranceboss.com to find more info' at the end of every Caption and every ElevenLabs Script." : ""}

        ${isCarousel ? `
        CAROUSEL STRUCTURE (${task.account === AccountType.IB ? 'EXACTLY 6 Slides' : '5 Slides'}):
        For EVERY slide, provide ONLY the image prompt. Do NOT provide headline or body text for the slides.
        ### 📄 Slide [X]
        - **📸 IMAGE PROMPT**: A dedicated hyper-realistic photography prompt for this specific slide.
          * If QC: Focus on cinematic golden hour lifestyle photography of real human people and families. NO charts, NO UI, NO diagrams, NO floating graphics.
          * If IB: High-contrast B&W, STRICTLY NO WINDOWS or glass backgrounds, NO faces.
        ` : ''}

        OUTPUT SECTIONS:
        1. **🔥 THE HOOK**: The opening line.
        ${isVideo ? `
        2. **🎙️ VOICE PROMPT**: A descriptive persona for TTS (e.g., ElevenLabs). Include tone, pitch, age, and delivery style.
        3. **🎙️ ELEVENLABS SCRIPT**: The actual audio narration script. **STRICT LIMIT: The script must be exactly 20 seconds long (approximately 45-55 words). Ensure high impact and zero fluff.** ${task.account === AccountType.IB ? "Must end with: Visit theinsuranceboss.com to find more info." : ""}
        4. **🎬 VIDEO GENERATION PROMPT**: A detailed prompt for a video generation AI (e.g., HeyGen, Sora, or Kling) to create a video of a person talking. Describe the person's appearance, attire, the professional setting, and the camera angle (e.g., medium shot). The person should be authentically lip-syncing the ELEVENLABS SCRIPT.
        5. **🎵 MUSIC PROMPT**: A descriptive generation prompt for AI Music (e.g., Udio/Suno). Include genre, mood, instruments, and BPM.
        ` : '2. **🎬 FULL BREAKDOWN**: A frame-by-frame visual storyboard.'}
        6. **📸 MASTER IMAGE PROMPT**: A single 4k hyper-realistic visual prompt for the main asset/cover. 
           * ${task.account === AccountType.QC ? 'STRICT: Cinematic golden hour lifestyle photography. NO charts or UI overlays.' : ''}
           * ${task.account === AccountType.IB ? 'STRICT: SOLID BACKGROUNDS ONLY. NO WINDOWS.' : ''}
        7. **✍️ CAPTION**: Title Case social media copy. ${task.account === AccountType.IB ? "Include CTA: Visit theinsuranceboss.com to find more info." : ""}
        8. **#️⃣ HASHTAGS**: Exactly 5 lowercase hashtags.

        CRITICAL CONSTRAINTS:
        - NO TEXT IN IMAGES (the AI generator should not draw the text).
        - QC must look like REAL HUMAN PEOPLE/FAMILIES/HOMES in PURE PHOTOGRAPHY with warm, cinematic lighting.
        - IB must look like POWERFUL/GROUNDED environments with SOLID BACKGROUNDS (NO WINDOWS).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate a ${task.category} campaign for ${task.account}. Topic: ${task.title}. Content focus: ${task.content}. Platform: ${platform}.`,
      config: { systemInstruction, temperature: 0.95 }
    });
    return response.text || "Generation failed.";
  } catch (error) {
    return "Error generating strategy.";
  }
};

export const generateQuoteArtPrompt = async (quote: QuoteItem): Promise<string> => {
    try {
    const apiKey = "AIzaSyAZIgZ3Eu5e8P69Ose0ko3vBu3FT0IQlDs";
    if (!apiKey) throw new Error("API_KEY is missing");
        
        const ai = new GoogleGenAI({ apiKey });
        const persona = getAccountPersona(quote.account);
        const diversity = getVisualDiversityRules(quote.account);

        const systemInstruction = `
            You are a Creative Director.
            ${persona}
            ${diversity}
            
            TASK: Generate 4 visual directions for: "${quote.text}"
            
            Headers:
            ### 🖼️ Option 1: The Human Interaction
            ${quote.account === AccountType.QC ? 'Real human family moment with cinematic golden hour lighting. Full color. No charts or UI.' : 'Silhouetted human interaction. B&W. No windows.'}
            
            ### 📸 Option 2: The Macro Texture
            Focus on authentic textures (leather, stone, coffee beans, home materials).
            
            ### 🌆 Option 3: The Environment
            ${quote.account === AccountType.QC ? 'A sun-drenched home setting with real people. Pure photography, shallow depth of field.' : 'A solid, grounded executive setting. NO WINDOWS.'}
            
            ### 🎨 Option 4: The Candid Perspective
            Low angle or unique POV.
            
            RULES:
            - ALL PHOTOGRAPHY.
            - NO CARTOONS.
            - NO CHARTS, NO DIAGRAMS, NO FLOATING GRAPHICS for QC.
            - NO FACES (except for Quick Coverage).
            - NO WINDOWS for IB.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Generate 4 art directions for the quote: "${quote.text}"`,
            config: { systemInstruction, temperature: 0.9 }
        });
        return response.text || "Generation failed.";
    } catch (error) {
        return "Error creating art prompt.";
    }
};