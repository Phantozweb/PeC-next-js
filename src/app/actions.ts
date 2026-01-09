'use server';

import {
  analyzeSalesmanComments,
  type AnalyzeSalesmanCommentsInput,
  type AnalyzeSalesmanCommentsOutput,
} from '@/ai/flows/analyze-salesman-comments';

export async function analyzeSalesmanCommentsAction(
  input: AnalyzeSalesmanCommentsInput
): Promise<AnalyzeSalesmanCommentsOutput> {
  try {
    const result = await analyzeSalesmanComments(input);
    return result;
  } catch (error) {
    console.error('Error in analyzeSalesmanCommentsAction:', error);
    throw new Error('Failed to analyze comments.');
  }
}
