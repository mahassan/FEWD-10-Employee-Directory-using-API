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
        let output = `
        <div style="width: 100%;">
        <h4>AWESOME STARTUP EMPLOYEE DIRECTORY</h4>
        </div>
        `;
        // Image
        // First and Last name
        // Email
        // City
        // Birthday
        for(let person in result){
           output += `
           <a href='#' id="loadModal">
            <div class="card" data-index="${person}">
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
     let cardIndex = e.target.getAttribute("data-index");
   if(e.target.classList.contains("card")){
        data=
        `
        <div class="modal--card">
        <img class="modal--img" src="${result[cardIndex].picture.large}"
        alt="${result[cardIndex].name.first} ${result[cardIndex].name.last}"/>
        <p>${result[cardIndex].name.first} ${result[cardIndex].name.last}</p>
        <p>${result[cardIndex].email}</p>
        <p>${result[cardIndex].location.city}</p>
        <hr>
        <p>${result[cardIndex].phone}<p>
        <p>${result[cardIndex].location.street}</p>
        <p>${result[cardIndex].location.state}</p>
        <p>${result[cardIndex].location.postcode}</p>
        <p>${new Date(Date.parse(result[cardIndex].dob.date)).toLocaleDateString(navigator.language)}</p>
        </div>
        `
    mBody.innerHTML = data;
    //Might do EE later
    // pre.addEventListener("click", function(){
    //    if(result.length < 1){
    //       console.log("no result");
    //    }else{
    //        console.log(result.length--);
    //    }
    // })
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
