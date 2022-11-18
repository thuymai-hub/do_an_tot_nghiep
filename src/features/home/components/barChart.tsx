export const totalPostBarChart = (data?: any) => ({
  chart: {
    type: "column",
    style: {
      fontFamily: "Poppins, sans-serif",
    },
  },
  title: {
    text: "SỐ LƯỢNG BÀI VIẾT",
  },
  xAxis: {
    type: "category",
    crosshair: true,
    title: {
      text: "Bài viết",
    },
    labels: {
      style: {
        fontSize: "9px",
      },
    },
  },
  yAxis: {
    title: {
      text: "Số bài viết",
    },
  },
  credits: {
    enabled: false,
  },
  legend: {
    itemStyle: {
      font: "9pt Trebuchet MS, Verdana, sans-serif",
    },
    itemHoverStyle: {
      color: "gray",
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
    footerFormat: "</table>",
    shared: true,
    useHTML: true,
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0,
      dataLabels: {
        enabled: true,
      },
    },
  },
  series: [
    {
      name: "Số bài viết",
      data: data,
    },
  ],
});
