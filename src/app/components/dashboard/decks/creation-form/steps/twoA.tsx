import { type FieldTypes } from "@/app/lib/definitions";
import { type Control, type UseFormWatch } from "react-hook-form";
import { Button } from "../../../../ui/button";
import { Card, CardContent } from "../../../../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../ui/form";
import { Input } from "../../../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../ui/tabs";
import { Textarea } from "../../../../ui/textarea";
import FlashCardFront from "../../flashcard-front";

type FormStepTwoAProps = {
  props: {
    control: Control<FieldTypes, unknown>;
    saveFlashcardAndGoBack: () => void;
    watch: UseFormWatch<FieldTypes>;
  };
};

export default function FormStepTwoA({
  props: { control, saveFlashcardAndGoBack, watch },
}: FormStepTwoAProps) {
  return (
    <div className="grid grid-cols-2 gap-x-16">
      <div>
        <Tabs defaultValue="front" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="front">Front</TabsTrigger>
            <TabsTrigger value="back">Back</TabsTrigger>
          </TabsList>
          <TabsContent value="front">
            <Card>
              {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader> */}
              <CardContent className="space-y-2">
                {/* Type */}
                <FormField
                  control={control}
                  name={`flashCards.0.front.type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="question">question</SelectItem>
                          <SelectItem value="pick the right answer(s)">
                            pick the right answer(s)
                          </SelectItem>
                          <SelectItem value="fill in the blank(s)">
                            fill in the blank(s)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* timer */}
                <FormField
                  control={control}
                  name={`flashCards.0.front.timer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timer</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          placeholder="timer in seconds..."
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>timer in seconds.</FormDescription> */}
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />
                {/* input */}
                <FormField
                  control={control}
                  name={`flashCards.0.front.input`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Input</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your input here..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
            </Card>
          </TabsContent>
          <TabsContent value="back">
            <Card>
              {/* <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader> */}
              <CardContent>
                {/* answer */}
                <FormField
                  control={control}
                  name={`flashCards.0.back.answer`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your answer here..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              {/* <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
            </Card>
          </TabsContent>
        </Tabs>
        <Button onClick={saveFlashcardAndGoBack}>save</Button>
      </div>
      <FlashCardFront front={watch("flashCards.0.front")} />
    </div>
  );
}
