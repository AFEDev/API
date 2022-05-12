export class ChartData {

    constructor (APIdataObj) {
      console.log(APIdataObj);
    this.APIdata = APIdataObj
    this.filterDate = [];
    this.filterOpen = [];
    this.filterHigh = [];
    this.filterLow = [];
    this.filterClose = [];
    }
  
    getDataForChart() {
        this.APIdata.dataset.data.forEach((element) => {
        this.filterDate.unshift(element[0]);
        this.filterOpen.unshift(element[1]);
        this.filterHigh.unshift(element[2]);
        this.filterLow.unshift(element[3]);
        this.filterClose.unshift(element[4]);              
      });
    }

    data() {
        this.getDataForChart();
        return {
            labels: this.filterDate,
            datasets: [
              {
                label: "Open",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: this.filterOpen,
              },
              {
                label: "High",
                backgroundColor: "blue",
                borderColor: "blue",
                data: this.filterHigh,
              },
              {
                label: "Low",
                backgroundColor: "green",
                borderColor: "green",
                data: this.filterLow,
              },
              {
                label: "Close",
                backgroundColor: "yellow",
                borderColor: "yellow",
                data: this.filterClose,
              },
            ],
          };
    }

    config() {
        return {
        type: "line",
        data: this.data() ,
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
  }
  createChart () {
    const myChart = new Chart(document.getElementById("myChart"), this.config());
    return myChart;
   }

}





   