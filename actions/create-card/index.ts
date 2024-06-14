'use server';

import type { InputeType, ReturnType } from './types';

import { CreateCard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { post } from '@/app/api/connection';
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

    const { title, boardId, listId } = data;

    // let card;

    try {
        const response = await post<ResultType>({
            path: '/kanban/card',
            data: {
                title: title,
                column: listId,
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

export const createCard = createSafeAction(CreateCard, handler);
