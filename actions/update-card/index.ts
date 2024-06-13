'use server';

import type { InputeType, ReturnType } from './types';

import { UpdateCard } from './schema';
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

    const { id, boardId, ...values } = data;

    let card;

    // try {
    //     card = await db.card.update({
    //         where: {
    //             id,
    //             list: {
    //                 board: {
    //                     orgId,
    //                 },
    //             },
    //         },
    //         data: {
    //             ...values,
    //         },
    //     });
    //     await createAuditLog({
    //         entityId: card.id,
    //         entityTitle: card.title,
    //         entityType: ENTITY_TYPE.CARD,
    //         action: ACTION.UPDATE,
    //     });
    // } catch (error) {
    //     return { error: 'Failed to update.' };
    // }

    // revalidatePath(`/board/${boardId}`);
    // return { data: card };
    return { error: 'Failed to update.' };
};

export const updateCard = createSafeAction(UpdateCard, handler);
