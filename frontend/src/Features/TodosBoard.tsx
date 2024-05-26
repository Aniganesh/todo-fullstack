import { useStore } from "@/Store";
import { FC } from "react";
import TodoCard from "./TodoCard";
import DndBoard, {
  BoardData,
  ChangeObject,
  DNDColumnProps,
  DNDItemProps,
} from "@/components/dnd";
import clsx from "clsx";
import { Todo } from "@/api/Todos/types";

interface TodosBoardProps {}

const TodosBoard: FC<TodosBoardProps> = () => {
  const groupedTodos = useStore((state) => state.groupedTodos);
  const setGroupedTodos = useStore((state) => state.setGroupedTodos);
  const updateTodo = useStore((state) => state.updateTodo);

  const onBoardUpdate = (
    boardData: BoardData<Todo>,
    changeObject: ChangeObject
  ) => {
    setGroupedTodos(boardData);
    const updatedItem: Todo = {
      ...boardData[changeObject.destinationKey][changeObject.destinationIndex],
      status: changeObject.destinationKey,
    };
    if (updatedItem) {
      updateTodo({ ...updatedItem });
    }
  };

  return (
    <div className="flex gap-3 flex-wrap h-full py-4 justify-center">
      {Object.entries(groupedTodos).length === 0 && (
        <div className="bg-gray-100 flex h-full w-full flex-1 justify-center items-center rounded-md">
          <div className="text-center text-2xl text-gray-500">
            No todos added
          </div>
        </div>
      )}
      <DndBoard<Todo>
        boardData={groupedTodos}
        onBoardUpdate={onBoardUpdate}
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
    <div
      key={key}
      className={"flex-1 rounded-md px-3 pb-4 h-full min-w-60 max-w-96"}
    >
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
