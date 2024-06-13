'use client';

import { Toaster, toast } from 'sonner';
import { ZodError, z } from 'zod';

import { redirect } from 'next/dist/server/api-utils';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

const loginSchema = z.object({
    email: z.string().email('E-mail Inválido.'),
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const { user, Login, loading } = useAuth();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<LoginData>({
        mode: 'onBlur',
        defaultValues: { email: '', password: '' },
    });

    const showSuccessToast = () => {
        toast.success('Login feito com sucesso!');
    };

    const showErrorToast = (errorMessage: string) => {
        toast.error(`Falha no login!\n${errorMessage}`);
    };

    const handleSubmitData = async (data: LoginData) => {
        try {
            // Validando os dados com Zod
            const validatedData = loginSchema.safeParse(data);
            if (!validatedData.success) {
                validatedData.error.issues.forEach(issue => {
                    toast.error(issue.message);
                });
                return;
            }

            await Login(data);
            showSuccessToast();
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                const fieldErrors = err.errors
                    .map(error => error.message)
                    .join('\n');
                showErrorToast(fieldErrors);
            } else {
                console.error(err);
                showErrorToast(
                    'Erro ao fazer login. Por favor, tente novamente.',
                );
            }
        }
    };

    useEffect(() => {
        if (user) {
            // redirect('/boards');
            window.location.href = '/boards';
        }
    }, [user]);

    return (
        <>
            <Toaster />
            <section className="flex justify-center px-2 pb-4">
                <form
                    onSubmit={handleSubmit(handleSubmitData)}
                    className="flex w-[90vw] flex-col items-start gap-4 px-8 py-10 md:w-[60vw]"
                >
                    <h1 className="text-2xl font-semibold">Acessar conta</h1>
                    <input
                        {...register('email')}
                        placeholder="E-mail"
                        className="h-8 w-full rounded-md border px-2 py-4 text-lg"
                        type="email"
                    />
                    <p className="text-red-600">{errors.email?.message}</p>
                    <input
                        {...register('password')}
                        placeholder="Senha"
                        className="h-8 w-full rounded-md border px-2 py-4 text-lg"
                        type="password"
                    />
                    <p className="text-red-600">{errors.password?.message}</p>
                    <input
                        disabled={isSubmitting}
                        className="w-full rounded-md bg-[#f15922] py-2 font-medium text-white hover:brightness-[95%] disabled:bg-red-500"
                        type="submit"
                        value="Entrar"
                    />
                </form>
            </section>
        </>
    );
}
