

API ="https://www.omdbapi.com/?apikey=f02568e8&s=avengers"

const movieForm=document.querySelector("#movie-form");
const movieInput=document.querySelector("#movie-input");
const movieHub=document.querySelector("#movie-hub");

movieForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    let query =movieInput.value.trim();
    

    if(!query){
        return
    }

    console.log(query);
    SearchMovie(query);

})


async function SearchMovie(movieName){
    movieHub.innerHTML=`<p>Searching Movie...</p>`
    let response =await fetch(`https://www.omdbapi.com/?apikey=f02568e8&s=${movieName}`)
    let data= await response.json();
    console.log(data);
    if(data.Response==="True"){
        displayMovie(data.Search);

    }
    else {
        movieHub.innerHTML=`<p>${data.Error}</p>`
    }

    
}

function displayMovie(data){
    
    movieHub.innerHTML="";
    data.forEach((movie) => {
        const div=document.createElement("div")

        div.dataset.imdbID=movie.imdbID;
        div.setAttribute("class","movie-card")

        div.innerHTML=
                `
                  <div>
                        <img src=${movie.Poster} 

                        alt="" width="200px">
                    </div>  
                    <div>
                        <p>${movie.Title} </p>
                        <p>${movie.Year}</p>
                    </div>
                    `


    movieHub.append(div)
        
    });

}


movieHub,addEventListener("click",(e)=>{
    e.stopPropagation();

    const movieCard= e.target.closest(".movie-card");

    const imdbID=movieCard.dataset.imdbID;
    
    location.href=`movieDetails.html?id=${imdbID}`;
})