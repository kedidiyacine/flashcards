import { type FrontFlashCardSchema } from "@/app/lib/validations-schemas";
import { type z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

type FlashCardFront = z.infer<typeof FrontFlashCardSchema>;

export default function FlashCardFront({ front }: { front: FlashCardFront }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p>{front.timer}</p>
        </CardTitle>
        <CardDescription>
          <p>{front.type}</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{front.input}</p>
        {front.attachement ? <p>front?.attachement</p> : null}
      </CardContent>
    </Card>
  );
}
