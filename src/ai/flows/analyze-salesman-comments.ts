'use server';

/**
 * @fileOverview Analyzes salesman comments using AI to identify key trends and opportunities in customer feedback.
 *
 * - analyzeSalesmanComments - A function that handles the analysis of salesman comments.
 * - AnalyzeSalesmanCommentsInput - The input type for the analyzeSalesmanComments function.
 * - AnalyzeSalesmanCommentsOutput - The return type for the analyzeSalesmanComments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSalesmanCommentsInputSchema = z.object({
  comments: z
    .string()
    .describe('The comments from the salesman to be analyzed.'),
});
export type AnalyzeSalesmanCommentsInput = z.infer<typeof AnalyzeSalesmanCommentsInputSchema>;

const AnalyzeSalesmanCommentsOutputSchema = z.object({
  trends: z
    .string()
    .describe('Key trends identified in the salesman comments.'),
  opportunities: z
    .string()
    .describe('Opportunities identified in the salesman comments.'),
});
export type AnalyzeSalesmanCommentsOutput = z.infer<typeof AnalyzeSalesmanCommentsOutputSchema>;

export async function analyzeSalesmanComments(
  input: AnalyzeSalesmanCommentsInput
): Promise<AnalyzeSalesmanCommentsOutput> {
  return analyzeSalesmanCommentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeSalesmanCommentsPrompt',
  input: {schema: AnalyzeSalesmanCommentsInputSchema},
  output: {schema: AnalyzeSalesmanCommentsOutputSchema},
  prompt: `You are an AI assistant specializing in analyzing salesman comments to identify key trends and opportunities in customer feedback.

  Analyze the following comments and extract key trends and potential opportunities to improve sales strategies.

  Comments: {{{comments}}}

  Provide a concise summary of the identified trends and opportunities.

  Trends:

  Opportunities:`,
});

const analyzeSalesmanCommentsFlow = ai.defineFlow(
  {
    name: 'analyzeSalesmanCommentsFlow',
    inputSchema: AnalyzeSalesmanCommentsInputSchema,
    outputSchema: AnalyzeSalesmanCommentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
