export type CardType = {
  id: string;
  content: string;
};

export type ColumnType = {
  id: string;
  title: string;
  cards: CardType[];
};
