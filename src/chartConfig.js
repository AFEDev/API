
//  function addData {
//   handler(chart) {
//     const data = chart.data;
//     if (data.datasets.length > 0) {
//       data.labels = Utils.months({count: data.labels.length + 1});

//       for (let index = 0; index < data.datasets.length; ++index) {
//         data.datasets[index].data.push(Utils.rand(-100, 100));
//       }

//       chart.update();
//     }
//   }
//  }



export function createChart (config) {
 const myChart = new Chart(document.getElementById("myChart"), config);
 return myChart;
}