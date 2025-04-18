"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { useForm } from "react-hook-form"
import { useState } from "react";
import { z } from "zod"

import { cn } from "@/app/_ui/shadcn/lib/utils"
import { Button } from "@/app/_ui/shadcn/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_ui/shadcn/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_ui/shadcn/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_ui/shadcn/components/ui/popover"
import { updateUserAccount } from "@/app/actions/actions";
import { Input } from "../../shadcn/components/ui/input";
import { useEffect } from "react";
import { toast } from "sonner"
import { PROMOS, UNIVERSITIES } from "@/core/constants";
import { sendEmailVerificationController } from "@/interface_adapters/controllers/authentication/send_email_verification_controller";
import { AlertCircle, Save } from "lucide-react";
import { Alert, AlertDescription } from "@/app/_ui/shadcn/components/ui/alert";

const FormSchema = z.object({
  firstName : z.string().min(2, {
      message: "Le prénom doit contenir au moins 2 caractères",
  }).max(50, {message: "Le prénom ne doit pas contenir plus de 50 caractères"}),
  lastName : z.string().min(2, {
      message: "Le nom doit contenir au moins 2 caractères",
  }).max(50, {message: "Le nom ne doit pas contenir plus de 50 caractères"}),
  email: z.string({
      required_error: "Entrez votre adresse e-mail",
  }),
  university: z.string({
      required_error: "Selectionnez votre campus",
  }),
  promo: z.string({
      required_error: "Selectionnez votre promotion",
  }),
})

export function ProfileForm({ user }: { user: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      university: user.university ?? "",
      promo: user.promo ?? "",
      email: user.email ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      university: user.university ?? "",
      promo: user.promo ?? "",
      email: user.email ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
    });
  }, [user, form]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) return;
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const error = await updateUserAccount(user.uid, data);
      if (error && typeof error === "string") {
        setErrorMessage(error);
      } else {
        toast("Informations du compte", {
          description: "Vos informations ont bien été mises à jour",
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

  async function handleSendEmailVerification() {
    try {
      await sendEmailVerificationController();
      toast("Email de vérification", {
        description: "Email de vérification envoyé avec succès",
      });
    } catch (e) {
      console.error(e);
      toast("Erreur", {
        description: "Impossible d'envoyer l'email de vérification",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full max-w-lg">
        <div className="flex flex-col sm:flex-row gap-5">
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
        {!user.emailVerified && (
          <Alert variant="destructive" className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="flex-1">Pensez à vérifier votre adresse e-mail pour sécuriser votre compte</span>
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSendEmailVerification}
                size="sm"
                className="whitespace-nowrap"
              >
                Envoyer un e-mail de vérification
              </Button>
            </AlertDescription>
          </Alert>
        )}
        <ProfileComboBox 
          form={form}
          name="university"
          formLabel="Votre campus"
          valuesList={UNIVERSITIES}
          buttonText="Choisissez votre campus"
          commandPlaceholder="Chercher un campus..."
          formValueName="university"
          formDescription="Vous pourrez modifier votre campus à tout moment"
          width="w-full"
        />
        <ProfileComboBox
          form={form}
          name="promo"
          formLabel="Votre promo"
          valuesList={PROMOS}
          buttonText="Choisissez votre promo"
          commandPlaceholder="Chercher une promo..."
          formValueName="promo"
          formDescription="Vous pourrez modifier votre promo à tout moment"
          width="w-[220px]"
        />
        <Button 
          type="submit" 
          className="flex items-center gap-2" 
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4" />
          {isSubmitting ? 'Sauvegarde en cours...' : 'Sauvegarder'}
        </Button>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </form>
    </Form>
  )
}

function ProfileComboBox({ form, name, formLabel, valuesList, buttonText, commandPlaceholder, formValueName, formDescription, width = "w-full" }: { form: any, name: string, formLabel: string, valuesList: readonly { label: string, value: string }[], buttonText: string, commandPlaceholder: string, formValueName: string, formDescription: string, width?: string }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{formLabel}</FormLabel>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    `${width} justify-between h-10`,
                    !field.value && "text-muted-foreground"
                  )}
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                >
                  {field.value
                    ? valuesList.find(
                        (value) => value.value === field.value
                      )?.label
                    : buttonText}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn("p-0", width === "w-full" ? "w-[300px]" : width)}>
              <Command>
                <CommandInput
                  placeholder={commandPlaceholder}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty>Aucun résultat trouvé</CommandEmpty>
                  <CommandGroup>
                    {valuesList.map((value) => (
                      <CommandItem
                        value={value.label}
                        key={value.value}
                        onSelect={() => {
                          form.setValue(formValueName, value.value)
                          setIsPopoverOpen(false);
                        }}
                      >
                        {value.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription className="text-xs">
            {formDescription}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}