let allProducts = document.querySelector(".allproducts")
let ul = document.querySelector("ul")
let sicxare = document.querySelector("#sicxare");
let nuts = document.querySelector("#nuts");
let vegan = document.querySelector("#vegan");

function GetAll() {
    allProducts.innerHTML = ""
    fetch('https://restaurant.stepprojects.ge/api/Products/GetAll')
    .then(pasuxi => pasuxi.json())
    .then(data => {
        console.log(data);
        
        data.forEach(item => allProducts.innerHTML += card(item))})
    .catch(()=> allProducts.innerHTML = 'კავშირის პრობლემა')
}

GetAll()

fetch("https://restaurant.stepprojects.ge/api/Categories/GetAll")
.then(pasuxi => pasuxi.json())
.then(data => data.forEach(item => ul.innerHTML += `<button class="li" onclick="getFoods(${item.id})"> ${item.name} </button>`))


function getFoods(id) {
    allProducts.innerHTML = ""
    fetch(`https://restaurant.stepprojects.ge/api/Categories/GetCategory/${id}`)
        .then(pasuxi => pasuxi.json())
        .then(data => data.products.forEach(item => allProducts.innerHTML += card(item)))
}


function noreload(e) {
    e.preventDefault()
}





function card(item) {
    let nut
    let veg
    if(item.nuts){
        nut = 'checked'
    }
    else{
        nut = ''
    }
    if(item.vegeterian){
        veg = 'checked'
    }
    else{
        veg = ''
    }
    return `<div class="card">
        <img class="surati" src="${item.image}" alt="">
        <h1 class="title">${item.name}</h1>
        <p class="spiciness">Spiciness: ${item.spiciness}</p>
        <div class="inputs">
            <input ${nut} disabled type="checkbox">
            <label class="label" for="">Nuts</label>
            <input ${veg} disabled type="checkbox">
            <label class="label" for="">Vegeterian</label>
        </div>
        <div class="end">
            <h1 class="fasi">$ ${item.price}</h1>
            <button class="add">Add to cart</button>
        </div>
    </div>`
}

function filter() {
  let spicines;
  if (sicxare.value == "-1") {
    spicines = "";
  } else {
    spicines = sicxare.value;
  }

  fetch(
    `https://restaurant.stepprojects.ge/api/Products/GetFiltered?vegeterian=${vegan.checked}&nuts=${nuts.checked}&spiciness=${spicines}`
  )
    .then((pasuxi) => pasuxi.json())
    .then((finalData) => {
        allProducts.innerHTML = ""
        if( finalData.length == 0 ) {
            section.innerHTML = `<h1> No FOOD... </h1>` 
        }
        else {
            finalData.forEach((food) => (allProducts.innerHTML += card(food)));
        }
      
    });
}