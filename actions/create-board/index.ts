'use server';

import type { InputeType, ReturnType } from './types';
import { hasAvailableCount, incrementAvailableCount } from '@/lib/org-limit';

import { CreateBoard } from './schema';
import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-atcion';
import { post } from '@/app/api/connection';
import { revalidatePath } from 'next/cache';

interface MessageResponse {
    message: string;
    error?: string;
}

const handler = async (data: InputeType): Promise<ReturnType> => {
    const { title, image } = data;
    const [imageId, imageThunbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
        image.split('|');

    if (
        !imageId ||
        !imageThunbUrl ||
        !imageFullUrl ||
        !imageLinkHTML ||
        !imageUserName
    ) {
        return { error: 'Missing fields. Failed to create board.' };
    }

    try {
        const response = await post<MessageResponse>({
            path: '/kanban/kanban',
            data: {
                name: title,
                imagem: imageFullUrl
            },
        });
        revalidatePath('/boards');

        return { data: response };
    } catch (e) {
        return { error: 'Error.' };
    }

};

export const createBoard = createSafeAction(CreateBoard, handler);
