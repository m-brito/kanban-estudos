'use client';

import { Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { FormErrors } from './form-errors';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { defaultImages } from '@/constants/images';
import { unsplash } from '@/lib/unsplash';
import { useFormStatus } from 'react-dom';

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
    const { pending } = useFormStatus();

    const [images, setImages] =
        useState<Array<Record<string, any>>>(defaultImages);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const result = await unsplash.photos.getRandom({
                    collectionIds: ['317099'],
                    count: 9,
                });
                if (result && result.response) {
                    const newImages = result.response as Array<
                        Record<string, any>
                    >;
                    setImages(newImages);
                } else {
                    console.error('Failed to get images from Unsplash');
                }
            } catch (error) {
                console.log(error);
                setImages(defaultImages);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedImageId(event.target.value.split('|')[0]);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6">
                <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="mb-2 grid grid-cols-3 gap-2">
                {images.map(image => (
                    <div
                        key={image.id}
                        className={cn(
                            'group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75',
                            pending &&
                                'cursor-auto opacity-50 hover:opacity-50',
                        )}
                        onClick={() => {
                            if (pending) return;
                            setSelectedImageId(image.id);
                        }}
                    >
                        <input
                            type="radio"
                            id={`${id}-${image.id}`}
                            name={id}
                            className="hidden"
                            checked={selectedImageId === image.id}
                            onChange={handleImageSelect}
                            disabled={pending}
                            value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                        />
                        <Image
                            fill
                            src={image.urls.thumb}
                            alt="Unsplash img"
                            className="rounded-sm object-cover"
                        />
                        {selectedImageId === image.id && (
                            <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}
                        <Link
                            href={image.links.html}
                            target="_blank"
                            className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
                        >
                            {image.user.name}
                        </Link>
                    </div>
                ))}
            </div>
            <FormErrors id="image" errors={errors} />
        </div>
    );
};
