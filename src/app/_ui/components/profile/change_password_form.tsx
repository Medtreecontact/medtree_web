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
import { AlertTriangle, LockKeyhole, LogIn } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/app/_ui/shadcn/components/ui/alert";

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
        path: ["confirmPassword"],
    });

export function ChangePasswordForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [providers, setProviders] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    useEffect(() => {
      const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
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
        try {
            setIsSubmitting(true);
            setErrorMessage(null);
            const error = await updateUserPasswordController(values.password, values.oldPassword);
            if (error && typeof error === "string") {
                setErrorMessage(error);
            } else {
                form.reset();
                toast("Mot de passe modifié", {
                    description: "Votre mot de passe à été mis à jour",
                    action: {
                      label: "D'accord",
                      onClick: () => {},
                    },
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!providers.length) {
        return (
            <div className="flex items-center justify-center p-8">
                <span className="text-sm text-muted-foreground">Chargement en cours...</span>
            </div>
        );
    }

    if (providers.includes("google.com")) {
        return (
            <Alert className="bg-blue-50 border-blue-200 max-w-md">
                <LogIn className="h-4 w-4 text-blue-600" />
                <AlertTitle className="text-blue-800">Connexion via Google</AlertTitle>
                <AlertDescription className="text-blue-700">
                    <p>Votre compte MedTree est lié à votre compte Google {user?.email}</p>
                    <p className="mt-2">Pour changer votre mot de passe, veuillez utiliser les paramètres de votre compte Google.</p>
                </AlertDescription>
            </Alert>
        );
    }

    if (providers.includes("apple.com")) {
        return (
            <Alert className="bg-gray-50 border-gray-200 max-w-md">
                <LogIn className="h-4 w-4 text-gray-600" />
                <AlertTitle className="text-gray-800">Connexion via Apple</AlertTitle>
                <AlertDescription className="text-gray-700">
                    <p>Votre compte MedTree est lié à votre compte Apple.</p>
                    <p className="mt-2">Pour changer votre mot de passe, veuillez utiliser les paramètres de votre compte Apple.</p>
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md">
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
                <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pt-2">
                    <Button 
                        type="submit" 
                        className="flex items-center gap-2" 
                        disabled={isSubmitting}
                    >
                        <LockKeyhole className="h-4 w-4" />
                        {isSubmitting ? 'Modification en cours...' : 'Changer le mot de passe'}
                    </Button>
                    <Link 
                        href="/reset-password" 
                        className="text-primary text-sm hover:underline flex items-center gap-1"
                    >
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Mot de passe oublié ?
                    </Link>
                </div>
                
                {errorMessage && (
                    <Alert variant="destructive">
                        <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                )}
            </form>
        </Form>
    );
}
