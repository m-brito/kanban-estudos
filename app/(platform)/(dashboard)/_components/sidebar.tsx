'use client';

import { CalendarDays, Plus } from 'lucide-react';

import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Item } from '@radix-ui/react-accordion';
import Link from 'next/link';
import { NavItem } from './nav-item';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useLocalStorage } from 'usehooks-ts';

interface SidebarProps {
    storageKey?: string;
}

export const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
        storageKey,
        {},
    );
    // const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    //     useOrganization();
    // const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    //     userMemberships: { infinite: true },
    // });

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
        (acc: string[], key: string) => {
            if (expanded[key]) {
                acc.push(key);
            }
            return acc;
        },
        [],
    );
    const onExpand = (id: string) => {
        setExpanded(curr => ({ ...curr, [id]: !expanded[id] }));
    };

    // if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    //     return (
    //         <>
    //             <div className="mb-2 flex items-center justify-between">
    //                 <Skeleton className="h-10 w-[50%]" />
    //                 <Skeleton className="h-10 w-10" />
    //             </div>
    //             <div className="space-y-2">
    //                 <NavItem.Skeleton />
    //                 <NavItem.Skeleton />
    //                 <NavItem.Skeleton />
    //             </div>
    //         </>
    //     );
    // }
    return (
        <>
            <div className="mb-1 flex items-center text-xs font-medium">
                <span className="pl-4">Menu</span>
                {/* <Button
                    asChild
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="ml-auto"
                >
                    <Link href="/select-org">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button> */}
            </div>
            <Accordion
                type="multiple"
                defaultValue={defaultAccordionValue}
                className="space-y-2"
            >
                <NavItem
                    isActive={true}
                    isExpanded={expanded['Calendario']}
                    item={{
                        slug: 'Calendario',
                        icon: <CalendarDays />,
                        name: 'Calendario',
                        route: '/calendario',
                    }}
                    onExpand={onExpand}
                />
                {/* {userMemberships.data.map(({ organization }) => {
                    // console.log(userMemberships)
                    return (
                        <NavItem
                            key={organization.id}
                            isActive={
                                activeOrganization?.id === organization.id
                            }
                            isExpanded={expanded[organization.id]}
                            organization={organization as Organization}
                            onExpand={onExpand}
                        />
                    );
                })} */}
            </Accordion>
        </>
    );
};
