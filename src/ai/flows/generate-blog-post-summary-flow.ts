'use server';
/**
 * @fileOverview A Genkit flow for generating concise and compelling summaries for blog posts.
 *
 * - generateBlogPostSummary - A function that handles the blog post summary generation process.
 * - GenerateBlogPostSummaryInput - The input type for the generateBlogPostSummary function.
 * - GenerateBlogPostSummaryOutput - The return type for the generateBlogPostSummary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBlogPostSummaryInputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The full content of the blog post.'),
});
export type GenerateBlogPostSummaryInput = z.infer<typeof GenerateBlogPostSummaryInputSchema>;

const GenerateBlogPostSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise and compelling summary for the blog post.'),
});
export type GenerateBlogPostSummaryOutput = z.infer<typeof GenerateBlogPostSummaryOutputSchema>;

export async function generateBlogPostSummary(
  input: GenerateBlogPostSummaryInput
): Promise<GenerateBlogPostSummaryOutput> {
  return generateBlogPostSummaryFlow(input);
}

const generateBlogPostSummaryPrompt = ai.definePrompt({
  name: 'generateBlogPostSummaryPrompt',
  input: { schema: GenerateBlogPostSummaryInputSchema },
  output: { schema: GenerateBlogPostSummaryOutputSchema },
  prompt: `You are an AI assistant tasked with generating concise and compelling summaries for blog posts.
The summaries should be suitable for displaying as article previews on listing pages.
The summary should capture the main idea of the blog post and encourage users to read the full article.
Keep the summary to a maximum of 3 sentences and ensure it is engaging.

Blog Post Title: {{{title}}}
Blog Post Content: {{{content}}}

Generate the summary below:`,
});

const generateBlogPostSummaryFlow = ai.defineFlow(
  {
    name: 'generateBlogPostSummaryFlow',
    inputSchema: GenerateBlogPostSummaryInputSchema,
    outputSchema: GenerateBlogPostSummaryOutputSchema,
  },
  async (input) => {
    const { output } = await generateBlogPostSummaryPrompt(input);
    return output!;
  }
);
