import { ZodError, ZodIssue } from 'zod';

export class ZodValidationException extends ZodError {
  constructor(
    issues: ZodIssue[],
    public path: 'query' | 'body' | 'params',
  ) {
    super(issues);
  }
}
