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
import { FC } from "react";
import { motion } from "framer-motion";
import { Todo, TodoCreate } from "@/api/Todos/types";
import { defaultTodoStatuses } from "@/types";
import Modal from "@/components/Modal";
import { X } from "lucide-react";

interface TodoFormProps {
  todo?: Todo;
  submitText?: string;
  onSubmit: (values: TodoCreate) => void;
  isOpen: boolean;
  onClose: () => void;
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
  isOpen,
  onClose,
}) => {
  const { setValue, register, handleSubmit, getValues, reset } = useForm({
    defaultValues: { ...defaultValue, ...todo },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref: _, ...statusRegProps } = register("status", { required: true });

  const setStatus = (value: string) => {
    setValue("status", value);
  };
  const status = getValues().status;
  const handleClose = () => {
    onClose();
    reset();
  };
  return (
    <Modal
      isOpen={isOpen}
      contentClass="h-full w-full pt-5 "
      onClose={handleClose}
    >
      <button
        className="absolute top-1 right-1 rounded-md hover:bg-zinc-200 px-1 z-[1]"
        onClick={onClose}
      >
        <X />
      </button>
      <form
        className="flex flex-col relative gap-4 px-6 pb-2 pt-6 w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <motion.div layoutId={`${todo?.id}-name`}>
          <Input
            placeholder="Enter task title"
            autoFocus={!todo?.title}
            {...register("title", { required: true })}
          />
        </motion.div>
        <motion.div layoutId={`${todo?.id}-description`}>
          <Textarea
            autoFocus={!!todo?.title}
            rows={2}
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
        <Button type="submit">{submitText}</Button>
      </form>
    </Modal>
  );
};

export default TodoForm;
