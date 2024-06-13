'use server';

import type { InputeType, ReturnType } from './types';

import { CreateList } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { post } from '@/app/api/connection';
import { revalidatePath } from 'next/cache';

interface ResponseMessage {
    message: string;
    error?: string;
}

const handler = async (data: InputeType): Promise<ReturnType> => {
    // const { userId, orgId } = auth();

    // if (!userId || !orgId) {
    //     return {
    //         error: 'Unauthorized',
    //     };
    // }

    const { title, boardId } = data;

    // let list;

    try {
        const response = await post<ResponseMessage>({
            path: '/kanban/column',
            data: {
                name: title,
                idKanban: boardId
            },
        });
        revalidatePath(`/board/${boardId}`);
        return { data: response };
    } catch (error) {
        return { error: 'Failed to create.' };
    }

};

export const createList = createSafeAction(CreateList, handler);
