window.onload = function() {
    addHtmlContent();
  };

function addHtmlContent() {
    let myList = JSON.parse(localStorage.getItem('my_list'));
    let test = document.querySelector('.movies');
        test.innerHTML = '';
        for (let i = 0; i < myList.length; i++) {
            let p = "<div class='movie'><img src= " + myList[i].poster + " width='100' height='100'/><div><a onclick=showModal(" + i +")><h4>" + myList[i].title + "</h4></a><p>" + myList[i].year + "</p></div></div>";
            test.innerHTML += p;
        }
}


function showModal(index) {

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

let myList = JSON.parse(localStorage.getItem('my_list'));
let movie = myList[index];
let test = document.getElementsByClassName('modal-content')[0];
test.innerHTML = '';
let p = "<div><h4>" + myList[index].title + "</h4><p>" + myList[index].year + "</p><img src= " + myList[index].poster + " width='100' height='100'/><br><br><p>Released: " + myList[index].released + "<br>Genre: " + myList[index].genre + "<br>Director: " + myList[index].director + "<br>Actors: " + myList[index].actors + "<br>Plot:<br>" + myList[index].plot + "</p></div><button onclick=removeMovieFromMyList(" + index + ")>Remove</button>";
test.innerHTML += p;

}

function removeMovieFromMyList(index) {
    let myList = JSON.parse(localStorage.getItem('my_list'));
    // let index;
    //     for (let i=0; i < myList.length; i++) {
    //         if (myList[i].id === ID) {
    //             index = i;
    //             break;
    //         }
    //     }
    if (index > -1) {
        myList.splice(index, 1);
      }
      localStorage.setItem('my_list',JSON.stringify(myList));
}