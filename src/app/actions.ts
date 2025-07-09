'use server';

import { generateShayari } from '@/ai/flows/generate-shayari';
import { z } from 'zod';

const formSchema = z.object({
  category: z.enum(['Love', 'Sad', 'Dard', 'Attitude', 'Funny']),
});

interface ActionState {
  shayari?: string;
  error?: string;
}

export async function handleGenerateShayari(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const rawFormData = {
      category: formData.get('category'),
    };

    const validatedFields = formSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return { error: 'Invalid category selected. Please try again.' };
    }
    
    const result = await generateShayari({ category: validatedFields.data.category });

    if (result?.shayari) {
      return { shayari: result.shayari };
    } else {
      return { error: 'Failed to generate Shayari. The AI may be sleeping.' };
    }
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `An unexpected error occurred: ${errorMessage}` };
  }
}
