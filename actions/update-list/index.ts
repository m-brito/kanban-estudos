'use server';

import type { InputeType, ReturnType } from './types';

import { UpdateList } from './schema';
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

    const { title, id, boardId } = data;

    try {
        console.log(title)
        const response = await patch<ResultType>({
            path: `/kanban/column/${id}`,
            data: {
                name: title,
            },
        });
        revalidatePath(`/board/${boardId}`);
        return { data: response };
    } catch (error) {
        return { error: 'Failed to update.' };
    }

    // return { error: 'Failed to update.' };
};

export const updateList = createSafeAction(UpdateList, handler);
