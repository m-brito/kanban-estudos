'use client';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sidebar } from './sidebar';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { usePathname } from 'next/navigation';

export const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMount, setIsMount] = useState(false);

    const onOpen = useMobileSidebar(state => state.onOpen);
    const onClose = useMobileSidebar(state => state.onClose);
    const isOpen = useMobileSidebar(state => state.isOpen);

    useEffect(() => {
        setIsMount(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMount) return null;

    return (
        <>
            <Button
                onClick={onOpen}
                className="mr-2 block md:hidden"
                variant="ghost"
                size="sm"
            >
                <Menu className="h-4 w-4" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent side="left" className="p-2 pt-10">
                    <Sidebar storageKey="t-sidebar-mobile-state" />
                </SheetContent>
            </Sheet>
        </>
    );
};
