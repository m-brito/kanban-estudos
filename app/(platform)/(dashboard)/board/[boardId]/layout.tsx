import { notFound, redirect } from 'next/navigation';

import { BoardNavbar } from './_component/board-navbar';
import { KanbanColumn } from './types';
import { get } from '@/app/api/connection';

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

export async function generateMetadata({
    params,
}: {
    params: { boardId: string };
}) {
    // const { orgId } = auth();
    // if (!orgId) return { title: 'Board' };

    // const board = await db.board.findUnique({
    //     where: { id: params.boardId, orgId },
    // });
    return { title: 'Board' };
}

const BoardIdLayout = async ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { boardId: string };
}) => {
    // const { orgId } = auth();
    // if (!orgId) return redirect('/select-ord');

    // const board = await db.board.findUnique({
    //     where: { id: params.boardId, orgId: '1' },
    // });
    const lists = await get<KanbanData>(`/kanban/kanban/${params.boardId}`);

    if (!lists) notFound();

    return (
        <div
            className="relative h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${lists.kanban.imagem})` }}
        >
            {/* <BoardNavbar data={board} /> */}
            <div className="absolute inset-0 bg-black/20" />
            <main className="relative h-full pt-28">{children}</main>
        </div>
    );
};

export default BoardIdLayout;
