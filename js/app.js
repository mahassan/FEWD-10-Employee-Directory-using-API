const app = document.getElementById("app")
loadAllEvents();

function loadAllEvents(){
    document.addEventListener("DOMContentLoaded", loadRequest)
}

function loadRequest(){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://randomuser.me/api/?results=20", true);
    xhr.onload = function (){
        const response = JSON.parse(this.responseText);
        const result = response.results;
        console.log(result);
        let output = '';
        // Image
        // First and Last name
        // Email
        // City
        for(let person in result){
            result[person].cell
           output += `
           <a href='#'>
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