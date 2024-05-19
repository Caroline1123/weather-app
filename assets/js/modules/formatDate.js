const formatDate = (date) => {
  date = new Date(date);
  return date.toLocaleString("en-UK", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};


export { formatDate };
