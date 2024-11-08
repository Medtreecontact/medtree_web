"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from "zod";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Input } from "@/app/_ui/shadcn/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_ui/shadcn/components/ui/form";
import { confirmPasswordResetController } from '@/interface_adapters/controllers/authentication/reset_password_controller';
import Link from 'next/link';

const formSchema = z.object({
    password: z.string().min(2, {
        message: "Le mot de passe doit contenir au moins 2 caractères",
    }).max(50, {message: "Le mot de passe ne doit pas contenir plus de 50 caractères"}),
    confirmPassword: z.string().min(2, {
        message: "Le mot de passe doit contenir au moins 2 caractères",
    }).max(50, {message: "Le mot de passe ne doit pas contenir plus de 50 caractères"}),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"], // This will show the error message at the confirmPassword field
});

export function ResetPasswordForm({oobCode}: {oobCode: string}) {
    const [passwordReset, setPasswordReset] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await confirmPasswordResetController(oobCode, values.password);
        setPasswordReset(true);
        form.reset();
    }

    return (
        <>
        {!passwordReset && <>
        <p>Remplissez le formulaire suivant pour modifier votre mot de passe.</p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md mx-auto">
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nouveau mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirmation nouveau mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Envoyer</Button>
            </form>
        </Form>
        </>
        }
        {passwordReset && <>
            <p className="text-green-600">Votre mot de passe à été modifié. Vous pouvez maintenant vous connecter</p>
            
            <Link href="/login">
                <Button>Se connecter</Button>
            </Link>
        </>}
        </>
    );
}