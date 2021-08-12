let searchInputField = document.getElementsByName('search');
let apiKey = 'a0b18b4';

document.querySelector("input[name='search']").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      apiCall(searchInputField[0].value);
    }
});

document.querySelector(".inactive").addEventListener('click', function (e) {
    document.querySelector(".inactive").className = "active";
    document.querySelector(".active").className = "inactive";
});

document.querySelector(".active").addEventListener('click', function (e) {
    document.querySelector(".active").className = "inactive";
    document.querySelector(".inactive").className = "active";

});

function apiCall(title) {
    let url = 'http://www.omdbapi.com/?t='+title+'&apikey=' + apiKey;
    fetch(url)
        .then(response => response.json())
        .then(data => changeHtmlContent(data));
}

function changeHtmlContent(data) {
        if(localStorage.getItem('selected_movie')) {
            localStorage.removeItem('selected_movie');
        }
        let test = document.querySelector('.search-results');
        test.innerHTML = '';
        let movieObject = {'id': data.imdbID,'title': data.Title,'year': data.Year,'poster': data.Poster,'released': data.Released,'genre': data.Genre,'director': data.Director,'actors':data.Actors,'plot':data.Plot};
        localStorage.setItem('selected_movie',JSON.stringify(movieObject));

            let p = "<img src= " + data.Poster + " width='100' height='100'><a onclick=showModal()><h4>" + data.Title + "</h4></a><p>" + data.Year + "</p>"; 
            if(checkIfMovieExistInList(data.imdbID)) {
                p += '<img src="icons/icons8-star-48.png"/>';
            }
            
            test.innerHTML += p;
}

function addMovieToMyList(ID,title,year,poster,released,genre,director,actors,plot) {

    if(!(localStorage.getItem('my_list'))) {
        let myList = [{'id': ID,'title': title,'year': year,'poster': poster,'released': released,'genre': genre,'director': director,'actors':actors,'plot':plot}];
        localStorage.setItem('my_list',JSON.stringify(myList));   
    }
    else {
        let myList = JSON.parse(localStorage.getItem('my_list'));
        myList.push({'id': ID,'title': title, 'year': year, 'poster': poster,'released': released,'genre': genre,'director': director,'actors':actors,'plot':plot});
        localStorage.setItem('my_list',JSON.stringify(myList));
    } 
}

function removeMovieFromMyList(ID) {
    let myList = JSON.parse(localStorage.getItem('my_list'));
    let index;
        for (let i=0; i < myList.length; i++) {
            if (myList[i].id === ID) {
                index = i;
                break;
            }
        }
    if (index > -1) {
        myList.splice(index, 1);
      }
      localStorage.setItem('my_list',JSON.stringify(myList));
}

function checkIfMovieExistInList(ID) {
    if(localStorage.getItem('my_list') !== null) {
    let myList = JSON.parse(localStorage.getItem('my_list'));
    let index = -1;
        for (let i=0; i < myList.length; i++) {
            if (myList[i].id === ID) {
                index = i;
                break;
            }
        }
    return index !== -1 ? true : false;
    }
    return false;
}

function showModal() {
        // Get the modal
let modal = document.getElementById("myModal");

// When the user clicks on the movie, open the modal
  modal.style.display = "block";

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let movie = JSON.parse(localStorage.getItem('selected_movie'));
let test = document.getElementsByClassName('modal-content')[0];
test.innerHTML = '';
let p = "<div><h4>" + movie.title + "</h4><p>" + movie.year + "</p><img src= " + movie.poster + " width='100' height='100'/><br><br><p>Released: " + movie.released + "<br>Genre: " + movie.genre + "<br>Director: " + movie.director + "<br>Actors: " + movie.actors + "<br>Plot:<br>" + movie.plot + "</p></div>";

if(!checkIfMovieExistInList(movie.id)) {
    p += '<button onclick=sendMovieToMyList()>Add To My List</button>';
}

test.innerHTML += p;
}

function sendMovieToMyList() {
    let movie = JSON.parse(localStorage.getItem('selected_movie'));
    addMovieToMyList(movie.id,movie.title,movie.year,movie.poster,movie.released,movie.genre,movie.director,movie.actors,movie.plot);
}