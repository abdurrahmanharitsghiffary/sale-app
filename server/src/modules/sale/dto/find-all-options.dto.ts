import { zC } from 'src/common/schema';
import { z } from 'zod';

export const findAllOptionsSchema = z.object({
  limit: zC.numericString.optional(),
  page: zC.numericString
    .refine((arg) => arg > 0, { message: 'Page must be higher than 0' })
    .optional(),
  sort_by: z.enum(['ASC', 'DESC']).optional(),
  order_by: z.string().optional(),
  search: z.string().optional(),
});

export type FindAllOptionsSchema = z.infer<typeof findAllOptionsSchema>;

export class FindAllOptionsDto {
  limit: number;
  page: number;
  sort_by: 'ASC' | 'DESC';
  order_by: string;
  search: string;
}
