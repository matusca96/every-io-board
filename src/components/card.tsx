import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../lib/utils";
import { CardType } from "../types";
import { convertDate } from "../utils";
import { Button, Card as BaseCard, CardContent } from "./ui";

type CardProps = {
  disableLeft: boolean;
  disableRight: boolean;
  card: CardType;
  moveCard: (id: string, direction: "left" | "right") => void;
};

export const Card = ({
  disableLeft,
  disableRight,
  moveCard,
  card,
}: CardProps): JSX.Element => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <BaseCard
      className={cn(transform ? "cursor-grabbing" : "cursor-grab", "bg-white")}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <CardContent
        data-no-dnd="true"
        className="p-4 flex items-center justify-between gap-1"
      >
        <div className="flex flex-col gap-0.5">
          <span>{card.content}</span>
          <small className="text-ring/50 text-xs">{convertDate(card.id)}</small>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => moveCard(card.id, "left")}
            disabled={disableLeft}
            className={
              disableLeft
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => moveCard(card.id, "right")}
            disabled={disableRight}
            className={
              disableRight
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </BaseCard>
  );
};
