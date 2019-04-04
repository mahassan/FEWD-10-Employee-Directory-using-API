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

function loadRequest(e){
    e.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://randomuser.me/api/?results=20", true);
    xhr.onload = function (){
        const response = JSON.parse(this.responseText);
         result = response.results;
         //console.log(result);
        let output = '';
        // Image
        // First and Last name
        // Email
        // City
        for(let person in result){
           output += `
           <a href='#${person}' id="loadModal">
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
function loadModal(e){
    let data;
   if(e.target.classList.contains("card")){
    for(let index in result){
        data=
        `
        <div class="modal--card">
        <img class="modal--img" src="${result[index].picture.large}"
        alt="${result[index].name.first} ${result[index].name.last}"/>
        <p>${result[index].name.first} ${result[index].name.last}</p>
        <p>${result[index].email}</p>
        <p>${result[index].location.city}</p>
        <hr>
        <p>${result[index].phone}<p>
        <p>${result[index].location.street}</p>
        <p>${result[index].location.state}</p>
        <p>${result[index].location.postcode}</p>
        </div>
        `
    }
    mBody.innerHTML = data;
    modal.style.display = "block";
   }
    // result.forEach((result, index)=
    //  {
    // // Image
    // // Name
    // // Email
    // // Cell Number
    // // Detailed Address, including street name and number, city, state and post code.
    // // Birthdate
    // // console.log(result , index);
   
     
    // })
}

function closeModal(){
    modal.style.display = "none"
};
