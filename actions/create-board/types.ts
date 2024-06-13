import type { ActionState } from '@/lib/create-safe-atcion';
import { CreateBoard } from './schema';
import { Nullable } from 'unsplash-js/dist/helpers/typescript';
import { z } from 'zod';

export type InputeType = z.infer<typeof CreateBoard>;

interface ResultType {
    message?: string;
    error?: string;
}

export type ReturnType = ActionState<InputeType, ResultType>;

