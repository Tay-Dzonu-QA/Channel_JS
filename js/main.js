fetch("http://localhost:9005/tvShow/read")
  .then(function (response) {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }

    // Examine the text in the response
    response.json().then(function (TvShowData) {
      console.log(TvShowData);

      let table = document.querySelector("#TVTable");
      let data = Object.keys(TvShowData[0]);

      createTableHead(table, data);
      createTableBody(table, TvShowData);
    });
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });

function createTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
  let th2 = document.createElement("th");
  let text2 = document.createTextNode("View")
  th2.appendChild(text2);
  row.appendChild(th2);
}
function createTableBody(table, TvShowData) {
  for (let element of TvShowData) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
    let newCell = row.insertCell();
    let myViewButton = document.createElement("a");
    myViewButton.className="btn btn-warning";
    myViewButton.innerHTML="View";
    myViewButton.href= "record.html?id="+element.id;
    newCell.appendChild(myViewButton);
  }
}
