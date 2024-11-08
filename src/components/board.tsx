import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { useState } from "react";

import {
  MouseSensor,
  PointerSensor,
  TouchSensor,
} from "@/lib/dnd/custom-sensors";
import { CardType, ColumnType } from "@/types";

import { Card } from "./card";
import { Column } from "./column";
import { Button, Input } from "./ui";

export const Board = (): JSX.Element => {
  const [columns, setColumns] = useState<ColumnType[]>([
    { id: "todo", title: "To Do", cards: [] },
    { id: "inprogress", title: "In Progress", cards: [] },
    { id: "done", title: "Done", cards: [] },
  ]);
  const [newCardContent, setNewCardContent] = useState("");
  const [, setActiveCardId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const addCard = (): void => {
    if (newCardContent.trim() === "") return;

    const newCard: CardType = {
      id: Date.now().toString(),
      content: newCardContent,
    };

    const newColumns = [...columns];

    newColumns[0].cards.push(newCard);

    setColumns(newColumns);
    setNewCardContent("");
  };

  const moveCard = (
    cardId: string,
    sourceColumnId: string,
    direction: "left" | "right",
  ): void => {
    const sourceColumnIndex = columns.findIndex(
      (col) => col.id === sourceColumnId,
    );

    const targetColumnIndex =
      direction === "left" ? sourceColumnIndex - 1 : sourceColumnIndex + 1;

    if (targetColumnIndex < 0 || targetColumnIndex >= columns.length) return;

    setColumns((prevState) => {
      const newColumns = [...prevState];
      const sourceColumn = newColumns[sourceColumnIndex];
      const targetColumn = newColumns[targetColumnIndex];

      const cardIndex = sourceColumn.cards.findIndex(
        (card) => card.id === cardId,
      );

      const [movedCard] = sourceColumn.cards.splice(cardIndex, 1);

      targetColumn.cards.push(movedCard);

      return newColumns;
    });
  };

  const findColumn = (id: UniqueIdentifier | undefined): string | undefined => {
    const targetedColumn = columns.find((column) => column.id === id);

    if (targetedColumn) return targetedColumn.id;
    const targetedColumnBasedOnCard = columns.find((column) =>
      column.cards.some((card) => card.id === id),
    );

    return targetedColumnBasedOnCard?.id;
  };

  const handleDragStart = (event: DragStartEvent): void => {
    const { active } = event;
    const { id } = active;

    setActiveCardId(id);
  };

  const handleDragOver = (event: DragOverEvent): void => {
    const { active, over } = event;
    const { id: activeId } = active;
    const overId = over?.id;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    setColumns((prevColumns) => {
      const updatedColumns = [...prevColumns];

      const activeColumnObj = updatedColumns.find(
        (column) => column.id === activeColumn,
      );
      const overColumnObj = updatedColumns.find(
        (column) => column.id === overColumn,
      );

      if (!activeColumnObj || !overColumnObj) return prevColumns;

      const activeItems = [...activeColumnObj.cards];
      const overItems = [...overColumnObj.cards];

      const activeIndex = activeItems.findIndex((card) => card.id === activeId);
      const overIndex = overItems.findIndex((card) => card.id === overId);

      // Determine the new index for insertion
      const newIndex = overIndex >= 0 ? overIndex : overItems.length;

      // Remove the card from the active column
      const [movedCard] = activeItems.splice(activeIndex, 1);
      if (!movedCard) return prevColumns;

      // Insert the card into the new column at the calculated index
      overItems.splice(newIndex, 0, movedCard);

      // Update the columns with the modified card lists
      return prevColumns.map((column) => {
        if (column.id === activeColumn) {
          return { ...column, cards: activeItems };
        }
        if (column.id === overColumn) {
          return { ...column, cards: overItems };
        }
        return column;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent): void => {
    const { active, over } = event;

    if (!over) return; // Early exit if no valid drop target

    const activeColumn = findColumn(active.id);
    const overColumn = findColumn(over.id);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) return;

    const activeColumnData = columns.find((col) => col.id === activeColumn);
    if (!activeColumnData) return;

    const activeIndex = activeColumnData.cards.findIndex(
      (card) => card.id === active.id,
    );
    const overIndex = activeColumnData.cards.findIndex(
      (card) => card.id === over.id,
    );

    if (activeIndex !== overIndex) {
      setColumns((prevColumns) =>
        prevColumns.map((column) =>
          column.id === activeColumn
            ? {
                ...column,
                cards: arrayMove(column.cards, activeIndex, overIndex),
              }
            : column,
        ),
      );
    }

    setActiveCardId(null);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex space-x-2 max-w-md">
        <Input
          type="text"
          placeholder="Add a new card"
          value={newCardContent}
          onChange={(e) => setNewCardContent(e.target.value)}
          className="flex-grow"
        />
        <Button disabled={!newCardContent} onClick={addCard}>
          <Plus className="h-4 w-4" /> Add Card
        </Button>
      </div>

      <div className="mt-6 flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToWindowEdges]}
        >
          {columns.map((column, columnIndex) => (
            <Column key={column.id} column={column}>
              {column.cards.map((card) => (
                <Card
                  key={card.id}
                  card={card}
                  disableLeft={columnIndex === 0}
                  disableRight={columnIndex === columns.length - 1}
                  moveCard={(cardId, direction) =>
                    moveCard(cardId, column.id, direction)
                  }
                />
              ))}
            </Column>
          ))}
        </DndContext>
      </div>
    </div>
  );
};
