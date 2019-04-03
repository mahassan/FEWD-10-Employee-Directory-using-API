const app = document.getElementById("app");
const mBody = document.getElementById("modal--content");
const modal = document.getElementById("modal");
const anchor = document.querySelector("#modal--header").children[0];
let result;
loadAllEvents();

function loadAllEvents(){
    //modal will be displayed none
    modal.style.display = "none";
    //load XHR request
    document.addEventListener("DOMContentLoaded", loadRequest)
    //modal load content
    app.addEventListener("click", loadModal);
    //close
    anchor.addEventListener("click", closeModal)
}

function loadRequest(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://randomuser.me/api/?results=20", true);
    xhr.onload = function (){
        const response = JSON.parse(this.responseText);
         result = response.results;
        let output = '';
        // Image
        // First and Last name
        // Email
        // City
        for(let person in result){
           output += `
           <a href='#' id="loadModal">
            <div class="card">
                <div>
                    <img  class="card-img" src="${result[person].picture.medium}"
                    alt="${result[person].name.first} ${result[person].name.last}"/>
                </div>
                <div class="card-info">
                    <h5>${result[person].name.first} ${result[person].name.last}</h5>
                    <p>${result[person].email}</p>
                    <p>${result[person].location.city}</p>
                </div>
            </div>
            </a>
           `
        }

        app.innerHTML = output;
    }
    xhr.send();
}
function loadModal(){
    result.forEach((result)=> {
    // Image
    // Name
    // Email
    // Cell Number
    // Detailed Address, including street name and number, city, state and post code.
    // Birthdate
    let data;
     data+=
     `
     <div class="modal--card">
     <img class="modal--img" src="${result.picture.large}"
     alt="${result.name.first} ${result.name.last}"/>
     <p>${result.name.first} ${result.name.last}</p>
     <p>${result.email}</p>
     <p>${result.location.city}</p>
     <hr>
     <p>${result.phone}<p>
     <p>${result.location.street}</p>
     <p>${result.location.state}</p>
     <p>${result.location.postcode}</p>
     </div>
     `
     mBody.innerHTML = data;
    })
    modal.style.display = "block";
    if(modal.style.display = "block"){
        modalState = true;
    }
}

function closeModal(){
    modal.style.display = "none"
};
