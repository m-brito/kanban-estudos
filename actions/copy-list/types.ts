import type { ActionState } from '@/lib/create-safe-atcion';
import { CopyList } from './schema';
import { List } from '../../types';
import { z } from 'zod';

export type InputeType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputeType, List>;
