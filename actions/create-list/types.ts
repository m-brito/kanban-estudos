import type { ActionState } from '@/lib/create-safe-atcion';
import { CreateList } from './schema';
import { List } from '../../types';
import { z } from 'zod';

export type InputeType = z.infer<typeof CreateList>;
export type ReturnType = ActionState<InputeType, List>;
