'use client';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';

import { KanbanColumn } from '../types';
import { ListForm } from './list-form';
import { ListItem } from './list-item';
import { toast } from 'sonner';
import { updateCardOrder } from '@/actions/update-card-order';
import { updateListOrder } from '@/actions/update-list-order';
import { useAction } from '@/hooks/use-action';

interface ListContainerProps {
    data: KanbanColumn[];
    boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: () => {
            toast.success('List reordered');
        },
        onError: error => {
            toast.error(error);
        },
    });

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: () => {
            toast.success('Card reordered');
        },
        onError: error => {
            toast.error(error);
        },
    });

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        // console.log(!destination)
        // console.log(destination.droppabledId === source.droppabledId)
        // console.log(destination.index === source.index)

        if (!destination) return;

        // if dropped in the same position
        if (
            destination.droppabledId === source.droppabledId &&
            destination.index === source.index
        ) {
            return;
        }

        // if user moves a list
        if (type === 'list') {
            const items = reorder(
                orderedData,
                source.index,
                destination.index,
            ).map((item, index) => ({ ...item, order: index }));
            setOrderedData(items);

            // executeUpdateListOrder({ items, boardId });
        }

        // if user moves a card
        if (type === 'card') {
            let newOrderedData = [...orderedData];

            // Source and destination list
            const sourceList = newOrderedData.find(
                list => list.id === source.droppableId,
            );
            const destList = newOrderedData.find(
                list => list.id === destination.droppableId,
            );

            if (!sourceList || !destList) return;

            // Check if cards exists on the sourceList
            if (!sourceList.items) sourceList.items = [];

            // Check if cards exists on the destList
            if (!destList.items) destList.items = [];

            // Moving the card in the same list
            if (source.droppableId === destination.droppableId) {
                const reorderedCards = reorder(
                    sourceList.items,
                    source.index,
                    destination.index,
                );

                reorderedCards.forEach((card, idx) => {
                    card.order = idx;
                });
                sourceList.items = reorderedCards;
                setOrderedData(newOrderedData);
                // executeUpdateCardOrder({
                //     boardId,
                //     items: reorderedCards,
                // });
                // User moves the card to another list
            } else {
                // Remove card from the source list
                const [movedCard] = sourceList.items.splice(source.index, 1);

                // Assign the new listId to the moved card
                movedCard.id = destination.droppableId;

                // Add card to the destination list
                destList.items.splice(destination.index, 0, movedCard);

                sourceList.items.forEach((card, idx) => {
                    card.order = idx;
                });

                // Update the order for each card in the destionation list
                destList.items.forEach((card, idx) => {
                    card.order = idx;
                });

                setOrderedData(newOrderedData);
                // executeUpdateCardOrder({
                //     boardId,
                //     items: destList.cards,
                // });
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="lists" type="list" direction="horizontal">
                {provided => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex h-full gap-x-3"
                    >
                        {orderedData.map((list, index) => (
                            <ListItem key={list.id} index={index} data={list} />
                        ))}
                        {provided.placeholder}
                        <ListForm />
                        <div className="w-1 flex-shrink-0" />
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    );
};
