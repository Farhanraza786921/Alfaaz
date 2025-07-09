// use server'

/**
 * @fileOverview Generates a 4-line Shayari (poem) in Hindi/Urdu based on a user-selected category.
 *
 * - generateShayari - A function that generates Shayari.
 * - GenerateShayariInput - The input type for the generateShayari function.
 * - GenerateShayariOutput - The return type for the generateShayari function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShayariInputSchema = z.object({
  category: z
    .enum(['Love', 'Sad', 'Dard', 'Attitude', 'Funny'])
    .describe('The category of the Shayari.'),
});
export type GenerateShayariInput = z.infer<typeof GenerateShayariInputSchema>;

const GenerateShayariOutputSchema = z.object({
  shayari: z.string().describe('The generated Shayari in Hindi/Urdu.'),
});
export type GenerateShayariOutput = z.infer<typeof GenerateShayariOutputSchema>;

export async function generateShayari(input: GenerateShayariInput): Promise<GenerateShayariOutput> {
  return generateShayariFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShayariPrompt',
  input: {schema: GenerateShayariInputSchema},
  output: {schema: GenerateShayariOutputSchema},
  prompt: `You are an AI poet specializing in Hindi/Urdu Shayari.

  Generate a 4-line Shayari based on the following category:

  Category: {{{category}}}

  The Shayari should evoke the emotion associated with the category.`,
});

const generateShayariFlow = ai.defineFlow(
  {
    name: 'generateShayariFlow',
    inputSchema: GenerateShayariInputSchema,
    outputSchema: GenerateShayariOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
