import { useRef, useState } from 'react';

import type { ElementRef } from 'react';
import { FormInput } from '@/components/form/form-input';
import { KanbanColumn } from '../types';
import { ListOptions } from './list-options';
import { deleteList } from '@/actions/delete-list';
import { toast } from 'sonner';
import { updateList } from '@/actions/update-list';
import { useAction } from '@/hooks/use-action';

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

    const { execute: executeUpdate } = useAction(updateList, {
        onSuccess: updatedData => {
            // toast.success(`Renamed to "${updatedData.title}"`);
            toast.success(`Renamed to list`);
            // setTitle(updatedData.title);
            disableEditing();
            // window.location.reload();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: updatedData => {
            toast.success(`Deleted list"`);
            disableEditing();
        },
        onError: error => {
            toast.error(error);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title') as string;
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        if (title === data.name) {
            disableEditing();
            return;
        }

        setTitle(title);

        executeUpdate({ title, boardId, id });
    };

    const handleDeleteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        console.log(id);

        executeDelete({ boardId, id });
    };

    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    return (
        <div className="flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
            {isEditing ? (
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex-1 px-[2px]"
                >
                    <input type="hidden" id="id" name="id" value={data.id} />
                    <input
                        type="hidden"
                        id="boardId"
                        name="boardId"
                        value={data.idKanban}
                    />
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
                    className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium"
                >
                    {title}
                </div>
            )}
            <ListOptions onAddCard={onAddCard} data={data} />
        </div>
    );
};
