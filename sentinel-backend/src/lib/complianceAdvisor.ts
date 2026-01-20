import { sendMessage, isClaudeConfigured, ClaudeResponse } from './claude';

export interface AdvisorContext {
  userCountry?: string;
  businessType?: 'B2B' | 'B2C' | 'MIXED';
  currentOSSPercentage?: number;
  currentSMEPercentage?: number;
  hasOSSRegistration?: boolean;
}

export interface AdvisorResponse {
  answer: string;
  confidence: 'high' | 'medium' | 'low';
  disclaimer: string;
  relatedTopics?: string[];
  sources?: string[];
}

const COMPLIANCE_ADVISOR_PROMPT = `You are an expert EU VAT compliance advisor specializing in:
- EU SME VAT Exemption Scheme (2025 rules)
- One-Stop Shop (OSS) registration and thresholds
- Cross-border B2B and B2C transactions
- Posted worker regulations and A1 certificates
- VAT registration requirements across EU member states

CRITICAL RULES:
1. NEVER provide specific VAT rate calculations - direct users to calculate with official tools
2. NEVER give definitive legal advice - recommend consulting a tax professional for binding decisions
3. Always mention relevant EU directives when applicable
4. Focus on explaining concepts, procedures, and general guidelines
5. If unsure, say so and recommend professional consultation

KEY THRESHOLDS (2025):
- OSS Distance Selling Threshold: EUR 10,000 EU-wide for B2C cross-border
- SME VAT Exemption Cap: EUR 100,000 EU-wide turnover
- Individual country thresholds vary for domestic exemptions

Respond in JSON format:
{
  "answer": "Your detailed answer here",
  "confidence": "high" | "medium" | "low",
  "relatedTopics": ["topic1", "topic2"],
  "sources": ["EU Directive 2006/112/EC", etc]
}`;

const DISCLAIMER = 'This information is for general guidance only and does not constitute legal or tax advice. Please consult a qualified tax professional for advice specific to your situation.';

interface ClaudeAdvisorResult {
  answer: string;
  confidence?: 'high' | 'medium' | 'low';
  relatedTopics?: string[];
  sources?: string[];
}

export async function askComplianceQuestion(
  question: string,
  context?: AdvisorContext
): Promise<ClaudeResponse<AdvisorResponse>> {
  if (!isClaudeConfigured()) {
    return {
      success: false,
      error: 'Compliance advisor is not available - Claude API not configured',
    };
  }

  if (process.env.ENABLE_CLAUDE_ADVISOR === 'false') {
    return {
      success: false,
      error: 'Compliance advisor is disabled',
    };
  }

  // Build context string
  let contextString = '';
  if (context) {
    const parts: string[] = [];
    if (context.userCountry) parts.push(`Business country: ${context.userCountry}`);
    if (context.businessType) parts.push(`Business type: ${context.businessType}`);
    if (context.currentOSSPercentage !== undefined) {
      parts.push(`Current OSS threshold usage: ${context.currentOSSPercentage.toFixed(1)}%`);
    }
    if (context.currentSMEPercentage !== undefined) {
      parts.push(`Current SME threshold usage: ${context.currentSMEPercentage.toFixed(1)}%`);
    }
    if (context.hasOSSRegistration !== undefined) {
      parts.push(`Has OSS registration: ${context.hasOSSRegistration ? 'Yes' : 'No'}`);
    }
    if (parts.length > 0) {
      contextString = `\n\nUSER CONTEXT:\n${parts.join('\n')}`;
    }
  }

  const response = await sendMessage(
    COMPLIANCE_ADVISOR_PROMPT,
    `${question}${contextString}`,
    { temperature: 0.3, maxTokens: 2048 }
  );

  if (!response.success || !response.data) {
    return { success: false, error: response.error };
  }

  try {
    // Try to parse JSON response
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

    const parsed: ClaudeAdvisorResult = JSON.parse(jsonStr);
    return {
      success: true,
      data: {
        answer: parsed.answer,
        confidence: parsed.confidence || 'medium',
        disclaimer: DISCLAIMER,
        relatedTopics: parsed.relatedTopics || [],
        sources: parsed.sources || [],
      },
      usage: response.usage,
    };
  } catch {
    // If JSON parsing fails, return raw text as answer
    return {
      success: true,
      data: {
        answer: response.data,
        confidence: 'medium',
        disclaimer: DISCLAIMER,
      },
      usage: response.usage,
    };
  }
}
