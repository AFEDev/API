import { ChartData } from "./src/chartConfig.js";
import { drawTable } from "./src/table.js";
import {dataShowSelector} from "./src/components.js"



async function  loadAPIdata (url) {
  let loader = document.getElementById('container_data')

 loader.innerHTML = `<div class='loader_big'></div>`;

 const controller = new AbortController()

 const timeoutId = setTimeout(() => controller.abort(), 5000)

 fetch(url, { signal: controller.signal })
.then(async response => {
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
  chartData.createChart()
  console.log(responseResult);
  return responseResult;
})
.catch(error => {
  loader.innerHTML = `<div class='container_error_message'>Server Error</div>`

});
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

    //values for data selector------------------------------

    // const date__start_value = document.getElementById("date__start_value");


    // date__start_value .setAttribute("min", apiData.dataset.start_date)
    // date__start_value .setAttribute("max", apiData.dataset.end_date);

    // const date__end_value = document.getElementById("date__end_value")
   
    // date__end_value.setAttribute("min", apiData.dataset.start_date);
    // date__end_value.setAttribute("max", apiData.dataset.end_date);


    let startDate
    date__start_value.addEventListener('input', () => {
      console.log(date__start_value.value) // 2021-03-31
      startDate = date__start_value.value
    })
   let endDate
   date__end_value.addEventListener('input', () => {
      console.log(date__end_value.value) // 2021-03-31
      endDate = date__end_value.value
    })

    document.getElementById("sumbitDate").addEventListener('click', () => {
      console.log(startDate);
      console.log(endDate);
      if (startDate != "" && endDate != "" && startDate < endDate) {
        console.log("date Ok");
      } else {
        console.log("date NotOk");
      }
    })



    //TODO data filter

    function hammingDist(str1, x) {
      for (let i = 0; i < str1.length; i++) {
        if (str1[i] != x) str1.shift(i);
      }
      return str1;
    }


