"use client";

import type { CreateDeckProps, FieldTypes } from "@/app/lib/definitions";
import { defaultValues } from "@/app/lib/utils";
import { DeckCreationSchema } from "@/app/lib/validations-schemas";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { revalidatePath } from "next/cache";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Dialog, DialogContent, DialogTrigger } from "../../../ui/dialog";
import { Form } from "../../../ui/form";

import FormSteps from "./steps/steps";

export function CreateDeck({ categories }: CreateDeckProps) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  const pathname = usePathname();

  const form = useForm<FieldTypes>({
    defaultValues,
    resolver: zodResolver(
      DeckCreationSchema.extend({
        currentStep: z.number().nonnegative().min(1),
      }),
    ),
  });

  const createDeck = api.deck.create.useMutation({
    onSuccess: () => {
      revalidatePath(pathname);
    },
  });

  const onSubmit = (data: FieldTypes) => {
    // createDeck.mutate(data);
    console.log(data);
    form.reset();
  };

  // const onClick = () => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set(
  //     "flashcard",
  //     searchParams.has("flashcard")
  //       ? String(Number(searchParams.get("flashcard")) + 1)
  //       : "1",
  //   );
  //   router.replace(`${pathname}?${params.toString()}`);
  // };

  console.log(form.getValues());

  return (
    <>
      <Dialog>
        <DialogTrigger>Create a deck</DialogTrigger>
        <DialogContent className="h-[90%] max-w-7xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`p-4`}>
              {FormSteps({ form, categories }).one}
              {FormSteps({ form }).two}
              {FormSteps({ form }).twoA}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
