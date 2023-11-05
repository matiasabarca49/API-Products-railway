const renderProducts = (ticket, cart, user)=>{
    const contProducts = document.getElementById('contCart')
    contProducts.innerHTML= ""
    cart.products.forEach(item => {
        const div = document.createElement('div')
        div.className= " col-2 col-6 col-sm-4 card  mb-3 flex-grow-1 shadow"
        div.style.maxWidth= "18rem"
        div.innerHTML= 
                    `
                        <div class="card-header bg-transparent ">
                            <p class="card-text"><small class="text-body-secondary">${item.product.category}</small>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title fs-4 text fw-bold">${item.product.title}</h5>
                            <p class="card-text">${item.product.description}</p>
                        </div>
                        <div class="card-footer bg-transparent fs-4 text d-flex justify-content-between align-items-center">
                            <h4 class="text-body-tertiary">Cantidad: ${item.quantity}</h4>
                            <h4>$${item.product.price * item.quantity}</h4> 
                        </div>
                    `
        contProducts.appendChild(div)
    });
    //Info
    const info = document.getElementById('infoID')
    info.innerHTML= `
        <h4>Comprado por: ${user.name} ${user.lastName}</h4>
        <h4>Código: ${ticket.code}</h4>
        <h4>Fecha de Compra: ${ticket.purchase_datetime}</h4>
    `
    const mail = document.getElementById('mailID')
    mail.innerHTML = `<p>Se ha enviado un mail al correo ${ticket.purchaser} con los datos de la compra.</p>`
    //Calculamos el total de la compra
    total(cart.products)
}

//Funcion para calcular el total de la compra
const total = (array) =>{
    const total = array.reduce((acumulador, item) => item.product.price * item.quantity + acumulador, 0 )
    const contTotal = document.getElementById("total")
    contTotal.innerText = `Total Compra: $${total}`
}

/**  
* Algoritmo Principal 
**/

//Obtenemos las query params. Obtenemos el string de Query
const url = window.location.search
//Creamos el objeto que contiene las queryparasm usando su constructor
const params = new URLSearchParams(url)
//Mediante el metodo "get" obtenemos el id para utilizarlo en el fetch
const code = params.get("code")
const cart = params.get("cart")
fetch(`http://localhost:8080/api/ticket?code=${code}&&cart=${cart}`)
    .then( res => res.json())
    .then( data => {
        renderProducts(data.ticket, data.cart, data.user)
    })

