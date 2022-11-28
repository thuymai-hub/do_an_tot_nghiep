import { IDataChart } from "./interface";

// export const totalAccountBarChart = (
//   data?: IDataChart[],
//   categories?: Array<string>
// ) => ({
//   chart: {
//     type: "pie",
//     style: {
//       fontFamily: "Poppins, sans-serif",
//     },
//   },
//   title: {
//     text: "SỐ LƯỢNG TÀI KHOẢN",
//   },

//   yAxis: {
//     title: {
//       text: "Số lượng tài khoản",
//     },
//   },

//   xAxis: {
//     categories: categories,
//   },
//   legend: {
//     itemStyle: {
//       font: "9pt Trebuchet MS, Verdana, sans-serif",
//     },
//     itemHoverStyle: {
//       color: "gray",
//     },
//   },
//   plotOptions: {
//     series: {
//       label: {
//         connectorAllowed: false,
//         enabled: false,
//       },
//     },
//     line: {
//       dataLabels: {
//         enabled: true,
//         style: {
//           font: "9pt Trebuchet MS, Verdana, sans-serif",
//         },
//       },
//     },
//   },
//   credits: {
//     enabled: false,
//   },
//   tooltip: {
//     shared: true,
//     useHTML: true,
//   },
//   series: data,

//   responsive: {
//     rules: [
//       {
//         condition: {
//           maxWidth: 500,
//         },
//         chartOptions: {
//           legend: {
//             layout: "horizontal",
//             align: "center",
//             verticalAlign: "bottom",
//           },
//         },
//       },
//     ],
//   },
// });

export const totalAccountBarChart = (data?: any) => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    style: {
      fontFamily: "Poppins, sans-serif",
    },
    plotShadow: false,
    type: "pie",
  },
  title: {
    text: "SỐ LƯỢNG TÀI KHOẢN",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
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
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<br>{point.percentage:.1f} %",
        distance: -50,
        filter: {
          property: "percentage",
          operator: ">",
          value: 4,
        },
      },
      showInLegend: true,
    },
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      name: "Brands",
      colorByPoint: true,
      data: data,
    },
  ],
});
