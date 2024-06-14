'use client';

import { Draggable } from '@hello-pangea/dnd';
import { KanbanItem } from '../types';
import { useCardModal } from '@/hooks/use-card-modal';

interface CardItemProps {
    data: KanbanItem;
    index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
    const cardModal = useCardModal();
    return (
        <Draggable draggableId={'i' + data.id.toString()} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    role="button"
                    onClick={() => cardModal.onOpen(data.id.toString())}
                    className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
                >
                    {data.title}
                </div>
            )}
        </Draggable>
    );
};
