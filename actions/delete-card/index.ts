'use server';

import type { InputeType, ReturnType } from './types';

import { DeleteCard } from './schema';
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

    const { id, boardId } = data;

    let card;

    // try {
    //     card = await db.card.delete({
    //         where: {
    //             id,
    //             list: {
    //                 board: {
    //                     orgId,
    //                 },
    //             },
    //         },
    //     });
    //     await createAuditLog({
    //         entityId: card.id,
    //         entityTitle: card.title,
    //         entityType: ENTITY_TYPE.CARD,
    //         action: ACTION.DELETE,
    //     });
    // } catch (error) {
    //     return { error: 'Failed to delete.' };
    // }

    // revalidatePath(`/board/${boardId}`);
    // return { data: card };
    return { error: 'Failed to delete.' };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
