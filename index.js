let fruits = [
    {id:1, title:'Apple', price: 20, img:'https://images.heb.com/is/image/HEBGrocery/000466634'},
    {id:2, title:'Orange', price: 30, img:'https://produits.bienmanger.com/38345-0w470h470_Organic_Navelate_Oranges.jpg'},
    {id:3, title:'Mango', price: 40, img:'https://befreshcorp.net/wp-content/uploads/2017/07/product-packshot-mango.jpg'},
]

const toHTML = fruit => `
    <div class="col">
        <div class="card" >
            <img src="${fruit.img}" alt="${fruit.title}" style="height: 300px;" class="card-img-top" >
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Show Price</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Delete</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html 
}

render()

const priceModal = $.modal({
    title: 'Product price',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Close', type: 'primary', handler(){
            priceModal.close()
        }},
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if(btnType === 'price') {
        priceModal.setContent(`
            <p>Price of ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
        console.log(fruit);
    } else if (btnType === 'remove'){
        $.confirm({
            title: 'Are you sure?',
            content: `<p>You delete fruit: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch( () =>{
            console.log('Cancel');
        })
    }
})