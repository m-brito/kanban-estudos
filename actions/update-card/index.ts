'use server';

import type { InputeType, ReturnType } from './types';

import { UpdateCard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { patch } from '@/app/api/connection';
import { revalidatePath } from 'next/cache';

interface ResultType {
    message?: any;
    error?: string;
}

const handler = async (data: InputeType): Promise<ReturnType> => {
    // const { userId, orgId } = auth();

    // if (!userId || !orgId) {
    //     return {
    //         error: 'Unauthorized',
    //     };
    // }

    const { id, boardId, title, description } = data;

    let card;

    try {
        const response = await patch<ResultType>({
            path: `/kanban/card/${id}`,
            data: {
                title: title,
                textDescription: description,
            },
        });
        revalidatePath(`/boards/${boardId}`);

        return { data: response };
    } catch (e) {
        return { error: 'Error.' };
    }

    // revalidatePath(`/board/${boardId}`);
    // return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
