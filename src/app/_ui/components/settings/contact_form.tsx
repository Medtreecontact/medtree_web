"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";

import { useState } from "react";

import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Textarea } from "@/app/_ui/shadcn/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_ui/shadcn/components/ui/form";

import { sendMessage } from '@/app/actions';

const formSchema = z.object({
    message: z.string().min(2, {
        message: "Le message doit faire au moins 10 charactères",
    }).max(5000, {message: "Le message ne doit pas dépasser 5000 charactères"}),
});

export function ContactForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

     const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                message: "",
            },
        });

    async function onSubmit(values: z.infer<typeof formSchema>)  {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            form.reset();
    
            const error = await sendMessage(values.message);
            if (error && typeof error === "string") {
                setErrorMessage(error);
            }
    }

    return (
        <div>
            <h3 className="text-xl font-semibold">Contacter MedTree</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
                    <FormField
                        control={form.control}
                        name="message"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Votre message</FormLabel>
                                <FormControl>
                                    <Textarea className='h-20' placeholder="J'ai un problème avec ..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Envoyer</Button>
                    {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
                </form>
            </Form>
        </div>
    );
}