const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDate = (date) => {
  date = new Date(date);
  const dayIndex = date.getDay();
  const d = date.getDate();
  let m = date.toLocaleString("default", { month: "long" });
  return `${days[dayIndex]}, ${d} ${m}`;
};

export { formatDate };
