$(() => {
  console.log("Here be jquerrrrry", $);
});
const apiKey = "uhkey";
const searchURL = "https://www.googleapis.com/youtube/v3/search";

function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems.join("&");
}

function displayResults(responseJson) {
  $("#results-list").empty();

  for (let i = 0; i < responseJson.items.length; i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.items[i].snippet.title}</h3>
        <p>${responseJson.items[i].snippet.description}</p>
        <img src='${responseJson.items[i].snippet.thumbnails.default.url}'>
        </li>`
    );
  }
  $("#results").removeClass("hidden");
}
function getYouTubeVideos(query, maxResults = 10) {
  const params = {
    key: apiKey,
    q: query,
    part: "snippet",
    maxResults,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + "?" + queryString;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson))
    .catch((meow) => {
      $("#js-error-message").text(`Something went wrong: ${meow.message}`);
    });
}

$("form").submit((event) => {
  event.preventDefault();
  const searchTerm = $("#js-search-term").val();
  const maxResults = $("#js-max-results").val();
  getYouTubeVideos(searchTerm, maxResults);
});
