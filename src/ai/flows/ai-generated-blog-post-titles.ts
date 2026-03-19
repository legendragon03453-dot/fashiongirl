'use server';
/**
 * @fileOverview This file implements a Genkit flow for generating creative and SEO-friendly blog post titles.
 *
 * - generateBlogPostTitles - An asynchronous function to generate blog post titles.
 * - AIGeneratedBlogPostTitlesInput - The input type for the generateBlogPostTitles function.
 * - AIGeneratedBlogPostTitlesOutput - The return type for the generateBlogPostTitles function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AIGeneratedBlogPostTitlesInputSchema = z.object({
  draft: z
    .string()
    .optional()
    .describe('An optional draft of the blog post content.'),
  keywords: z
    .array(z.string())
    .optional()
    .describe('An optional list of keywords relevant to the blog post.'),
});

export type AIGeneratedBlogPostTitlesInput = z.infer<
  typeof AIGeneratedBlogPostTitlesInputSchema
>;

const AIGeneratedBlogPostTitlesOutputSchema = z.object({
  titles: z
    .array(z.string())
    .describe('An array of creative and SEO-friendly blog post titles.'),
});

export type AIGeneratedBlogPostTitlesOutput = z.infer<
  typeof AIGeneratedBlogPostTitlesOutputSchema
>;

const generateTitlesPrompt = ai.definePrompt({
  name: 'generateTitlesPrompt',
  input: { schema: AIGeneratedBlogPostTitlesInputSchema },
  output: { schema: AIGeneratedBlogPostTitlesOutputSchema },
  prompt: `You are an expert content creator and SEO specialist. Your task is to generate 5 distinct, creative, and SEO-friendly blog post titles based on the provided content or keywords. Focus on titles that will attract readers and rank well in search engines.

{{#if draft}}
Draft Content:
{{{draft}}}
{{/if}}

{{#if keywords}}
Keywords:
{{#each keywords}}- {{{this}}}
{{/each}}
{{/if}}

Please generate exactly 5 blog post titles and ensure they are formatted as a JSON array of strings, as described in the output schema.`,
});

const aiGeneratedBlogPostTitlesFlow = ai.defineFlow(
  {
    name: 'aiGeneratedBlogPostTitlesFlow',
    inputSchema: AIGeneratedBlogPostTitlesInputSchema,
    outputSchema: AIGeneratedBlogPostTitlesOutputSchema,
  },
  async (input) => {
    const { output } = await generateTitlesPrompt(input);
    if (!output) {
      throw new Error('Failed to generate blog post titles.');
    }
    return output;
  }
);

export async function generateBlogPostTitles(
  input: AIGeneratedBlogPostTitlesInput
): Promise<AIGeneratedBlogPostTitlesOutput> {
  return aiGeneratedBlogPostTitlesFlow(input);
}
