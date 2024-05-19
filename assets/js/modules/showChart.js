const showChart = async (results) => {
  const chartArea = document.querySelector(".chart");
  chartArea.style.display = "flex";

  results = results.list;
  // Deletes any existing instance of Chart
  let existingChart = Chart.getChart("acquisitions");
  if (existingChart) {
    existingChart.destroy();
  }
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
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          type: "category",
          title: {
            display: true,
            text: "Timeline",
          },
          ticks: {
            display: false,
          },
        },
        y: {
          title: {
            display: true,
            text: "Temperature (°C)",
          },
        },
      },
    },
  });
};

export { showChart };
