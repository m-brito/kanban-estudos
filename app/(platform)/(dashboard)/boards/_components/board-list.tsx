import { HelpCircle, User2 } from 'lucide-react';

import { FormPopover } from '@/components/form/form-popover';
import { Hint } from '@/components/hint';
import Link from 'next/link';
import { MAX_FREE_BOARD } from '@/constants/boards';
import { Skeleton } from '@/components/ui/skeleton';
import { gatAvailableCount } from '@/lib/org-limit';
import { get } from '@/app/api/connection';
import { redirect } from 'next/navigation';

interface Kanban {
    id: number;
    name: string;
    idMemberCreator: number;
    imagem: string;
}

interface KanbanResponse {
    kanbans: Kanban[];
    message: string;
}

export const BoardList = async () => {
    // const { orgId } = auth();

    // if (!orgId) return redirect('/select-org');

    // const boards = await db.board.findMany({
    //     where: { orgId },
    //     orderBy: { createdAt: 'desc' },
    // });
    const boards = await get<KanbanResponse>('/kanban/kanban');

    const availableCount = await gatAvailableCount();

    return (
        <div className="space-y-4">
            <div className="flex items-center text-lg font-semibold text-neutral-700">
                <User2 className="mr-2 h-6 w-6" />
                Your Boards
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {boards.kanbans.map(board => (
                    <Link
                        key={board.id}
                        href={`/board/${board.id}`}
                        className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
                        style={{
                            backgroundImage: `url(${board.imagem})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
                        <p className="relative font-semibold text-white">
                            {board.name}
                        </p>
                    </Link>
                ))}
                <FormPopover sideOffset={10} side="right">
                    <div
                        role="button"
                        className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
                    >
                        <p className="text-sm">Create New Board</p>
                        <span className="text-xs">Unlimited</span>
                        <Hint
                            sideOffset={40}
                            description={`Free Workspace can have up to 5 open boards> For unlimited boards upgrade this workspaces.`}
                        >
                            <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                        </Hint>
                    </div>
                </FormPopover>
            </div>
        </div>
    );
};

BoardList.Skeleton = function SkeletonBoardList() {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
        </div>
    );
};
