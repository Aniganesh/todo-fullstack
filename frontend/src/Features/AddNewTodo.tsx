import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import TodoForm from "./TodoForm";

const AddNewTodo: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const toggle = () => {
    setShowForm((curr) => !curr);
  };

  return (
    <div className="flex flex-col relative gap-4 max-w-64 shadow-lg rounded-md transition-all">
      {!showForm && (
        <Button onClick={toggle} variant="outline">
          Add New
        </Button>
      )}

      {showForm && (
        <div className="relative">
          <button
            className="absolute top-1 right-1 rounded-md hover:bg-zinc-200 px-1 z-[1]"
            onClick={toggle}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <TodoForm onSubmit={console.log} submitText="Add" />
        </div>
      )}
    </div>
  );
};

export default AddNewTodo;
