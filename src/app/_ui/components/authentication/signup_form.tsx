"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Input } from "@/app/_ui/shadcn/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_ui/shadcn/components/ui/form";

import { signUpWithEmailAndPasswordController } from "@/interface_adapters/controllers/authentication/sign_up_controller";
import { useState } from 'react';

const formSchema = z.object({
    firstName : z.string().min(2, {
        message: "Le prénom doit contenir au moins 2 caractères",
    }).max(50, {message: "Le prénom ne doit pas contenir plus de 50 caractères"}),
    lastName : z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères",
    }).max(50, {message: "Le nom ne doit pas contenir plus de 50 caractères"}),
    email: z.string().email({message: "Invalid email address"}),
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

export function SignUpForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const error = await signUpWithEmailAndPasswordController(values.firstName, values.lastName, values.email, values.password);
        if (error && typeof error === "string") {
            setErrorMessage(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                <div className="flex space-x-8 w-full">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>Prénom</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Jean" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({field}) => (
                            <FormItem className="flex-1">
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder="Dupont" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirmation du mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">S'inscrire</Button>
            </form>
        </Form>
    );
}
