'use server';

import { InputeType, ReturnType } from './types';

import { UpdateListOrder } from './schema';
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

    let lists;

    // try {
    //     const transaction = items.map(list =>
    //         db.list.update({
    //             where: {
    //                 id: list.id,
    //                 board: {
    //                     orgId,
    //                 },
    //             },
    //             data: {
    //                 order: list.order,
    //             },
    //         }),
    //     );
    //     lists = await db.$transaction(transaction);
    // } catch (error) {
    //     return { error: 'Failed to reorder.' };
    // }

    // revalidatePath(`/board/${boardId}`);
    // return { data: lists };
    return { error: 'Failed to reorder.' };
};

export const updateListOrder = createSafeAction(UpdateListOrder, handler);
