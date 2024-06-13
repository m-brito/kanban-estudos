import { KanbanColumn } from './types';
import { ListContainer } from './_component/list-container';
import { get } from '@/app/api/connection';
import { redirect } from 'next/navigation';
import { v4 as uuid } from 'uuid';

interface KanbanData {
    kanban: {
        id: number;
        name: string;
        imagem: string | null;
        idMemberCreator: string;
    };
    columns: KanbanColumn[];
    message: string;
}

interface BoardIdPageProps {
    params: {
        boardId: string;
    };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
    // const { orgId } = auth();
    // if (!orgId) redirect('/select-org');

    // const lists = await db.list.findMany({
    //     where: {
    //         boardId: params.boardId,
    //         board: { orgId },
    //     },
    //     include: {
    //         cards: {
    //             orderBy: {
    //                 order: 'asc',
    //             },
    //         },
    //     },
    //     orderBy: {
    //         order: 'asc',
    //     },
    // });

    const lists = await get<KanbanData>(`/kanban/kanban/${params.boardId}`);

    lists.columns.forEach((column, columnIndex) => {
        column.order = columnIndex;
        column.items.forEach((item, itemIndex) => {
            item.order = itemIndex;
        });
    });

    return (
        <div className="h-full overflow-x-auto p-4">
            <ListContainer boardId={params.boardId} data={lists.columns} />
        </div>
    );
};

export default BoardIdPage;
