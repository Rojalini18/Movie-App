var tranding__url =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=503ff86bb0f7a37c90edee3c397eccff";

fetch(tranding__url)
  .then(function (res) {
    return res.json();
  })
  .then(function (res) {
    console.log(res);
    trendingMovie(res.results);
  })
  .catch(function (err) {
    console.log(err);
  });

function trendingMovie(movie) {
  var h1 = document.createElement("h1");
  h1.innerText = "Trending";
  movie.map(function (ele) {
    var div = document.createElement("div");

    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "poster");

    var img = document.createElement("img");
    img.src = `https://image.tmdb.org/t/p/original/${ele.poster_path}`;

    var infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "infoDiv");

    var name = document.createElement("p");
    name.innerText = ele.title;

    var rating = document.createElement("p");
    rating.innerHTML = `IMDB Rating: <span class="fa fa-star checked"></span> ${ele.vote_average} `;

    var type = document.createElement("p");
    type.innerText = `Type: ${ele.media_type}`;

    var divHover = document.createElement("div");
    divHover.setAttribute("class", "hoverDiv");
    var des = document.createElement("p");
    des.innerText = ele.overview;

    var date = document.createElement("p");
    date.innerHTML = `Released Date : ${ele.release_date}`;

    var lang = document.createElement("p");
    lang.innerHTML = ele.original_language;

    var a = document.createElement("a");
    a.innerText = "Watch";

    imgDiv.append(img);
    infoDiv.append(name, rating, type);

    divHover.append(date, lang, des, a);
    div.append(imgDiv, infoDiv, divHover);
    document.querySelector(".movieDetials").append(div);
  });
}

function searchMovie(str) {
  var title = document.querySelector("#movieTitle").value;
  url_search = `https://www.omdbapi.com/?apikey=eae2d946&s=${title}`;
  Getmovie(url_search, str);
}

function Getmovie(url, str) {
  fetch(url)
    .then(function (res) {
      return res.json();
    })

    .then(function (res) {
      if (res.Response == "True") {
        if (str != "button") {
          console.log(res.Search);
          searchbox(res.Search);
        } else {
          displaySearchMovie(res.Search);
        }
      } else if (str == "button") {
        document.querySelector(".movieDetials").innerHTML =
          '<iframe src="https://giphy.com/embed/UHAYP0FxJOmFBuOiC2" width="480" height="361" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>';
        var header = document.querySelector(".header");
        header.style.marginTop = 0;
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displaySearchMovie(movieData) {
  movieData.map(function (movie) {
    fetchPerticluarMovie(movie.imdbID);
  });
}

function fetchPerticluarMovie(id) {
  document.querySelector(".movieDetials").innerHTML = "";
  document.querySelector(".searchMovie").innerHTML = "";
  document.querySelector(".searchMovie + h1").innerHTML = "";
  url_movie = `https://www.omdbapi.com/?apikey=eae2d946&i=${id}`;

  fetch(url_movie)
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(res);
      displayMovie(res);
    })
    .catch(function (err) {
      console.log(err);
    });
}

function searchbox(movie) {
  var searchdiv = document.querySelector(".searchMovie");
  searchdiv.innerHTML = "";
  searchdiv.style.display = "block";

  var input = document.querySelector(".moviesearch input");
  var search = document.querySelector(".moviesearch button");

  movie.map(function (ele) {
    if (ele.Poster == "N/A") {
      return false;
    }
    var div = document.createElement("div");

    div.addEventListener("click", function () {
      searchdiv.style.display = "none";
      input.style.borderBottomLeftRadius = "30px";
      search.style.borderBottomRightRadius = "30px";
      fetchPerticluarMovie(ele.imdbID);
    });

    var img = document.createElement("img");
    img.src = ele.Poster;

    var p = document.createElement("p");
    p.innerText = ele.Title;
    div.append(img, p);
    document.querySelector(".searchMovie").append(div);

    var header = document.querySelector(".header");
    header.style.marginTop = 0;
  });

  input.style.borderBottomLeftRadius = "0px";
  search.style.borderBottomRightRadius = "0px";
}

function displayMovie(movie) {
  if (movie.Poster != "N/A") {
    var div = document.createElement("div");

    var imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "poster");

    var img = document.createElement("img");
    img.src = movie.Poster;

    if (movie.imdbRating > 8.5) {
      var recommned = document.createElement("span");
      recommned.innerText = "recommned";
      recommned.setAttribute("class", "recommned");
      imgDiv.append(recommned);
    }

    var infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "infoDiv");

    var name = document.createElement("p");
    name.innerText = movie.Title;

    var rating = document.createElement("p");
    rating.innerHTML = `IMDB Rating: <span class="fa fa-star checked"></span> ${movie.imdbRating} `;

    var type = document.createElement("p");
    type.innerText = `Type: ${movie.Type}`;

    var genre = document.createElement("p");
    genre.innerText = `Genre: ${movie.Genre}`;

    var divHover = document.createElement("div");
    divHover.setAttribute("class", "hoverDiv");

    var des = document.createElement("p");
    des.innerText = movie.Plot;

    var date = document.createElement("p");
    date.innerHTML = `Released Date : ${movie.Released}`;

    var director = document.createElement("p");
    director.innerHTML = `Movie Director : Di${movie.Director}`;

    var lang = document.createElement("p");
    lang.innerHTML = movie.Language;

    var a = document.createElement("a");
    a.innerText = "Watch";

    imgDiv.append(img);
    infoDiv.append(name, rating, type, genre);
    divHover.append(date, director, lang, des, a);
    div.append(imgDiv, infoDiv, divHover);
    document.querySelector(".movieDetials").append(div);

    var header = document.querySelector(".header");
    header.style.marginTop = 0;
    var body = document.querySelector("body");
  }
  body.style.backgroundImage = "none";
}
