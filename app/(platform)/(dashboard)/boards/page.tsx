import { BoardList } from './_components/board-list';
import { Suspense } from 'react';
import { useAuth } from '@/app/context/AuthContext';

interface BoardIdPageProps {
    params: {
        organizationId: string;
    };
}

const OrganizationIdPage = async () => {
    // const { user } = useAuth();

    return (
        <div className="mb-20 w-full">
            <div className="px-2 md:px-4">
                <Suspense fallback={<BoardList.Skeleton />}>
                    <BoardList />
                </Suspense>
            </div>
        </div>
    );
};

export default OrganizationIdPage;
