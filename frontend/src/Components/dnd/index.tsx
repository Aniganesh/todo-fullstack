import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
  DraggableStateSnapshot,
  DroppableProvidedProps,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { reorder, move } from "./utils";
import { FC, PropsWithChildren } from "react";

export type BoardId = string;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ItemBaseType = { id: string; [key: string]: any };
export type BoardData<T extends ItemBaseType> = Record<BoardId, T[]>;

export type DNDColumnProps = PropsWithChildren<
  Partial<DroppableProvidedProps>
> & {
  snapshot: DroppableStateSnapshot;
  colKey: string;
  innerRef: (element?: HTMLElement | null | undefined) => void;
};
export type DNDItemProps<T extends ItemBaseType> =
  Partial<DraggableProvidedDraggableProps> &
    (Partial<DraggableProvidedDragHandleProps> | null) & {
      snapshot: DraggableStateSnapshot;
      innerRef: (element?: HTMLElement | null | undefined) => void;
      item: T;
    };

export type ChangeObject = {
  sourceIndex: number;
  destinationIndex: number;
  sourceKey: string;
  destinationKey: string;
};

export interface DndBoardProps<T extends ItemBaseType> {
  boardData: BoardData<T>;
  onBoardUpdate: (boardData: BoardData<T>, changeObject: ChangeObject) => void;
  ColumnComponent: FC<DNDColumnProps>;
  ItemComponent: FC<DNDItemProps<T>>;
}

function DndBoard<T extends ItemBaseType>({
  boardData,
  onBoardUpdate,
  ItemComponent,
  ColumnComponent,
}: DndBoardProps<T>) {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sourceKey = source.droppableId;
    const destinationKey = destination.droppableId;
    const changeObject = {
      sourceIndex: source.index,
      destinationIndex: destination.index,
      sourceKey,
      destinationKey,
    };
    if (sourceKey === destinationKey) {
      const items = reorder(
        boardData[sourceKey],
        source.index,
        destination.index
      );
      const newBoardData = { ...boardData };
      newBoardData[sourceKey] = items;
      onBoardUpdate(newBoardData, changeObject);
    } else {
      const result = move(
        boardData[sourceKey],
        boardData[destinationKey],
        source,
        destination
      );
      const newState = { ...boardData };
      newState[sourceKey] = result[sourceKey];
      newState[destinationKey] = result[destinationKey];

      onBoardUpdate(newState, changeObject);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} autoScrollerOptions={{}}>
      {Object.entries(boardData).map(([key, data]) => (
        <Droppable key={key} droppableId={key}>
          {(provided, snapshot) => (
            <ColumnComponent
              colKey={key}
              innerRef={provided.innerRef}
              snapshot={snapshot}
              {...provided.droppableProps}
            >
              {data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ItemComponent
                      item={item}
                      innerRef={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      snapshot={snapshot}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ColumnComponent>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}

export default DndBoard;
