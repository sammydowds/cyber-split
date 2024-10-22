import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input"; // Adjust the import path as necessary
import { motion } from "framer-motion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

export const Name: React.FC = () => {
  const form = useFormContext();

  return (
    <motion.div
      className="p-4 flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-bold tracking-tighter text-xl max-w-[345px]">
          What would you like to name this program?
        </h2>
        <p className="text-stone-600">
          Enter a name that differentiates it from other programs you have
          created.
        </p>
      </div>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Awesome program..."
                className="max-md:text-[16px] min-h-[50px] max-w-[500px]"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </motion.div>
  );
};
