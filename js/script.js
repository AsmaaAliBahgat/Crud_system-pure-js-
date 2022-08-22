let title = document.getElementById('title'),
    price = document.getElementById('price'),
    ads = document.getElementById('ads'),
    discount = document.getElementById('discount'),
    taxes = document.getElementById('taxes'),
    count = document.getElementById('count'),
    total = document.getElementById('total'),
    category = document.getElementById('category'),
    submit = document.getElementById('submit'),
    mood = 'create',
    tmp,
    searchMood = 'title';
 
    
//get total
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#25D366'
        }else{
            total.style.background = 'rgb(141, 59, 59)';
            total.innerHTML = "";
        }
}

//creat product
let dataPro;
if(localStorage.products != null){
    dataPro = JSON.parse(localStorage.products)
}else{
    dataPro = [];
}

 submit.onclick = function (){
    let productList = {
        title : title.value.toLowerCase(),
        price : price.value,
        ads : ads.value,
        discount : discount.value,
        taxes : taxes.value,
        count : count.value,
        total : total.innerHTML,
        category : category.value.toLowerCase(),

    }
    //check data
    if(title.value != '' 
    && price.value !='' 
    && category.value != ''
    && productList.count < 100){
            //count
    if(mood === 'create'){
        if(productList.count > 1){
            for( let i = 0 ; i <productList.count ; i++){
                dataPro.push(productList);
            }
        }else{
            dataPro.push(productList);
    
        }
    }else{
        dataPro[tmp] = productList;
        mood = 'create';
        submit.innerHTML = "Create";
        count.style.display = 'block';
    }
    clearData();
    }

    
    //save local storage
    localStorage.setItem('products' , JSON.stringify(dataPro));
    
    showData();
}

//clean inputs
function clearData(){
    title.value = '',
    price.value = '',
    ads.value = '',
    taxes.value = '',
    discount.value = '',
    count.value = '',
    total.value = '',
    category.value = '';
}
//read
function showData(){
    let table = '';
    for (i=0 ; i < dataPro.length; i++){
        table += `
        <tr>
                <td>${i + 1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick = "updateData(${i})">Update</button></td>
                <td><button id="delete" onclick = "deleteData(${i})">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table; 
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = `<button id="delete" onclick = "deleteAll()">Delete All (${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML = '';
    }
    getTotal()
}
showData();


//delete
function deleteData(i){
    dataPro.splice(i,1);
    localStorage.products = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    
    dataPro.splice(0);
    showData();
}
//update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    taxes.value = dataPro[i].taxes;
    discount.value = dataPro[i].discount;
    count.style.display = 'none';
    category.value = dataPro[i].category;
    getTotal();
    submit.innerHTML = 'Update';
    mood = 'update'
    tmp = i;
    scroll({
        top : 0 ,
        behavior : "smooth"
    })
}

//search
function searchButton(id){
    let search = document.getElementById('search');
    if(id == 'searchBytitle'){
        searchMood = 'title'
    
    }else{
        searchMood = 'categorty'
        
    }
    search.Placeholder = 'search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();

}

function searchValue(value){
    let table = '';
    for(let i = 0; i<dataPro.length; i++){
        if(searchMood == 'title'){
        
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick = "updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick = "deleteData(${i})">delete</button></td>
                    </tr>
        `       
        }
    }else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                <tr>
                        <td>${i + 1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id="update" onclick = "updateData(${i})">Update</button></td>
                        <td><button id="delete" onclick = "deleteData(${i})">delete</button></td>
                    </tr>
                `  
        }
    }
    }
    document.getElementById('tbody').innerHTML = table; 
}



