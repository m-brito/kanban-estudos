'use client';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import { useRef, useState } from 'react';

import { CardForm } from './card-form';
import { CardItem } from './card-item';
import type { ElementRef } from 'react';
import { KanbanColumn } from '../types';
import { ListHeader } from './list-header';
import { cn } from '@/lib/utils';

interface ListItemProps {
    data: KanbanColumn;
    index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
    // console.log(data)
    const textareaRef = useRef<ElementRef<'textarea'>>(null);
    const [isEditing, setIsEditing] = useState(false);

    const disableEditing = () => {
        setIsEditing(false);
    };

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();
        });
    };

    return (
        <Draggable draggableId={'i' + data.id.toString()} index={index}>
            {provided => (
                <li
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="h-full w-[272px] shrink-0 select-none"
                >
                    <div
                        {...provided.dragHandleProps}
                        className=" w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"
                    >
                        <ListHeader onAddCard={enableEditing} data={data} />
                        <Droppable droppableId={data.id.toString()} type="card">
                            {provided => (
                                <ol
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={cn(
                                        'mx-1 flex flex-col gap-y-2 px-1 py-0.5',
                                        data.items.length > 0 ? 'mt-2' : 'mt-0',
                                    )}
                                >
                                    {data.items.map((card, index) => (
                                        <CardItem
                                            key={card.id}
                                            index={index}
                                            data={card}
                                        />
                                    ))}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                        <CardForm
                            ref={textareaRef}
                            listId={data.id.toString()}
                            isEditing={isEditing}
                            enableEditing={enableEditing}
                            disableEditing={disableEditing}
                        />
                    </div>
                </li>
            )}
        </Draggable>
    );
};
