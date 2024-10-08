'use client';

import { FormErrors } from './form-errors';
import { Input } from '../ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { useFormStatus } from 'react-dom';

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string;
    onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    (
        {
            id,
            label,
            type,
            placeholder,
            required,
            defaultValue = '',
            errors,
            className,
            disabled,
            onBlur,
        },
        ref,
    ) => {
        const { pending } = useFormStatus();
        return (
            <div className="space-y-2">
                <div className="space-y-1">
                    {label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null}
                    <Input
                        id={id}
                        onBlur={onBlur}
                        defaultValue={defaultValue}
                        ref={ref}
                        required={required}
                        name={id}
                        placeholder={placeholder}
                        type={type}
                        disabled={pending || disabled}
                        className={cn('h-7 px-2 py-1 text-sm', className)}
                        aria-describedby={`${id}-error`}
                    />
                </div>
                <FormErrors id={id} errors={errors} />
            </div>
        );
    },
);

FormInput.displayName = 'FormInput';
