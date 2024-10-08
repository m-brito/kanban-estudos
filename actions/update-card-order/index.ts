'use server';

import { InputeType, ReturnType } from './types';

import { UpdateCardOrder } from './schema';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { revalidatePath } from 'next/cache';

const handler = async (data: InputeType): Promise<ReturnType> => {
    // const { userId, orgId } = auth();

    // if (!userId || !orgId) {
    //     return {
    //         error: 'Unauthorized',
    //     };
    // }

    const { items, boardId } = data;

    let updatedCards;

    // try {
    //     const transaction = items.map(card =>
    //         db.card.update({
    //             where: {
    //                 id: card.id,
    //                 list: {
    //                     board: {
    //                         orgId,
    //                     },
    //                 },
    //             },
    //             data: {
    //                 order: card.order,
    //                 listId: card.listId,
    //             },
    //         }),
    //     );
    //     updatedCards = await db.$transaction(transaction);
    // } catch (error) {
    //     return { error: 'Failed to reorder.' };
    // }

    // revalidatePath(`/board/${boardId}`);
    // return { data: updatedCards };
    return { error: 'Failed to reorder.' };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
