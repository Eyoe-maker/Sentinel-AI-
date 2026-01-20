import Anthropic from '@anthropic-ai/sdk';

// Initialize client conditionally (same pattern as email.ts)
const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const DEFAULT_MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514';
const DEFAULT_MAX_TOKENS = parseInt(process.env.CLAUDE_MAX_TOKENS || '4096');

// Type definitions for API responses
export interface ClaudeResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

// Check if Claude is available
export function isClaudeConfigured(): boolean {
  return anthropic !== null;
}

// Generic message completion function
export async function sendMessage(
  systemPrompt: string,
  userMessage: string,
  options?: {
    maxTokens?: number;
    temperature?: number;
  }
): Promise<ClaudeResponse<string>> {
  if (!anthropic) {
    console.log('Claude: API not configured, skipping request');
    return { success: false, error: 'Claude API not configured' };
  }

  try {
    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: options?.maxTokens || DEFAULT_MAX_TOKENS,
      temperature: options?.temperature ?? 0.3,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    const textContent = response.content.find(c => c.type === 'text');

    return {
      success: true,
      data: textContent && 'text' in textContent ? textContent.text : '',
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    };
  } catch (error) {
    console.error('Claude API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Send message with JSON response parsing
export async function sendMessageForJSON<T>(
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number }
): Promise<ClaudeResponse<T>> {
  const response = await sendMessage(
    systemPrompt + '\n\nIMPORTANT: Respond with valid JSON only, no markdown code blocks.',
    userMessage,
    { ...options, temperature: 0.1 }
  );

  if (!response.success || !response.data) {
    return { success: false, error: response.error };
  }

  try {
    // Clean JSON response (remove code blocks if present)
    let jsonStr = response.data.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.slice(7);
    }
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.slice(3);
    }
    if (jsonStr.endsWith('```')) {
      jsonStr = jsonStr.slice(0, -3);
    }
    jsonStr = jsonStr.trim();

    const parsed = JSON.parse(jsonStr) as T;
    return { success: true, data: parsed, usage: response.usage };
  } catch {
    console.error('Failed to parse JSON response:', response.data);
    return { success: false, error: 'Failed to parse JSON response' };
  }
}

// Vision API for document analysis
export async function analyzeImage(
  base64Image: string,
  mediaType: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/gif',
  systemPrompt: string,
  userPrompt: string
): Promise<ClaudeResponse<string>> {
  if (!anthropic) {
    return { success: false, error: 'Claude API not configured' };
  }

  try {
    const response = await anthropic.messages.create({
      model: DEFAULT_MODEL,
      max_tokens: DEFAULT_MAX_TOKENS,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Image,
              },
            },
            { type: 'text', text: userPrompt },
          ],
        },
      ],
    });

    const textContent = response.content.find(c => c.type === 'text');
    return {
      success: true,
      data: textContent && 'text' in textContent ? textContent.text : '',
      usage: {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      },
    };
  } catch (error) {
    console.error('Claude Vision API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
