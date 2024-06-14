'use client';

import { useRef, useState } from 'react';

import { CompleteKanbanItem } from '@/app/(platform)/(dashboard)/board/[boardId]/types';
import type { ElementRef } from 'react';
import { FormInput } from '@/components/form/form-input';
import { Layout } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { updateCard } from '@/actions/update-card';
import { useAction } from '@/hooks/use-action';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

interface HeaderProps {
    data: CompleteKanbanItem;
}

export const Header = ({ data }: HeaderProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const { execute } = useAction(updateCard, {
        onSuccess: data => {
            // queryClient.invalidateQueries({ queryKey: ['card', data.id] });
            // queryClient.invalidateQueries({ queryKey: ['card-logs', data.id] });
            // toast.success(`Rename to "${data.title}"`);
            toast.success(`Rename to card`);
            // setTitle(data.title);
        },
        onError: error => {
            toast.error(error);
        },
    });

    const inputRef = useRef<ElementRef<'input'>>(null);
    const [title, setTitle] = useState(data.title);

    const onBlur = () => {
        inputRef.current?.form?.requestSubmit();
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const boardId = params.boardId as string;

        if (title === data.title) return;

        setTitle(data.title);

        execute({ title, boardId, id: data.id.toString() });
    };

    return (
        <div className="mb-6 flex w-full items-start gap-x-3">
            <Layout className="mt-1 h-5 w-5 text-neutral-700" />
            <div className="w-full">
                <form action={onSubmit}>
                    <FormInput
                        ref={inputRef}
                        onBlur={onBlur}
                        id="title"
                        defaultValue={title}
                        className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white"
                    />
                </form>
                <p className=" text-sm text-muted-foreground">
                    in list{' '}
                    <span className="underline">{data.column.toString()}</span>
                </p>
            </div>
        </div>
    );
};

Header.Skeleton = function HeaderSkeleton() {
    return (
        <div className="mb-6 flex items-start gap-x-3">
            <Skeleton className="mt-1 h-5 w-6 bg-neutral-200" />
            <div>
                <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
                <Skeleton className="h-4 w-12 bg-neutral-200" />
            </div>
        </div>
    );
};
