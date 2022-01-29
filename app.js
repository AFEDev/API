fetch(
  "https://data.nasdaq.com/api/v3/datasets/BCIW/_INX.json?api_key=7MbAh2-vz5YcetMp2UrT"
)
  .then((response) => response.json())
  .then((sp500data) => {
    sp500 = sp500data;
    console.log(sp500);
    //console.log(sp500.dataset.data[5]);

    let filterDate = [];
    const filterOpen = [];
    const filterHigh = [];
    const filterLow = [];
    const filterClose = [];

    sp500.dataset.data.forEach((element, i) => {
      // console.log(sp500.dataset.data[0][0]);
      filterDate.unshift(sp500.dataset.data[i][0]);
      filterOpen.unshift(sp500.dataset.data[i][1]);
      filterHigh.unshift(sp500.dataset.data[i][2]);
      filterLow.unshift(sp500.dataset.data[i][3]);
      filterClose.unshift(sp500.dataset.data[i][4]);
      //console.log(element);
      // console.log(typeof element);
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
      // evt.currentTarget.className += " active";
    }

    const buttonTable = document
      .getElementById("show_table")
      .addEventListener("click", () => {
        dataShowSelector(buttonTable, "data_table_container");
      });

    const buttonChart = document
      .getElementById("show_chart")
      .addEventListener("click", () => {
        dataShowSelector(buttonChart, "data_chart_container");
      });

    // console.log("Masyvas su data: ", filterDate);
    // console.log("Masyvas su Open: ", filterOpen);

    sp500.dataset.column_names.forEach((element) => {
      const data_table_column_names = document.querySelector(
        ".data_table_column_names"
      );
      const div_name = document.createElement("div");
      data_table_column_names.appendChild(div_name);
      div_name.innerText = element;
      div_name.classList.add("row_element");
    });

    sp500.dataset.data.forEach((element) => {
      const data_table_column_data = document.querySelector(
        ".data_table_column_data"
      );
      const div_container = document.createElement("div");
      data_table_column_data.appendChild(div_container);
      div_container.classList.add("data_row");
      element.forEach((value) => {
        const div_data = document.createElement("div");
        div_container.appendChild(div_data);
        div_data.innerText = value;
        div_data.classList.add("row_element");
      });
    });

    //chart --------------------------------------

    const labels = filterDate;

    const data = {
      labels: labels,
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

    const config = {
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

    function addData(chart, label, data) {
      chart.data.labels.push(label);
      chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
      chart.update();
    }

    function updateConfigByMutating(chart) {
      chart.options.plugins.title.text = "new title";
      chart.update();
    }

    function removeData(chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      chart.update();
    }

    const myChart = new Chart(document.getElementById("myChart"), config);

    //chart ends--------------------------------

    //values for data selector------------------------------

    const date__start_value = document.getElementById("date__start_value");
    const date__end_value = document.getElementById("date__end_value");

    date__start_value.setAttribute("value", sp500.dataset.start_date);
    date__start_value.setAttribute("min", sp500.dataset.start_date);
    date__start_value.setAttribute("max", sp500.dataset.end_date);

    date__end_value.setAttribute("value", sp500.dataset.end_date);
    date__end_value.setAttribute("min", sp500.dataset.start_date);
    date__end_value.setAttribute("max", sp500.dataset.end_date);

    let a = "";

    date__start_value.addEventListener("change", function () {
      a = this.value;
    });

    //data filter experimental

    function hammingDist(str1, x) {
      for (let i = 0; i < str1.length; i++) {
        if (str1[i] != x) str1.shift(i);
      }
      return str1;
    }

    console.log(filterDate);
  });
