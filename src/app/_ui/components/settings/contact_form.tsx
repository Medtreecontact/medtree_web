"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/app/_ui/shadcn/components/ui/button";
import { Textarea } from "@/app/_ui/shadcn/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_ui/shadcn/components/ui/form";
import { sendMessage } from '@/app/actions/actions';
import { MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/app/_ui/shadcn/components/ui/alert";

const formSchema = z.object({
    message: z.string().min(10, {
        message: "Le message doit faire au moins 10 caractères",
    }).max(5000, {message: "Le message ne doit pas dépasser 5000 caractères"}),
});

export function ContactForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsSubmitting(true);
            setErrorMessage(null);
            
            const error = await sendMessage(values.message);
            
            if (error && typeof error === "string") {
                setErrorMessage(error);
                toast.error("Échec de l'envoi du message");
            } else {
                form.reset();
                setSubmitted(true);
                toast.success("Message envoyé", {
                    description: "Nous vous répondrons dès que possible"
                });
                
                // Reset submitted state after 3 seconds
                setTimeout(() => setSubmitted(false), 3000);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="message"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Votre message
                            </FormLabel>
                            <FormControl>
                                <Textarea 
                                    className='min-h-32 resize-y' 
                                    placeholder="J'ai un problème avec..."
                                    disabled={isSubmitting}
                                    {...field} 
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className="flex items-center space-x-4">
                    <Button 
                        type="submit" 
                        disabled={isSubmitting || submitted}
                        className="flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Envoi en cours...
                            </>
                        ) : submitted ? (
                            <>
                                <CheckCircle2 className="h-4 w-4" />
                                Envoyé
                            </>
                        ) : (
                            <>
                                <Send className="h-4 w-4" />
                                Envoyer
                            </>
                        )}
                    </Button>
                    
                    {errorMessage && (
                        <Alert variant="destructive" className="p-2 text-sm">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}
                </div>
            </form>
        </Form>
    );
}