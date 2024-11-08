"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { z } from "zod";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Input } from "@/app/_ui/shadcn/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_ui/shadcn/components/ui/form";
import { sendPasswordResetEmailController } from '@/interface_adapters/controllers/authentication/reset_password_controller';

const formSchema = z.object({
    email: z.string().email({message: "Adresse e-mail invalide"}),
});

export function SendResetPasswordEmailForm() {
    const [messageSent, setMessageSent] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await sendPasswordResetEmailController(values.email);
        setMessageSent(true);
        form.reset();
    }

    return (
        <>
        <p>Remplissez le formulaire suivant pour recevoir un email de réinitialisation de mot de passe.</p>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md mx-auto">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>E-mail de votre compte</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="exemple@medtree.fr" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Envoyer</Button>
                {messageSent && <p className="text-green-600">Un email de réinitialisation de mot de passe vous a été envoyé. Si vous ne le trouvez pas vérifiez votre dossier spam.</p>}
            </form>
        </Form>
        </>
    );
}