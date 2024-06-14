'use client';

import type { ElementRef, KeyboardEventHandler } from 'react';
import { Plus, X } from 'lucide-react';
import { forwardRef, useRef } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { createCard } from '@/actions/create-card';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';
import { useParams } from 'next/navigation';

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
    ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
        const params = useParams();
        const formRef = useRef<HTMLFormElement>(null); // Adjusted ref type
        const { execute, fieldErrors } = useAction(createCard, {
            onSuccess: data => {
                // toast.success(`Card "${data.title}" created`);
                toast.success(`Card created`);
                formRef.current?.reset();
            },
            onError: error => {
                toast.error(error);
            },
        });

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') disableEditing();
        };

        useOnClickOutside(formRef, disableEditing);
        useEventListener('keydown', onKeyDown);

        const onTextareaKeyDown: KeyboardEventHandler<
            HTMLTextAreaElement
        > = e => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                formRef.current?.requestSubmit();
            }
        };

        const onSubmit = (formData: FormData) => {
            const title = formData.get('title') as string;
            const formListId = formData.get('listId') as string; // Rename to avoid conflict with prop
            const boardId = params.boardId as string;

            execute({ title, listId: formListId, boardId });
        };

        if (isEditing) {
            return (
                <form
                    ref={formRef}
                    onSubmit={e => {
                        e.preventDefault(); // Prevent default form submission
                        onSubmit(new FormData(e.target as HTMLFormElement));
                    }}
                    className="m-1 space-y-4 px-1 py-0.5"
                >
                    <FormTextarea
                        id="title"
                        onKeyDown={onTextareaKeyDown}
                        ref={ref}
                        placeholder="Enter a title for this card..."
                        errors={fieldErrors}
                        defaultValue="" // Ensure defaultValue is set
                    />
                    <input
                        type="hidden"
                        id="listId"
                        name="listId"
                        value={listId}
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>Add card</FormSubmit>
                        <Button
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            );
        }

        return (
            <div className="px-2 pt-2">
                <Button
                    onClick={enableEditing}
                    className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
                    size="sm"
                    variant="ghost"
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add a card
                </Button>
            </div>
        );
    },
);

CardForm.displayName = 'CardForm';
