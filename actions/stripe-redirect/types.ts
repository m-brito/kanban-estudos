import type { ActionState } from '@/lib/create-safe-atcion';
import { StripeRedirect } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof StripeRedirect>;
export type ReturnType = ActionState<InputeType, string>;
