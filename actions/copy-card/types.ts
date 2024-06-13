import type { ActionState } from '@/lib/create-safe-atcion';
import { Card } from '../../types';
import { CopyCard } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputeType, Card>;
