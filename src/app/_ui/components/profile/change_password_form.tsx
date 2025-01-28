"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Input } from "@/app/_ui/shadcn/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_ui/shadcn/components/ui/form";

import { updateUserPasswordController } from "@/interface_adapters/controllers/profile/update_user_password_controller";
import { useState, useEffect } from 'react';

import { firebaseAuth } from '@/infrastructure/services/firebase-client';
import { toast } from "sonner"
import { User } from 'firebase/auth';
import Link from 'next/link';

const formSchema = z.object({
    oldPassword: z.string().min(2, {
        message: "Le mot de passe doit contenir au moins 2 caractères",
    }).max(50, {message: "Le mot de passe ne doit pas contenir plus de 50 caractères"}),
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

export function ChangePasswordForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [providers, setProviders] = useState<string[]>([]);
  
    useEffect(() => {
      const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          console.log(user);
          setProviders(user.providerData.map(provider => provider.providerId));
        } else {
          setUser(null);
          setProviders([]);
        }
      });
  
      return () => unsubscribe();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
    });


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const error = await updateUserPasswordController(values.password, values.oldPassword);
        if (error && typeof error === "string") {
            setErrorMessage(error);
        } else  {
            form.reset();
            toast("Mot de passe modifié", {
                description: "Votre mot de passe à été mis à jour",
                action: {
                  label: "D'accord",
                  onClick: () => {},
                },
              })
        }
    }

    return (
        providers.includes("password") ?
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 w-[400px]">
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Mot de passe actuel</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••" {...field} />
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
                                <FormLabel>Confirmation du nouveau mot de passe</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="">Changer de mot de passe</Button>
                    <Link href="/reset-password" className="text-primary ml-12">Mot de passe oublié ?</Link>
                    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                </form>
            </Form>
        :
            providers.includes("google.com") ?
                <>
                    <p>Votre compte MedTree est lié à votre compte Google {user?.email}</p>
                    <p>MedTree ne gère pas votre mot de passe.</p>
                </>
            : providers.includes("apple.com") ?
                <>
                    <p>Votre compte MedTree est lié à votre compte Apple.</p>
                    <p>MedTree ne gère pas votre mot de passe.</p>
                </>
            : <p>Chargement en cours ...</p>
    );
}
