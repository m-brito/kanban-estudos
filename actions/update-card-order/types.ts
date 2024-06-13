import type { ActionState } from '@/lib/create-safe-atcion';
import { Card } from '../../types';
import { UpdateCardOrder } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputeType, Card[]>;
