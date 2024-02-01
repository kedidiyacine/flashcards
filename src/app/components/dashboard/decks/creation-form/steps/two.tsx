import { PlusIcon } from "lucide-react";
import { Button } from "../../../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../ui/card";
import { DialogClose } from "../../../../ui/dialog";
import { type FormStepOneProps } from "./one";

type FormStepTwoProps = {
  props: {
    flashCardsCount: number;
    resetForm: () => void;
  } & Pick<FormStepOneProps["props"], "goNextStep">;
};

export default function FormStepTwo({
  props: { goNextStep, flashCardsCount, resetForm },
}: FormStepTwoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {flashCardsCount < 2 ? "empty deck..." : flashCardsCount - 1}
        </CardTitle>
        {/* <CardDescription></CardDescription> */}
      </CardHeader>
      <CardContent>
        <Button
          className="mx-auto h-[8rem] w-[90%] space-x-4 outline-dashed outline-1"
          onClick={goNextStep}
        >
          <PlusIcon />
          <span className="font-mono text-lg">add a flashcard</span>
        </Button>
      </CardContent>
      <CardFooter>
        <DialogClose onClick={resetForm}>Cancel</DialogClose>
        <Button type="submit">Finish</Button>
      </CardFooter>
    </Card>
  );
}
