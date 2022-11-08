async function getCountries() {
    let response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json()
    renderAllCountries(data)
  }


 

  async function getRegionCountries() {
    var region = document.getElementById("mySelect").value;
    let response = await fetch("https://restcountries.com/v3.1/region/"+ region);
    const data = await response.json()
    console.log(data)
    renderRegionCountries(data)
    
  }

  async function getCountry(country) {
    try {
        const response = await fetch('https://restcountries.com/v3.1/name/' + country);
        if(!response.ok)
            throw new Error("ülke bulunamadı");
        const data = await response.json();
        console.log(data)
        renderCountry(data[0]);


        const countries = data[0].borders;
        if(!countries) 
            throw new Error("komşu ülke bulunamadı.");

        const response2 = await fetch('https://restcountries.com/v3.1/alpha?codes=' + countries.toString());
        const neighbors = await response2.json();

        renderNeighbors(neighbors);
    }
    catch(err) {
        renderError(err);
    }
}

function renderError(err) {
    const html = `
        <div class="alert alert-danger">
            ${err.message}
        </div>
    `;
    setTimeout(function() {
        document.querySelector("#errors").innerHTML = "";
    }, 3000);
    document.querySelector("#errors").innerHTML = html;
}
document.querySelector("#btnSearch").addEventListener("click", () => {
    let text = document.querySelector("#txtSearch").value;
    document.querySelector("#details").style.display = "block";
    getCountry(text);
});

function getClickCountry(value){
    let text = `germany`
    getCountry(value);       
    document.querySelector("#details").style.display = "block";
    console.log(value)
}

function renderCountry(data) {        
    document.querySelector("#country-details").innerHTML = "";
    document.querySelector("#neighbors").innerHTML = "";
   
    let html = `                   
            <div class="col-4">
                <img src="${data.flags.png}" alt="" class="img-fluid">
            </div>
            <div class="col-8">
                <h3 class="card-title">${data.name.common}</h3>
                <hr>
                <div class="row">
                    <div class="col-4">Nufüs: </div>
                    <div class="col-8">${(data.population / 1000000).toFixed(1)} milyon</div>
                </div>
                <div class="row">
                    <div class="col-4">Resmi Dil: </div>
                    <div class="col-8">${Object.values(data.languages)}</div>
                </div>
                <div class="row">
                    <div class="col-4">Başkent: </div>
                    <div class="col-8">${data.capital[0]}</div>
                </div>
                <div class="row">
                    <div class="col-4">Para Birimi: </div>
                    <div class="col-8">${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</div>
                </div>
            </div>
    `;            
    
    document.querySelector("#allCountries").style.display = "none";

    document.querySelector("#country-details").innerHTML = html;       
}
function renderNeighbors(data) {
    let html = "";
    for(let country of data) {
        html += `
            <div class="col-md-2 mt-2">
                <div class="card">
                    <img src="${country.flags.png}" class="card-img-top">
                    <div class="card-body">
                        <button onclick="getClickCountry(this.value)" value="${country.name.common}" class="card-title btn">${country.name.common}</button>
                    </div>
                </div>
            </div>
        `;
        
    }
    document.querySelector("#neighbors").innerHTML =  html;
}

  let renderAllCountries = (data) =>{
    let html = "";
    for(let country of data) {
        html += `
            <div class="col-lg-2 col-md-3 mt-2">
                <div class="card" >
                    <img src="${country.flags.png}" class="card-img-top">
                    <div class="card-body">
                        <button class="card-title btn"  onclick="getClickCountry(this.value)" value="${country.name.common}" >${country.name.common}</h6>
                    </div>
                </div>
            </div>
        `;
        
    }
    document.querySelector("#allCountries").style.display = "flex";
    document.querySelector("#details").style.display = "none";
    document.querySelector("#allCountries").innerHTML =  html; 
  }
  
  let renderRegionCountries = (data) =>{
    let html = "";
    for(let country of data) {
        html += `
            <div class="col-lg-2 col-md-3 mt-2">
                <div class="card" ">
                    <img src="${country.flags.png}" class="card-img-top">
                    <div class="card-body">
                    <button class="card-title btn"  onclick="getClickCountry(this.value)" value="${country.name.common}" >${country.name.common}</h6>
                    </div>
                </div>
            </div>
        `;
        
    }
    document.querySelector("#allCountries").style.display = "flex";
    document.querySelector("#details").style.display = "none";
    document.querySelector("#allCountries").innerHTML =  html; 
  }
