'use client';

import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
    Activity,
    CalendarDays,
    CreditCard,
    Layout,
    Settings,
} from 'lucide-react';
import { redirect, usePathname, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type Item = {
    slug: string;
    icon: ReactNode;
    name: string;
    route?: string;
    routes?: MenuItem[];
};

interface MenuItem {
    label: string;
    icon: ReactNode;
    href: string;
}

interface NavItemProps {
    isActive: boolean;
    isExpanded: boolean;
    item: Item;
    onExpand: (id: string) => void;
}

export const NavItem = ({
    isActive,
    isExpanded,
    item,
    onExpand,
}: NavItemProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const onClick = (href: string) => {
        router.push(href);
    };
    return (
        <AccordionItem value={item.name} className="border-none">
            {item.routes ? (
                <>
                    <AccordionTrigger
                        onClick={() => onExpand(item.name)}
                        className={cn(
                            'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
                            isActive &&
                                !isExpanded &&
                                'bg-sky-500/10 text-sky-700',
                        )}
                    >
                        <div className="flex items-center gap-x-2">
                            <div className="relative h-7 w-7">{item.icon}</div>
                            <span className="text-sm font-medium">
                                {item.name}
                            </span>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-1 text-neutral-700">
                        {item.routes.map(route => (
                            <Button
                                key={route.href}
                                size="sm"
                                onClick={() => onClick(route.href)}
                                className={cn(
                                    'mb-1 w-full justify-start pl-10 font-normal',
                                    pathname === route.href &&
                                        'bg-sky-500/10 text-sky-700',
                                )}
                                variant="ghost"
                            >
                                {route.icon}
                                {route.label}
                            </Button>
                        ))}
                    </AccordionContent>
                </>
            ) : (
                <AccordionTrigger
                    onClick={() => onClick(item.route ?? '/not-found')}
                    className={cn(
                        'flex items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
                        isActive && !isExpanded && 'bg-sky-500/10 text-sky-700',
                    )}
                >
                    <div className="flex items-center gap-x-2">
                        <div className="relative h-7 w-7">{item.icon}</div>
                        <span className="text-sm font-medium">{item.name}</span>
                    </div>
                </AccordionTrigger>
            )}
        </AccordionItem>
    );
};

NavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="relative h-10 w-10 shrink-0">
                <Skeleton className="absolute h-full w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
};
