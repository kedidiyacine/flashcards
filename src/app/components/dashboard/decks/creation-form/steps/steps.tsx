import { type FieldTypes, type FlashCard } from "@/app/lib/definitions";
import { type Category } from "@prisma/client";

import { type UseFormReturn } from "react-hook-form";

import { FormStep } from "../../../../ui/form";

import FormStepOne from "./one";
import FormStepTwo from "./two";
import FormStepTwoA from "./twoA";

function FormSteps({
  form,
  categories,
}: {
  form: UseFormReturn<FieldTypes, unknown, undefined>;
  categories?: Category[] | undefined;
}) {
  const currentStep = form.watch("currentStep");

  const goPrevStep = () => {
    const isSubStep = currentStep % 2 !== 0;
    const newStep = isSubStep ? currentStep - 0.1 : currentStep - 1;
    form.setValue("currentStep", newStep, { shouldValidate: true });
  };

  const resetForm = () => {
    form.reset();
  };

  const goNextStep = async () => {
    // await form.trigger();
    // if (!form.formState.isValid) return;
    const isSubStep = currentStep % 2 !== 0;
    const newStep = isSubStep ? currentStep + 1 : currentStep + 0.1;
    form.setValue("currentStep", newStep, { shouldValidate: true });
  };

  // first element is a placeholder for new flashcard
  // pop it when done
  const saveFlashcardAndGoBack = () => {
    // Access the current flashcard array from the form state
    const currentFlashcards = form.getValues("flashCards");

    // Add logic here to save the flashcard
    const newFlashcard = form.getValues("flashCards.0");

    // Update the flashcard array in the form state
    form.setValue("flashCards", [...(currentFlashcards || []), newFlashcard], {
      shouldValidate: true,
    });

    // Clear the flashcard information in the form state for the next flashcard
    form.setValue("flashCards.0", { front: {}, back: {} } as FlashCard);
    // After saving, navigate back to step 2
    goPrevStep();
  };

  const flashCardsCount = form.getValues("flashCards").length;

  return {
    one: (
      <FormStep formStepProps={{ step: 1, currentStep, goPrevStep }}>
        <FormStepOne
          props={{
            goNextStep,
            categories,
            control: form.control,
            isValid: form.formState.isValid,
          }}
        />
      </FormStep>
    ),
    two: (
      <FormStep formStepProps={{ step: 2, currentStep, goPrevStep }}>
        <FormStepTwo
          props={{
            resetForm,
            goNextStep,
            flashCardsCount,
          }}
        />
      </FormStep>
    ),
    twoA: (
      <FormStep
        formStepProps={{
          title: `Flashcard ${flashCardsCount > 1 ? flashCardsCount : 1}:`,
          step: 2.1,
          currentStep,
          goPrevStep,
        }}
      >
        <FormStepTwoA
          props={{
            control: form.control,
            saveFlashcardAndGoBack,
            watch: form.watch,
          }}
        />
      </FormStep>
    ),
  };
}

export default FormSteps;
