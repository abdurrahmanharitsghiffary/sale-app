import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().max(150),
  description: z.string(),
  price: z.number(),
});

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
}
