const params = new URLSearchParams(window.location.search);
for (const param of params) {
  console.log(param);
  let id = param[1];
  getOne(id);
}
function getOne(id) {
  fetch("http://localhost:9005/tvShow/read/" + id)
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

        document.getElementById("TVShowId").value = TvShowData.id;
        document.getElementById("TVShowName").value = TvShowData.name;
        document.getElementById("TVRunTimeMins").value = TvShowData.runTimeMins;
        document.getElementById("TVShowGenre").value=TvShowData.genre;
      });
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}

document.querySelector("form.TVShowRecord").addEventListener("submit", function (stop) {
    stop.preventDefault();

    let formElements = document.querySelector("form.TVShowRecord").elements;
     console.log(formElements);
    let id=formElements["TVShowId"].value;
    let name=formElements["TVShowName"].value;
    let runTimeMins=formElements["TVRunTimeMins"].value;
    let genre=formElements["TVShowGenre"].value;

    updateTVShow(id,name,runTimeMins,genre)
  });

  function updateTVShow(id,name,runTimeMins,genre){
    fetch("http://localhost:9005/tvShow/update/"+id, {
        method: 'put',
        headers: {
          "Content-type": "application/json"
        },
        body: json = JSON.stringify({
            "id": id,
            "name": name,
            "runTimeMins": runTimeMins,
            // "channel":{
            //     "id":1
            // },
            "genre": genre
        })
      })
      .then(json)
      .then(function (data) {
        console.log('Request succeeded with JSON response', data);
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }