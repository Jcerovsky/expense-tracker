export const getDate = () => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const date = String(new Date().getDate()).padStart(2, "0");
  return `${year}-${month}-${date}`;
};
