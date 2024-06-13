'use client';

import { Plus, X } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { ElementRef } from 'react';
import { FormInput } from '@/components/form/form-input';
import { FormSubmit } from '@/components/form/form-submit';
import { ListWrapper } from './list-wrapper';
import { createList } from '@/actions/create-list';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';

export const ListForm = () => {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<HTMLFormElement>(null); // Adjusted type here
    const inputRef = useRef<HTMLInputElement>(null); // Adjusted type here

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" created`);
            disableEditing();
            router.refresh();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    };

    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const boardId = formData.get('boardId') as string;

        execute({ title, boardId });
    };

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    onSubmit={e => {
                        e.preventDefault(); // Prevent default form submission
                        onSubmit(new FormData(e.target as HTMLFormElement));
                    }}
                    ref={formRef}
                    className="w-full space-y-4 rounded-md bg-white p-3 shadow-md"
                >
                    <FormInput
                        ref={inputRef}
                        errors={fieldErrors}
                        id="title"
                        className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
                        placeholder="Enter list title..."
                        defaultValue="" // Ensure defaultValue is set correctly
                    />
                    <input
                        type="hidden"
                        value={params.boardId}
                        name="boardId"
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add list</FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        );
    }

    return (
        <ListWrapper>
            <button
                className="flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
                onClick={enableEditing}
            >
                <Plus className="mr-2 h-4 w-4" />
                Add a list
            </button>
        </ListWrapper>
    );
};
