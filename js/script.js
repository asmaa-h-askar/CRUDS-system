let inputName = document.getElementById('productName');
let inputCategory = document.getElementById('productCategory');
let inputPrice = document.getElementById('productPrice');
let inputDescription = document.getElementById('productDescription');
let toggleButton = document.getElementById('toggleButton');
let clearBtn = document.getElementById('clearBtn');
let tbody = document.getElementById('tbody');
let searchInput = document.getElementById('searchinput');


if(localStorage.getItem("productData") == null){
    var productsList = [];
}else{
    var productsList = JSON.parse(localStorage.getItem("productData"));
    displayProduct();
}

/*************************Add Product Function*****************/
function addProduct(){
    let singleProduct ={
        productName: inputName.value,
        productCategory: inputCategory.value,
        productPrice: inputPrice.value,
        productDesc: inputDescription.value
    }
    
    productsList.push(singleProduct);
    localStorage.setItem("productData" , JSON.stringify(productsList));
    
    displayProduct();
    clearForm();
}

/*************************Clear Form Function*******************/
function clearForm(){
    inputName.value = "";
    inputCategory.value = "";
    inputPrice.value = "";
    inputDescription.value = "";
}
clearBtn.addEventListener('click' , clearForm);

/*************************Display Product Function*****************/
function displayProduct(){
    let tagElement = ``;

    for(let i=0 ; i<productsList.length ; i++){
        tagElement += `<tr>
        <td>${i}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
        <td><button class="btn btn-outline-success" onclick='updateProduct(${i})'>update</button></td>
        <td><button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>delete</button></td>
    </tr>`
    }

    tbody.innerHTML = tagElement;
}

/*************************Search Product Function*****************/
function searchProduct(){
    let tagElement = ``;

    for(let i=0 ; i<productsList.length ; i++){
        if(productsList[i].productName.toLowerCase().includes(searchInput.value.toLowerCase())){
            tagElement += `<tr>
        <td >${i}</td>
        <td>${productsList[i].productName.toLowerCase().replace(searchInput.value.toLowerCase() , `<span style="background-color: yellow">${searchInput.value.toLowerCase()}</span>`)}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productDesc}</td>
        <td><button class="btn btn-outline-success" onclick='updateProduct(${i})'>update</button></td>
        <td><button class="btn btn-outline-danger" onclick='deleteProduct(${i})'>delete</button></td>
    </tr>`
        }
    }

    tbody.innerHTML = tagElement;
}
searchInput.addEventListener('keyup' , searchProduct);

/*************************Delete Product Function******************/
function deleteProduct(index){
    productsList.splice(index , 1);
    localStorage.setItem("productData" , JSON.stringify(productsList));
    displayProduct();
}
/*************************Update Product Function******************/
function updateProduct(index){
    inputName.value = productsList[index].productName;
    inputCategory.value = productsList[index].productCategory;
    inputPrice.value = productsList[index].productPrice;
    inputDescription.value = productsList[index].productDesc;

    toggleButton.innerHTML = 'Update';
    toggleButton.setAttribute('onclick' , `updateThisProduct(${index})`);
}

function updateThisProduct(index){
    productsList[index].productName = inputName.value;
    productsList[index].productCategory = inputCategory.value;
    productsList[index].productPrice = inputPrice.value;
    productsList[index].productDesc = inputDescription.value;
    
    toggleButton.innerHTML = 'Add Product';
    localStorage.setItem("productData" , JSON.stringify(productsList));
    displayProduct();
    clearForm();
}

