import type { ActionState } from '@/lib/create-safe-atcion';
import { Board } from '../../types';
import { DeleteBoard } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputeType, Board>;
