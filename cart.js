let plus = document.querySelector(".plus")
let minus = document.querySelector(".minus")
let product = document.querySelector(".cardd")

function getAllCart() {
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then(pasuxi => pasuxi.json())
    .then(data => {
        console.log(data);
        
        data.forEach(item => product.innerHTML += card(item))})
}

getAllCart()



    
    
function gotoCart() {
    window.location.href = "./cart.html"
}
function gotoHome() {
    window.location.href = "./index.html"
}
function gotoMenu() {
    window.location.href = "./menu.html"
}




function card(item){
    return  `<div class="card">
                <div class="cardleft">
                    <div class="x">
                        <i onclick="washla(${item.product.id})" class="fa-solid fa-xmark"></i>
                        <i class="fa-solid fa-pencil"></i>
                    </div>
                    <div class="namim">
                        <img class="cardphoto" src="${item.product.image}" alt="">
                        <h1 class="cardh">${item.product.name}</h1>
                    </div>
                </div>
                <div class="cardright">
                    <div class="amount">
                        <button onclick="mimateba()" class="plus">+</button>
                        <h1 class="tith">${item.quantity}</h1>
                        <button onclick="gamokleba()" class="minus">-</button>
                    </div>
                    <h1 class="pricecart tith">$${item.price}</h1>
                    <h1 class="totalprice tith">$10</h1>
                </div>
            </div>`
}

function washla(id){


   
    fetch(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${id}`, {
    
        method: 'DELETE',
        headers: {
            accept: '*/*'
        }
    
    })
    .then(pasuxi =>  pasuxi.text())
    .then(() => {
        product.innerHTML = ""
        getAllCart()
    })
}