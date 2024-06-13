import type { ActionState } from '@/lib/create-safe-atcion';
import { Board } from '../../types';
import { UpdateBoard } from './schema';
import { z } from 'zod';

export type InputeType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputeType, Board>;
