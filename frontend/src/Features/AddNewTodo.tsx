import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import TodoForm from "./TodoForm";
import { useStore } from "@/Store";
import { TodoCreate } from "@/api/Todos/types";

const AddNewTodo: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const createTodo = useStore((state) => state.createTodo);

  const toggle = () => {
    setShowForm((curr) => !curr);
  };

  const onSubmit = async (values: TodoCreate) => {
    await createTodo(values);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col gap-4 max-w-64 shadow-lg rounded-md transition-all">
      {!showForm && (
        <Button onClick={toggle} variant="outline">
          Add New
        </Button>
      )}

      <TodoForm
        isOpen={showForm}
        onClose={toggle}
        onSubmit={onSubmit}
        submitText="Add"
      />
    </div>
  );
};

export default AddNewTodo;
