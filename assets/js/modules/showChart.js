import { formatDate } from "./formatDate.js";

const showChart = async (results) => {
  results = results.list;
  const timestamps = results.map((entry) => {
    const date = new Date(entry.dt_txt);
    return date.toLocaleString("en-UK", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      hour12: true,
    });
  });
  const temperatures = results.map((entry) => entry.main.temp);
  let chartContainer = document.getElementById("acquisitions").getContext("2d");
  let chart = new Chart(chartContainer, {
    type: "line",
    data: {
      labels: timestamps,
      datasets: [
        {
          label: "Timestamps",
          data: temperatures,
          borderColor: "rgb(75, 192, 192)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "category",
        },
        y: {
          title: {
            display: true,
            text: "Temperature (°C)",
          },
        },
      },
    },
    backgroundColor: "white",
  });
};

export { showChart };
