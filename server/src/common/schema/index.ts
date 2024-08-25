import { z } from 'zod';

export const zC = {
  numericString: z
    .string()
    .regex(/^\d+$/, 'Must be a numeric string')
    .transform((arg) => +arg),
} as const;
