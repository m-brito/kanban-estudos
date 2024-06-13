'use client';

import { ElementRef, useEffect, useRef } from 'react';
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
}

export const LogoutPopover = ({
    children,
    side = 'bottom',
    align,
    sideOffset = 0,
}: FormPopoverProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);
    const { user, Logout } = useAuth();

    const handleLogout = () => {
        Logout();
        closeRef.current?.click();
    };

    useEffect(() => {
        if (!user) {
            window.location.href = '/';
        }
    }, [user]);

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent
                className="w-60 pt-3"
                align={align}
                side={side}
                sideOffset={sideOffset}
            >
                <div className=" pb-4 text-center text-sm font-medium text-neutral-600">
                    Deseja sair?
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
                        variant="ghost"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>
                <div className="space-y-4">
                    <Button
                        onClick={handleLogout}
                        className="w-full rounded-md bg-[#f15922] py-2 font-medium text-white hover:bg-[#f15922da] disabled:bg-red-500"
                    >
                        Logout
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};
