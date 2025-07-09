'use server';

/**
 * @fileOverview Generates a 4-line Shayari (poem) in Hinglish based on a user-selected category.
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
  shayari: z.string().describe('The generated Shayari in Hinglish (Hindi and English mix).'),
});
export type GenerateShayariOutput = z.infer<typeof GenerateShayariOutputSchema>;

export async function generateShayari(input: GenerateShayariInput): Promise<GenerateShayariOutput> {
  return generateShayariFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShayariPrompt',
  input: {schema: GenerateShayariInputSchema},
  output: {schema: GenerateShayariOutputSchema},
  prompt: `Ek {{{category}}} category ki shayari Hinglish (Hindi + English mix) mein likho. Shayari sirf 4 lines ki ho, thodi rhyme ho aur dil se nikli ho. Har line mein emotional ya attitude wala feel ho. Sirf shayari likho, bina kisi explanation ke.`,
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
