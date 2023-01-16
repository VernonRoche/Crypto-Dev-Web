/**
  * get the first Y coordinate for the current context
  * @param context context of the ChartJS
  * @returns Y coord 
*/
function GetYCoords(context) {
  const chart = context.chart;
  const { data } = chart;
  return data.datasets[0].data[0];
}

/**
  * get the first X coordinate for the current context
  * @param context context of the ChartJS
  * @returns X coord 
*/
function GetXCoords(context) {
  const chart = context.chart;
  const { data } = chart;
  return data.labels[0];
}

export const option = {
  responsive: true,
  maintainAspectRation: false,
  layout: {
    autoPadding: true,
  },
  plugins: {
    tooltips: {
      enabled: false,
    },
    title: {
      text: "Bitcoin Chart",
      display: true,
    },
    legend: {
      display: false,
    },
    annotation: {
      clip: false,
      annotations: {
        dottedLine: {
          drawTime: "beforeDatasetsDraw",
          type: "line",
          yMin: (context) => {
            if (context.id === "dottedLine") {
              return GetYCoords(context);
            }
          },
          yMax: (context) => {
            if (context.id === "dottedLine") {
              return GetYCoords(context);
            }
          },
          borderDash: [1, 5],
          /* label: {
                        display: true,
                        content: ["AAZEZAE"],
                        position: 'start'
                    }*/
        },
        label1: {
          color: "white",
          type: "label",
          xValue: (context) => {
            if (context.id === "label1") {
              return GetXCoords(context);
            }
          },
          yValue: (context) => {
            if (context.id === "label1") {
              return GetYCoords(context);
            }
          },
          backgroundColor: "rgba(102,102,102,0.25)",
          content: (context) => {
            if (context.id === "label1") {
              return [Math.round(GetYCoords(context))];
            }
          },
          font: {
            size: 20,
          },
          position: "start",
        },
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
        beginAtZero: true,
      },
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
  },
};

export default option;
