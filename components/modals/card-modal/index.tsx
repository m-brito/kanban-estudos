'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';

import { Actions } from './actions';
import { Activity } from './activity';
import { AuditLog } from '@/types';
import { CompleteKanbanItem } from '@/app/(platform)/(dashboard)/board/[boardId]/types';
import { Description } from './description';
import { Header } from './header';
import { fetcher } from '@/lib/fetcher';
import { get } from '@/app/api/connection';
import { useCardModal } from '@/hooks/use-card-modal';
import { useQuery } from '@tanstack/react-query';

interface KanbanItemResponse {
    message: {
        item: CompleteKanbanItem;
    };
}

export const CardModal = () => {
    const id = useCardModal(state => state.id);
    const isOpen = useCardModal(state => state.isOpen);
    const onClose = useCardModal(state => state.onClose);

    const [cardData, setCardData] = useState<KanbanItemResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            const fetchCardData = async () => {
                setIsLoading(true);
                const data = await get<KanbanItemResponse>(`kanban/card/${id}`);
                setCardData(data);
                setIsLoading(false);
            };

            fetchCardData();
        }
    }, [id]);

    const { data: auditLogData } = useQuery<AuditLog[]>({
        queryKey: ['card-logs', id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`),
        enabled: !!id,
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                {isLoading || !cardData ? (
                    <Header.Skeleton />
                ) : (
                    <Header data={cardData.message.item} />
                )}
                <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
                    <div className="col-span-3">
                        <div className="w-full space-y-6">
                            {isLoading || !cardData ? (
                                <Description.Skeleton />
                            ) : (
                                <Description data={cardData.message.item} />
                            )}
                            {auditLogData ? (
                                <Activity items={auditLogData} />
                            ) : (
                                <Activity.Skeleton />
                            )}
                        </div>
                    </div>
                    {/* {isLoading || !cardData ? (
                        <Actions.Skeleton />
                    ) : (
                        <Actions data={cardData.message.item} />
                    )} */}
                </div>
            </DialogContent>
        </Dialog>
    );
};
