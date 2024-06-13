import { AuthProvider } from '../context/AuthContext';
import { Footer } from './_components/footer';
import { Navbar } from './_components/navbar';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <div className="h-full bg-slate-100">
                <Navbar />
                <main className="bg-slate-100 pb-20 pt-40">{children}</main>
                <Footer />
            </div>
        </AuthProvider>
    );
};

export default MarketingLayout;
