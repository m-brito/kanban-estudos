'use server';

import type { InputeType, ReturnType } from './types';

import { DeleteBoard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { decreaseAvailableCount } from '@/lib/org-limit';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const handler = async (data: InputeType): Promise<ReturnType> => {
    // const { userId, orgId } = auth();

    // if (!userId || !orgId) {
    //     return {
    //         error: 'Unauthorized',
    //     };
    // }

    const { id } = data;

    let board;

    try {
        // board = await db.board.delete({
        //     where: {
        //         id,
        //         orgId,
        //     },
        // });
        // if (!isPro) {
        //     await decreaseAvailableCount();
        // }

    } catch (error) {
        return { error: 'Failed to delete.' };
    }
    return { error: 'Failed to delete.' };
    // revalidatePath(`/organization/${orgId}`);
    // redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
