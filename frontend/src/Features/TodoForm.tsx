import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Todo, TodoCreate } from "@/api/Todos/types";
import { defaultTodoStatuses } from "@/types";

interface TodoFormProps {
  todo?: Todo;
  submitText?: string;
  size?: "normal" | "large";
  onSubmit: (values: TodoCreate) => void;
}

const defaultValue: TodoCreate = {
  title: "",
  description: "",
  status: "",
};

const TodoForm: FC<TodoFormProps> = ({
  todo,
  submitText,
  onSubmit,
  size = "normal",
}) => {
  const { setValue, register, handleSubmit, getValues } = useForm({
    defaultValues: { ...defaultValue, ...todo },
  });
  const statusRegProps = register("status", { required: true });

  const setStatus = (value: string) => {
    setValue("status", value);
  };
  const status = getValues().status;

  return (
    <form
      className="flex flex-col relative gap-4 px-6 pb-2 pt-6 w-full h-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.div layoutId={`${todo?.id}-name`}>
        <Input
          placeholder="Enter task title"
          {...register("title", { required: true })}
        />
      </motion.div>
      <motion.div layoutId={`${todo?.id}-description`}>
        <Textarea
          rows={size === "large" ? 20 : 2}
          placeholder="Enter description"
          {...register("description", { required: true })}
        />
      </motion.div>
      <Select {...statusRegProps} onValueChange={setStatus} value={status}>
        <SelectTrigger>
          <SelectValue placeholder="Select status"></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={defaultTodoStatuses.todo}>To do</SelectItem>
          <SelectItem value={defaultTodoStatuses.inProgress}>
            In Progress
          </SelectItem>
          <SelectItem value={defaultTodoStatuses.complete}>
            Completed
          </SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="secondary">
        {submitText}
      </Button>
    </form>
  );
};

export default TodoForm;
