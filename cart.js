let plus = document.querySelector(".plus")
let minus = document.querySelector(".minus")
let product = document.querySelector(".cardd")
let jami = document.querySelector(".pricespan")

function getAllCart() {
    fetch("https://restaurant.stepprojects.ge/api/Baskets/GetAll")
    .then(pasuxi => pasuxi.json())
    .then(data => {

        let prices = data.map( item => item.product.price * item.quantity )
        
        
        if (prices.length > 0){
            let total = prices.reduce( (wina, mimdinare) =>  wina + mimdinare)
            jami.innerHTML = "$" + total
        }
        else if (prices.length == 0){

            jami.innerHTML = '$0'
            
        }
        data.forEach(item => product.innerHTML += card(item))
    })

        
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
    let tot = item.price * item.quantity
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
                        <button onclick="mimateba(${item.quantity}, ${item.product.id}, ${item.product.price})" class="plus">+</button>
                        <h1 class="tith">${item.quantity}</h1>
                        <button onclick="gamokleba(${item.quantity}, ${item.product.id}, ${item.product.price})" class="minus">-</button>
                    </div>
                    <h1 class="pricecart tith">$${item.price}</h1>
                    <h1 class="totalprice tith">$${tot}</h1>
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

function mimateba(quantity, id, price){
    quantity++
    let cartinfo = {
            "quantity": quantity,
            "price": price,
            "productId": id
    }
    fetch('https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',{
        method: 'PUT',
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartinfo)
    })
    .then(pasuxi=>pasuxi.text())
    .then(()=>{
        product.innerHTML = ''
        getAllCart()
    })
}
function gamokleba(quantity, id, price){
    quantity--
    let cartinfo = {
            "quantity": quantity,
            "price": price,
            "productId": id
    }
    fetch('https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket',{
        method: 'PUT',
        headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartinfo)
    })
    .then(pasuxi=>pasuxi.text())
    .then(()=>{
        product.innerHTML = ''
        getAllCart()
    })
}




