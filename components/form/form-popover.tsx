'use client';

import { ElementRef, useRef } from 'react';
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { FormInput } from './form-input';
import { FormPicker } from './form-picker';
import { FormSubmit } from './form-submit';
import { X } from 'lucide-react';
import { createBoard } from '@/actions/create-board';
import { toast } from 'sonner';
import { useAction } from '@/hooks/use-action';
import { useProModal } from '@/hooks/use-pro-modal';
import { useRouter } from 'next/navigation';

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const FormPopover = ({
    children,
    side = 'bottom',
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const proModal = useProModal();
    const closeRef = useRef<ElementRef<'button'>>(null);
    const router = useRouter();

    const { execute, fieldErrors } = useAction(createBoard, {
        onSuccess: data => {
            console.log('sucesso');
            toast.success('Board created');
            closeRef.current?.click();
            // router.push(`/board/${data.id}`);
        },
        onError: error => {
            console.log('erro');
            toast.error(error);
            proModal.onOpen();
        },
    });

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const image = formData.get('image') as string;

        execute({ title, image });
    };
    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                className="w-80 pt-3"
                align={align}
                side={side}
                sideOffset={sideOffset}
            >
                <div className=" pb-4 text-center text-sm font-medium text-neutral-600">
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className="space-y-4">
                    <div className="space-y-4">
                        <FormPicker id="image" errors={fieldErrors} />
                        <FormInput
                            id="title"
                            label="Board title"
                            type="text"
                            errors={fieldErrors}
                        />
                    </div>
                    <FormSubmit className="w-full">Create</FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};
