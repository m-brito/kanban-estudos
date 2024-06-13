import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import localFont from 'next/font/local';

const headingFont = localFont({
    src: '../public/fonts/font.woff2',
});

export const Logo = () => {
    return (
        <Link href="/boards">
            <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
                {/* <Image src="/logo.svg" alt="Logo" height={30} width={30} /> */}
                <Image
                    src="/biotronicaLogoBlack.png"
                    alt="Logo"
                    height={100}
                    width={100}
                />
                <p
                    className={cn(
                        'pb-1 text-lg text-neutral-700',
                        headingFont.className,
                    )}
                >
                    {/* Biotronica */}
                </p>
            </div>
        </Link>
    );
};
