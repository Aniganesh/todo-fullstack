import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Todo } from "@/types";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { FC } from "react";
import { motion } from "framer-motion";

interface TodoFormProps {
  todo?: Todo;
  submitText?: string;
  size?: "normal" | "large";
  onSubmit: (values: Omit<Todo, "id">) => void;
}

const defaultValue: Omit<Todo, "id"> = {
  name: "",
  description: "",
  status: "",
};

const TodoForm: FC<TodoFormProps> = ({
  todo,
  submitText,
  onSubmit,
  size = "normal",
}) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { ...defaultValue, ...todo },
  });

  return (
    <form
      className="flex flex-col relative gap-4 px-6 pb-2 pt-6 w-full h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.div layoutId={`${todo?.id}-name`}>
        <Input
          placeholder="Enter task title"
          {...register("name", { required: true })}
        />
      </motion.div>
      <motion.div layoutId={`${todo?.id}-description`}>
        <Textarea
          rows={size === "large" ? 20 : 2}
          placeholder="Enter description"
          {...register("description", { required: true })}
        />
      </motion.div>
      <Select {...register("status", { required: true })}>
        <SelectTrigger>
          <SelectValue placeholder="Select status"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todo">To do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="secondary">
        {submitText}
      </Button>
    </form>
  );
};

export default TodoForm;
