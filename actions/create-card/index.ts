'use server';

import type { InputeType, ReturnType } from './types';

import { CreateCard } from './schema';
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

    // const { title, boardId, listId } = data;

    // let card;

    // try {
    //     const list = await db.list.findUnique({
    //         where: {
    //             id: listId,
    //             board: { orgId },
    //         },
    //     });

    //     if (!list) {
    //         return { error: 'List not found' };
    //     }

    //     const lastCard = await db.card.findFirst({
    //         where: { listId },
    //         orderBy: { order: 'desc' },
    //         select: { order: true },
    //     });

    //     const newOrder = lastCard ? lastCard.order + 1 : 1;

    //     card = await db.card.create({
    //         data: {
    //             title,
    //             listId,
    //             order: newOrder,
    //         },
    //     });

    //     await createAuditLog({
    //         entityId: card.id,
    //         entityTitle: card.title,
    //         entityType: ENTITY_TYPE.CARD,
    //         action: ACTION.CREATE,
    //     });
    // } catch (error) {
    //     return { error: 'Failed to create.' };
    // }

    // revalidatePath(`/board/${boardId}`);
    // return { data: card };
    return { error: 'Failed to create.' };
};

export const createCard = createSafeAction(CreateCard, handler);
