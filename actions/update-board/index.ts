'use server';

import type { InputeType, ReturnType } from './types';

import { UpdateBoard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { revalidatePath } from 'next/cache';

const handler = async (data: InputeType): Promise<ReturnType> => {
    // const { userId, orgId } = auth();

    // if (!userId || !orgId) {
    //     return {
    //         error: 'Unauthorized',
    //     };
    // }

    const { title, id } = data;

    let board;

    // try {
    //     board = await db.board.update({
    //         where: {
    //             id,
    //             orgId,
    //         },
    //         data: {
    //             title,
    //         },
    //     });
    //     await createAuditLog({
    //         entityId: board.id,
    //         entityTitle: board.title,
    //         entityType: ENTITY_TYPE.LIST,
    //         action: ACTION.UPDATE,
    //     });
    // } catch (error) {
    //     return { error: 'Failed to update.' };
    // }

    // revalidatePath(`/board/${id}`);
    // return { data: board };
    return { error: 'Failed to update.' };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
