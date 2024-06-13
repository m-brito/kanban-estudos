import type { ActionState } from '@/lib/create-safe-atcion';
import { List } from '../../types';
import { UpdateList } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof UpdateList>;
export type ReturnType = ActionState<InputeType, List>;
