import { ChartData } from "./src/chartConfig.js";
import { drawTable, getTableDateRange } from "./src/table.js";
import {dataShowSelector} from "./src/components.js"



async function  loadAPIdata (url) {
  let loader = document.getElementById('container_data')

 loader.innerHTML = `<div class='loader_big'></div>`;

 const controller = new AbortController()
 const timeoutId = setTimeout(() => controller.abort(), 5000)
 console.log(timeoutId);

 fetch(url, { signal: controller.signal })
.then(response => {
  if (!response.ok) {
    loader.innerHTML = `<div class='container_error_message'>Server Error</div>`
  }
 return response.json();
}) 
.then(response => {
  const responseResult = response
  loader.innerHTML = ""
  drawTable('table', responseResult.dataset.column_names, responseResult.dataset.data);
  const chartData = new ChartData(responseResult);
  chartData.createChart();
  getTableDateRange(responseResult);
  console.log();
  return responseResult.dataset
})
.catch(error => {
  loader.innerHTML = `<div class='container_error_message'>Server Error</div>`
})
}

const apiData =  await loadAPIdata("https://data.nasdaq.com/api/v3/datasets/BCIW/_INX.json?api_key=7MbAh2-vz5YcetMp2UrT");




    dataShowSelector("show_table", "table")

    const buttonTable = document
      .getElementById("show_table")
      .addEventListener("click", () => {
        dataShowSelector("show_table", "table");
      });

    const buttonChart = document
      .getElementById("show_chart")
      .addEventListener("click", () => {
          dataShowSelector("show_chart", "data_chart_container");
      });

   // values for data selector------------------------------



