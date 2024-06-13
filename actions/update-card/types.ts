import type { ActionState } from '@/lib/create-safe-atcion';
import { Card } from '../../types';
import { UpdateCard } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputeType, Card>;
