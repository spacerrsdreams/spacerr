"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  text: z
    .string()
    .min(10, {
      message: "Text must be at least 10 characters.",
    })
    .max(160, {
      message: "Text must not be longer than 30 characters.",
    }),
});

export function ChatForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:w-3/4 xl:w-1/2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share your vision, and let’s bring it to life!"
                  className="min-h-20 resize-none bg-white"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-center">
                Note that all content must be respectful, lawful, and appropriate. Inappropriate
                content such as illegal, explicit, or harmful material is strictly prohibited.”
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-4 flex w-full items-center justify-center md:mt-8 xl:mt-12">
          <Button className="px-10" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
