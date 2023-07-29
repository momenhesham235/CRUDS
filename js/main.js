// variable
let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("dis")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let tbody =  document.getElementById("tbody")
let mood ='create';
let temp;

// get total product
function getTotal(){
    if(price.value != ''){
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value 
    total.textContent = result
    total.style.background  = 'green'
    }else{
         total.textContent = ''
        total.style.background = '#f10'
    }

}

// create product && check product from local storage
// let product;
// if(localStorage.product != null){
//     product = JSON.parse(localStorage.product)
// }else{
//     product = []
// }

let product = [];
if(localStorage.getItem("product")){
    product = JSON.parse(localStorage.getItem("product"))
}


// create and updata product 
submit.onclick = function (){
   let newPro ={
    title:title.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.textContent,
    count:count.value,
    category:category.value.toLowerCase()
   }

   if(title.value != '' && count.value <= 100 && price.value != '' && category.value != ''){
       if(mood === 'create'){
          if(newPro.count > 1){
         for(let i = 0 ; i < newPro.count ;i++){
             product.push(newPro)
         }
        }else{
         product.push(newPro)
        }
       }else{
         product[temp] = newPro;
         mood = 'create'
         submit.textContent = 'Create'
         count.style.display = 'block';
       }
       // clear data
       clearInputs()
   }
   // add data local storage
    window.localStorage.setItem("product" , JSON.stringify(product))
   // read
   showData();
}

// clear inputs
function clearInputs(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.textContent = ''
    count.value = ''
    category.value = ''
}

// show product into page
function showData(){
    getTotal();
  let table = ''
  for(let i = 0 ; i < product.length; i++){
     table += `
        <tr>
            <td>${i+1}</td>
            <td>${product[i].title}</td>
            <td>${product[i].price}</td>
            <td>${product[i].taxes}</td>
            <td>${product[i].ads}</td>
            <td>${product[i].discount}</td>
            <td>${product[i].total}</td>
            <td>${product[i].category}</td>
            <td><button onclick="updateData(${i})" id="updata">updata</button></td>            
            <td><button onclick="delData(${i})" id="delete">delete</button></td>            
        </tr>
        `
  }
  tbody.innerHTML = table;
  let div = document.getElementById("deleteAll");
  if(product.length > 0){
    div.innerHTML = `
    <button onclick="deleteAllProduct()">delete All (${product.length})</button>
    `
  }else{
    div.innerHTML = '';
  }
} 
showData();

//delete one items
function delData(i){
    product.splice(i,1);
    localStorage.product = JSON.stringify(product)
    showData();
}

// delete all items
function deleteAllProduct(){
    product.splice(0)
    localStorage.clear();
    showData();
}

//updata
function updateData(i){
    title.value = product[i].title;
    price.value = product[i].price;
    taxes.value = product[i].taxes;
    ads.value = product[i].ads;
    discount.value = product[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = product[i].category;
    submit.textContent = 'Updata';
    mood = 'update'
    temp = i;
    scroll({
        top:0,
        behavior:'smooth'
    })
}

// search
let searchMood = 'title';

function getSearch(id){
   let search = document.getElementById("search");
    if(id === "searchTitle"){
         searchMood = 'title';
    }else{
         searchMood = 'Category';
    }
     search.placeholder = `Search By ${searchMood}`
    search.focus();
    search.value = '';
    showData();
}

function findProduct(value){
    let table = ''
    for(let i= 0 ; i < product.length; i++){
    if(searchMood == 'title'){
            if(product[i].title.includes(value.toLowerCase())){
        table += `
            <tr>
                <td>${i}</td>
                <td>${product[i].title}</td>
                <td>${product[i].price}</td>
                <td>${product[i].taxes}</td>
                <td>${product[i].ads}</td>
                <td>${product[i].discount}</td>
                <td>${product[i].total}</td>
                <td>${product[i].category}</td>
                <td><button onclick="updateData(${i})" id="updata">updata</button></td>            
                <td><button onclick="delData(${i})" id="delete">delete</button></td>            
            </tr>
        `
            }
    }else{
            if(product[i].category.includes(value.toLowerCase())){
            table += `
            <tr>
                <td>${i}</td>
                <td>${product[i].title}</td>
                <td>${product[i].price}</td>
                <td>${product[i].taxes}</td>
                <td>${product[i].ads}</td>
                <td>${product[i].discount}</td>
                <td>${product[i].total}</td>
                <td>${product[i].category}</td>
                <td><button onclick="updateData(${i})" id="updata">updata</button></td>            
                <td><button onclick="delData(${i})" id="delete">delete</button></td>            
            </tr>
            `
            }
    }

    }
    tbody.innerHTML = table;
}

