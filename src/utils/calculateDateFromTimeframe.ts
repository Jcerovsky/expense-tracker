export const calculateDateFromTimeframe = (
  timeframe: "month" | "year" | "week" | "future" | "today" | "all",
) => {
  const today = new Date();
  const date = new Date();

  if (timeframe === "week") {
    date.setDate(today.getDate() - 7);
  } else if (timeframe === "month") {
    date.setMonth(today.getMonth() - 1);
  } else if (timeframe === "year") {
    date.setFullYear(today.getFullYear() - 1);
  }

  return `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};
