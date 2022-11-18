import { IDataChart } from "./interface";

export const totalAccountBarChart = (
  data?: IDataChart[],
  categories?: Array<string>
) => ({
  chart: {
    type: "column",
    style: {
      fontFamily: "Poppins, sans-serif",
    },
  },
  title: {
    text: "SỐ LƯỢNG TÀI KHOẢN",
  },

  yAxis: {
    title: {
      text: "Số lượng tài khoản",
    },
  },

  xAxis: {
    categories: categories,
  },
  legend: {
    itemStyle: {
      font: "9pt Trebuchet MS, Verdana, sans-serif",
    },
    itemHoverStyle: {
      color: "gray",
    },
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
        enabled: false,
      },
    },
    line: {
      dataLabels: {
        enabled: true,
        style: {
          font: "9pt Trebuchet MS, Verdana, sans-serif",
        },
      },
    },
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    shared: true,
    useHTML: true,
  },
  series: data,

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: "horizontal",
            align: "center",
            verticalAlign: "bottom",
          },
        },
      },
    ],
  },
});
