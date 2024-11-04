"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Input } from "@/app/_ui/shadcn/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_ui/shadcn/components/ui/form";
import Link from 'next/link';

import { useActionState } from 'react';
import { authenticate } from "@/app/actions";

const formSchema = z.object({
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters long",
    }).max(50, {message: "Password must be at most 50 characters long"}),
});

export function LoginForm() {
    // const [errorMessage, formAction, isPending] = useActionState(
    //     authenticate,
    //     undefined,
    //   );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
        });
        // formAction(formData);
        
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full max-w-md mx-auto">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="exemple@medtree.fr" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Se connecter</Button>
                <Link href="/reset-password" className="text-primary ml-32">Mot de passe oublié ?</Link>
                {/* {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>} */}
            </form>
        </Form>
    );
}
