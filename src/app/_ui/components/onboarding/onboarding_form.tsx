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
import { onboardingUpdateUserAccount } from "@/app/actions";
import { useAuth } from "@/app/_ui/authContext";

const universities = [
    { label: "Université d'Amiens", value: "universite-d-amiens" },
    { label: "Université d'Angers", value: "universite-d-angers" },
    { label: "Université de Franche-Comté", value: "universite-de-franche-comte" },
    { label: "Université Victor Segalen - Bordeaux 2", value: "universite-victor-segalen-bordeaux-2" },
    { label: "Université de Bretagne Occidentale", value: "universite-de-bretagne-occidentale" },
    { label: "Université de Caen Basse-Normandie", value: "universite-de-caen-basse-normandie" },
    { label: "Université d'Auvergne", value: "universite-d-auvergne" },
    { label: "Université de Bourgogne", value: "universite-de-bourgogne" },
    { label: "Université Grenoble Rhône Alpes", value: "universite-grenoble-rhone-alpes" },
    { label: "Université des Antilles et de la Guyane (Guadeloupe)", value: "universite-des-antilles-et-de-la-guyane-guadeloupe" },
    { label: "Université de La Réunion", value: "universite-de-la-reunion" },
    { label: "Université de Lille 2 Droit et Santé", value: "universite-de-lille-2-droit-et-sante" },
    { label: "Université Catholique de Lille", value: "universite-catholique-de-lille" },
    { label: "Université de Limoges", value: "universite-de-limoges" },
    { label: "Université Lyon 1", value: "universite-lyon-1" },
    { label: "Université Charles Mérieux", value: "universite-charles-merieux" },
    { label: "Aix-Marseille Université", value: "aix-marseille-universite" },
    { label: "Université de Montpellier", value: "universite-de-montpellier" },
    { label: "Université de Lorraine", value: "universite-de-lorraine" },
    { label: "Université de Nantes", value: "universite-de-nantes" },
    { label: "Université Nice Sophia-Antipolis", value: "universite-nice-sophia-antipolis" },
    { label: "Université Paris Descartes Paris", value: "universite-paris-descartes-paris" },
    { label: "Sorbonne Université", value: "sorbonne-universite" },
    { label: "Université Paris Diderot", value: "universite-paris-diderot" },
    { label: "Université Paris Sud 11", value: "universite-paris-sud-11" },
    { label: "Université Paris Est Créteil Val de Marne", value: "universite-paris-est-creteil-val-de-marne" },
    { label: "Université Paris Nord 13", value: "universite-paris-nord-13" },
    { label: "Université de Versailles Saint Quentin en Yvelines", value: "universite-de-versailles-saint-quentin-en-yvelines" },
    { label: "Université de Poitiers", value: "universite-de-poitiers" },
    { label: "Université de Reims Champagne-Ardenne", value: "universite-de-reims-champagne-ardenne" },
    { label: "Université de Rennes I", value: "universite-de-rennes-i" },
    { label: "Université Jean Monnet Saint-Étienne", value: "universite-jean-monnet-saint-etienne" },
    { label: "Université Louis Pasteur Strasbourg", value: "universite-louis-pasteur-strasbourg" },
    { label: "Université Paul Sabatier Toulouse III", value: "universite-paul-sabatier-toulouse-iii" },
    { label: "Université François Rabelais", value: "universite-francois-rabelais" },
    { label: "Université de Corse", value: "universite-de-corse" },
    { label: "Université de Nouvelle-Calédonie", value: "universite-de-nouvelle-caledonie" },
    { label: "Université de la Polynésie française", value: "universite-de-la-polynesie-francaise" },
    { label: "Université de Rouen", value: "universite-de-rouen" },
  ] as const;

  const promos = [
    { label: "P2", value: "p2" },
    { label: "D1", value: "d1" },
    { label: "D2", value: "d2" },
    { label: "D3", value: "d3" },
    { label: "Interne", value: "interne" },
    { label: "Medecin", value: "medecin" },
    { label: "Autres", value: "autres" },
  ] as const;

const FormSchema = z.object({
    university: z.string({
        required_error: "Selectionnez votre campus",
    }),
    promo: z.string({
        required_error: "Selectionnez votre promotion",
    }),
})

export function OnboardingForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!user) return
    const error = await onboardingUpdateUserAccount(user.uid, data);
    if (error && typeof error === "string") {
      setErrorMessage(error);
    } 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <OnboardingComboBox 
          form={form}
          name="university"
          formLabel="Votre campus"
          valuesList={universities}
          buttonText="Choisissez votre campus"
          commandPlaceholder="Chercher une campus..."
          formValueName="university"
          formDescription="Vous pourrez modifier votre campus dans votre profil"
        />
        <OnboardingComboBox
          form={form}
          name="promo"
          formLabel="Votre promo"
          valuesList={promos}
          buttonText="Choisissez votre promo"
          commandPlaceholder="Chercher une promo..."
          formValueName="promo"
          formDescription="Vous pourrez modifier votre promo dans votre profil"
          width="w-[220px]"
        />
        <Button type="submit" className="w-full">Accéder à MedTree</Button>
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </form>
    </Form>
  )
}

function OnboardingComboBox({ form, name, formLabel, valuesList, buttonText, commandPlaceholder, formValueName, formDescription, width = "w-full" }: { form: any, name: string, formLabel: string, valuesList: readonly { label: string, value: string }[], buttonText: string, commandPlaceholder: string, formValueName: string, formDescription: string, width?: string }) {
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
                        `${width} justify-between`,
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
                <PopoverContent className="w-[200px] p-0">
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
              <FormDescription>
                {formDescription}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      );
}