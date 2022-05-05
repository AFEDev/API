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