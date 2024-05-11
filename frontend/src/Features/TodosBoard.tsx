import { useStore } from "@/Store";
import React, { FC } from "react";
import TodoCard from "./TodoCard";
import DndBoard, { DNDColumnProps, DNDItemProps } from "@/Components/dnd";
import { Todo } from "@/types";
import clsx from "clsx";

interface TodosBoardProps {}

const TodosBoard: FC<TodosBoardProps> = () => {
  const groupedTodos = useStore((state) => state.groupedTodos);
  const setGroupedTodos = useStore((state) => state.setGroupedTodos);

  return (
    <div className="flex gap-3 flex-wrap h-full py-4">
      <DndBoard<Todo>
        boardData={groupedTodos}
        onBoardUpdate={setGroupedTodos}
        ColumnComponent={TodoColumn}
        ItemComponent={TodoItem}
      />
    </div>
  );
};

export default TodosBoard;

const TodoColumn: FC<DNDColumnProps> = ({
  children,
  colKey: key,
  innerRef,
  snapshot,
  ...props
}) => {
  return (
    <div key={key} className={"flex-1 rounded-md px-3 py-4 h-full"}>
      <div className="uppercase text-slate-600 px-3">{key}</div>
      <div
        ref={innerRef}
        {...props}
        className={clsx("flex flex-col gap-2 bg-slate-100 p-2 min-h-full", {
          "bg-slate-200": snapshot.isDraggingOver,
        })}
      >
        {children}
      </div>
    </div>
  );
};

const TodoItem: FC<DNDItemProps<Todo>> = ({
  item: todo,
  innerRef,
  snapshot,
  ...props
}) => {
  return (
    <div {...props} ref={innerRef}>
      <TodoCard
        {...todo}
        className={clsx({ "bg-zinc-100": snapshot.isDragging })}
        key={todo.id}
      />
    </div>
  );
};
