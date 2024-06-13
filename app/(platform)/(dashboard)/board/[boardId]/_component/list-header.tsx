'use client';

import { useRef, useState } from 'react';

import type { ElementRef } from 'react';
import { FormInput } from '@/components/form/form-input';
import { KanbanColumn } from '../types';
import { ListOptions } from './list-options';
import { toast } from 'sonner';
import { updateList } from '@/actions/update-list';
import { useAction } from '@/hooks/use-action';
import { useEventListener } from 'usehooks-ts';

interface ListHeaderProps {
    data: KanbanColumn;
    onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
    const [title, setTitle] = useState(data.name);
    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        });
    };

    const disableEditing = () => {
        setIsEditing(false);
    };

    const { execute } = useAction(updateList, {
        onSuccess: data => {
            toast.success(`Renamed to "${data.title}"`);
            setTitle(data.title);
            disableEditing();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const handleSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        if (title === data.name) return disableEditing();

        execute({ title, boardId, id });
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            formRef.current?.requestSubmit();
        }
    };

    useEventListener('keydown', onKeyDown);

    return (
        <div className=" flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
            {isEditing ? (
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="flex-1 px-[2px]"
                >
                    <input hidden id="id" name="id" value={data.id} />
                    <input hidden id="boardId" name="boardId" value={data.id} />
                    <FormInput
                        id="title"
                        placeholder="Enter list title..."
                        ref={inputRef}
                        onBlur={onBlur}
                        defaultValue={title}
                        className="h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
                    />
                    <button type="submit" hidden />
                </form>
            ) : (
                <div
                    onClick={enableEditing}
                    className=" h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
                >
                    {title}
                </div>
            )}
            {/* <ListOptions onAddCard={onAddCard} data={data} /> */}
        </div>
    );
};
