import type { ActionState } from '@/lib/create-safe-atcion';
import { DeleteList } from './schema';
import { List } from '../../types';
import { z } from 'zod';

export type InputeType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputeType, List>;
