'use server';

import type { InputeType, ReturnType } from './types';

import { CopyCard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { revalidatePath } from 'next/cache';

const handler = async (data: InputeType): Promise<ReturnType> => {
    // const { userId, orgId } = useAuth();

    // if (!userId || !orgId) {
    //     return {
    //         error: 'Unauthorized',
    //     };
    // }

    const { id, boardId } = data;

    let card;

    // try {
    // const cardToCopy = await db.card.findUnique({
    //     where: {
    //         id,
    //         list: {
    //             board: {
    //                 orgId,
    //             },
    //         },
    //     },
    // });

    // if (!cardToCopy) {
    //     return { error: 'Card not found' };
    // }

    // const lastCard = await db.card.findFirst({
    //     where: { listId: cardToCopy.listId },
    //     orderBy: { order: 'desc' },
    //     select: { order: true },
    // });

    // const newOrder = lastCard ? lastCard?.order + 1 : 1;

    // card = await db.card.create({
    //     data: {
    //         title: `${cardToCopy.title} - Copy`,
    //         description: cardToCopy.description,
    //         order: newOrder,
    //         listId: cardToCopy.listId,
    //     },
    // });

    // await createAuditLog({
    //     entityId: card.id,
    //     entityTitle: card.title,
    //     entityType: ENTITY_TYPE.CARD,
    //     action: ACTION.CREATE,
    // });
    // } catch (error) {
    //     return { error: 'Failed to copy.' };
    // }

    // revalidatePath(`/board/${boardId}`);
    // return { data: card };
    return { error: 'Failed to copy.' };

};

export const copyCard = createSafeAction(CopyCard, handler);
