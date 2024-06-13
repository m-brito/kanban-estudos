'use client';

import { Copy, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { copyCard } from '@/actions/copy-card';
import { deleteCard } from '@/actions/delete-card';
import { error } from 'console';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';
import { useCardModal } from '@/hooks/use-card-modal';
import { useParams } from 'next/navigation';

interface ActionsProps {
    data: Card;
}

export const Actions = ({ data }: ActionsProps) => {
    const params = useParams();
    const cardModal = useCardModal();
    const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
        copyCard,
        {
            onSuccess: data => {
                toast.success(`Card "${data.title}" copied`);
                cardModal.onClose();
            },
            onError: error => {
                toast.error(error);
            },
        },
    );
    const { execute: executeDeleteCard, isLoading: isLoadingDelete } =
        useAction(deleteCard, {
            onSuccess: data => {
                toast.success(`Card "${data.title}" deleted`);
                cardModal.onClose();
            },
            onError: error => {
                toast.error(error);
            },
        });

    const onCopy = () => {
        const boardId = params.boardId as string;
        executeCopyCard({ id: data.id, boardId });
    };

    const onDelete = () => {
        const boardId = params.boardId as string;
        executeDeleteCard({ id: data.id, boardId });
    };

    return (
        <div className="mt-2 space-y-2">
            <p className="text-xs font-semibold">Actions</p>
            <Button
                onClick={onCopy}
                disabled={isLoadingCopy}
                variant="gray"
                className="w-full justify-start"
                size="inline"
            >
                <Copy className="mr-2 h-4 w-4" />
                Copy
            </Button>
            <Button
                onClick={onDelete}
                disabled={isLoadingDelete}
                variant="gray"
                className="w-full justify-start"
                size="inline"
            >
                <Trash className="mr-2 h-4 w-4" />
                Delete
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionSkeleton() {
    return (
        <div className="mt-2 space-y-2">
            <Skeleton className="h-4 w-20 bg-neutral-200" />
            <Skeleton className="h-8 w-full bg-neutral-200" />
            <Skeleton className="h-8 w-full bg-neutral-200" />
        </div>
    );
};
