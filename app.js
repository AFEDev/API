import { createChart } from "./src/chartConfig.js";
import { drawTable } from "./src/table.js";

let sp500;

async function  loadAPIdata (url, divForLoaderID) {
  let loader = document.getElementById('container_data')
  console.log(loader);
  loader.innerHTML = `<div class='loader'></div>`;

  const response = await fetch(url, {
    method: 'GET',
  });
  const responseResult = await response.json();
console.log(responseResult);
  if (response.ok) {
  loader.innerHTML = ""
   sp500 = responseResult;
   drawTable('table', sp500.dataset.column_names, sp500.dataset.data);
   return sp500;
  } else {
   return loader.innerHTML = response.message;
  }
}


await loadAPIdata("https://data.nasdaq.com/api/v3/datasets/BCIW/_INX.json?api_key=7MbAh2-vz5YcetMp2UrT", 'container_data')




console.log(sp500);

console.log(sp500.dataset);

   // const filterDate = [];

    const filterDate = [];
    const filterOpen = [];
    const filterHigh = [];
    const filterLow = [];
    const filterClose = [];

    sp500.dataset.data.forEach((element, i) => {
      console.log(element);
      filterDate.unshift(element[0]);
      filterOpen.unshift(element[1]);
      filterHigh.unshift(element[2]);
      filterLow.unshift(element[3]);
      filterClose.unshift(element[4]);              

    });




    function dataShowSelector(evt, dataType) {
      // Declare all variables
      let i, tabcontent, tablinks;

      // Get all elements with class="tabcontent" and hide them
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }

      // Get all elements with class="tablinks" and remove the class "active"
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      // Show the current tab, and add an "active" class to the button that opened the tab
      document.getElementById(dataType).style.display = "block";
      document.getElementById(evt).classList.add('active')

    }

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

 
    // console.log("Masyvas su Open: ", filterOpen);

    //chart --------------------------------------
    export const data = {
      labels: filterDate,
      datasets: [
        {
          label: "Open",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: filterOpen,
        },
        {
          label: "High",
          backgroundColor: "blue",
          borderColor: "blue",
          data: filterHigh,
        },
        {
          label: "Low",
          backgroundColor: "green",
          borderColor: "green",
          data: filterLow,
        },
        {
          label: "Close",
          backgroundColor: "yellow",
          borderColor: "yellow",
          data: filterClose,
        },
      ],
    };

    export  const config = {
      type: "line",
      data: data,
      options: {
        scales: {
          y: {
            grid: {
              color: "white",
              lineWidth: 0.2,
            },
            ticks: { color: "white" },
          },
  
          X: {
            grid: {
              color: "white",
              lineWidth: 0.2,
            },
            ticks: { color: "white" },
          },
        },
      },
    };
    createChart(config);


    //chart ends--------------------------------

    //values for data selector------------------------------

    const date__start_value = document.getElementById("date__start_value");

    date__start_value .setAttribute("min", sp500.dataset.start_date)
    date__start_value .setAttribute("max", sp500.dataset.end_date);

    const date__end_value = document.getElementById("date__end_value")
   
    date__end_value.setAttribute("min", sp500.dataset.start_date);
    date__end_value.setAttribute("max", sp500.dataset.end_date);


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


