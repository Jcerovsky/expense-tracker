export const getDate = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const date = String(new Date().getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};

export const getYesterdayDate = () => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (today.getDate() === 1) {
    yesterday.setMonth(today.getMonth(), 0);
  }
  return `${String(yesterday.getFullYear())}-${String(
    yesterday.getMonth() + 1,
  ).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
};
