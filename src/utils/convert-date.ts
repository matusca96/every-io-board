export const convertDate = (timestamp: string): string => {
  const date = new Date(Number(timestamp));

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedTime = `Created at ${hours}:${minutes}:${seconds}`;

  return formattedTime;
};
