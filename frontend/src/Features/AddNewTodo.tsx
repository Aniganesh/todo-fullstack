import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <form className="flex flex-col relative gap-4 px-6 pb-2 pt-6">
          <button
            className="absolute top-1 right-1 rounded-md hover:bg-zinc-200 px-1"
            onClick={toggle}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <Input placeholder="Enter task title" />
          <Input placeholder="Enter description" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select status"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todo">To do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Button type="button" variant="secondary">
            Add
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddNewTodo;
