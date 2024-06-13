import type { ActionState } from '@/lib/create-safe-atcion';
import { List } from '../../types';
import { UpdateListOrder } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof UpdateListOrder>;
export type ReturnType = ActionState<InputeType, List[]>;
