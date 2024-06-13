import type { ActionState } from '@/lib/create-safe-atcion';
import { Card } from '../../types';
import { CreateCard } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof CreateCard>;
export type ReturnType = ActionState<InputeType, Card>;
