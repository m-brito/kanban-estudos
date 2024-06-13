import type { ActionState } from '@/lib/create-safe-atcion';
import { Card } from '../../types';
import { DeleteCard } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputeType, Card>;
