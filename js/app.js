const app = document.getElementById("app");
const mBody = document.getElementById("modal--content");
const modal = document.getElementById("modal");
let result;
loadAllEvents();

function loadAllEvents(){
    //modal will be displayed none
    modal.style.display = "none";
    //load XHR request
    document.addEventListener("DOMContentLoaded", loadRequest)
    //modal load content
    document.addEventListener("click", loadModal)
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
    console.log(result);
    let data;
     data+=
     `
     <div>
     <p>Name : ${result.name.first} ${result.name.last}</p>
     <p>Email :${result.email}</p>
     <p>Phone :${result.phone}<p>
     <p>Street :${result.location.street}</p>
     <p>City : ${result.location.city}</p>
     <p>State :${result.location.state}</p>
     <p>Postcode :${result.location.postcode}</p>
     </div>
     `
     mBody.innerHTML = data;
    })
    modal.style.display = "block";
}