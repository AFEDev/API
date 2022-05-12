export function drawTable (divID, arrayOfLabels, arrayOfData) {
    let tableContainer = document.getElementById(divID);
    let table =  document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
 
    tableContainer.appendChild(table);
    table.appendChild(thead)
    thead.appendChild(tr)
 
    for (let label of arrayOfLabels) {
        let th = document.createElement('th');
        tr.appendChild(th)
        th.setAttribute('scope', "col" )
        th.innerText = label;
    }

    table.appendChild(tbody);

    for (let tableRow of arrayOfData) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr)

        for (let i=0; i< tableRow.length; i++ ) {
        let td = document.createElement('td');
        tr.appendChild(td)
        td.setAttribute('data-label', arrayOfLabels[i] )
        td.innerText = tableRow[i];
        if (i ===0) {
            td.setAttribute('scope', 'row') 
        }
        }
    }
  }

  export const getTableDateRange = (apiData) => {

    console.log(apiData);
      const date__start_value = document.getElementById("date__start_value");
  
      date__start_value.setAttribute("max", apiData.dataset.newest_available_date)
      date__start_value.setAttribute("min", apiData.dataset.oldest_available_date);
      date__start_value.setAttribute("value", apiData.dataset.newest_available_date);
  
      console.log(date__start_value.value);
  
      console.log(apiData.dataset.oldest_available_date);
      const date__end_value = document.getElementById("date__end_value")
     
      date__end_value.setAttribute("max", apiData.dataset.newest_available_date);
      date__end_value.setAttribute("min", apiData.dataset.oldest_available_date);
      date__end_value.setAttribute("value", apiData.dataset.oldest_available_date);
  
      let startDate = date__start_value.value
      date__start_value.addEventListener('input', () => {
        console.log(date__start_value.value) // 2021-03-31
        startDate = date__start_value.value
      })
     let endDate = date__end_value.value
     date__end_value.addEventListener('input', () => {
        console.log(date__end_value.value) // 2021-03-31
        endDate = date__end_value.value
      })
  
      document.getElementById("sumbitDate").addEventListener('click', () => {
        console.log(startDate);
        console.log(endDate);
        if (startDate != "" && endDate != "" && startDate > endDate) {
          
            let dataCopy = JSON.parse(JSON.stringify(apiData));
  
          console.log(apiData.dataset.data);
  
          console.log(dataCopy.dataset.data);
          let splitStart
          let splitCount
          let date = dataCopy.dataset.data
  
          for (let i=0; i<date.length; i++) {
            if (startDate <= date[date.length-1][0]){
              splitStart = i;
              console.log(date[date.length-1][0], i);
              break
            } else if (date[i][0] == startDate || startDate > date[i+1][0])  {
              splitStart = i
              console.log(date[i][0], i);
              break
            }
          }
              for (let i=date.length-1; i >= 0; i--) {
                console.log(i);
                if (endDate <= date[date.length-1][0]) {
                  splitCount = i
                  console.log(date[date.length-1][0], i);
                  break
                } else if (date[i][0] == endDate || endDate < date[i-1][0]){
              splitCount = i
              console.log(date[i][0], i);
              break
            }
            }
   
          let spliced = dataCopy.dataset.data.splice(splitStart, splitCount-splitStart);
          console.log(spliced);
          document.getElementById('table').innerHTML = ""
          drawTable('table', apiData.dataset.column_names, spliced);
          dataCopy = {
            ...apiData
          }
          console.log("date Ok");
        } else {
          console.log("date NotOk");
        }
      })
    }