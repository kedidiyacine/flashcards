import { type FieldTypes } from "@/app/lib/definitions";
import { type Category } from "@prisma/client";
import { type Control } from "react-hook-form";
import { Button } from "../../../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../ui/card";
import { DialogClose } from "../../../../ui/dialog";
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
import { Textarea } from "../../../../ui/textarea";

export type FormStepOneProps = {
  props: {
    goNextStep: () => Promise<void>;
    control: Control<FieldTypes, unknown>;
    isValid: boolean;
    categories: Category[] | undefined;
  };
};

export default function FormStepOne({
  props: { goNextStep, control, isValid, categories },
}: FormStepOneProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>creating a deck</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      <CardContent className="">
        {/* title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="write a title..." {...field} />
              </FormControl>
              {/* <FormDescription>This is your deck's title.</FormDescription> */}
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        {/* Visbility */}
        <FormField
          control={control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a visbility..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={"public"}>public</SelectItem>
                  <SelectItem value={"private"}>private</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* category */}
        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <FormDescription>
                      (*) Providing the right category for your flashcard deck would
                      boost its availability for interested users.
                        </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your flashcard deck..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
      <CardFooter>
        <DialogClose>Cancel</DialogClose>
        <Button
          // disabled={!isValid}
          type="button"
          onClick={goNextStep}
          className="text-lg leading-none tracking-tight"
        >
          Next
        </Button>
      </CardFooter>
    </Card>
  );
}
