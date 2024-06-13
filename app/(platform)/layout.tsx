import { AuthProvider } from '../context/AuthContext';
import { ModalProvider } from '@/components/providers/modal-provider';
import { QueryProvider } from '@/components/providers/query-provider';
import { Toaster } from 'sonner';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <QueryProvider>
                <Toaster />
                <ModalProvider />
                {children}
            </QueryProvider>
        </AuthProvider>
    );
};

export default PlatformLayout;
