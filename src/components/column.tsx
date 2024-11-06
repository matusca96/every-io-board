import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { ColumnType } from "../types";

type ColumnProps = {
  children: React.ReactNode;
  column: ColumnType;
};

export const Column = ({ children, column }: ColumnProps): JSX.Element => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <SortableContext
      id={column.id}
      key={column.id}
      items={column.cards}
      strategy={verticalListSortingStrategy}
    >
      <div ref={setNodeRef} className="h-full bg-secondary p-4 rounded-md">
        <h2 className="font-semibold text-ring text-lg mb-4">{column.title}</h2>

        <div className="space-y-2">{children}</div>
      </div>
    </SortableContext>
  );
};
