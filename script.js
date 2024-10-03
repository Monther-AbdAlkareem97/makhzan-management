let ProductName = document.getElementById('ProductName')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let addNew = document.getElementById('addNew')

let temp

// CHANGE ADD BUTTON BETWEEN UPDATE MOOD AND ADD MOOD
let mood = 'add'


// GET TOTAL
//Plus sing next to the string converts the string to integer 
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    }else{
        total.innerHTML = ''
        total.style.background = '#a00d02'
    }
}



// ADD NEW PRODUCT
let productsData 

if(localStorage.product != null){
    productsData = JSON.parse(localStorage.product)
}else{
    productsData = []
}
 


function addNewProducts(){
    let singleProductData = {
        Name: ProductName.value.toLowerCase() ,
        price: price.value ,
        taxes: taxes.value , 
        ads: ads.value , 
        discount: discount.value ,
        total: total.innerHTML , 
        count: count.value , 
        category: category.value.toLowerCase()
    }
    if(ProductName.value != '' && price.value != '' && category.value != '' && count.value <= 100){
        if(mood==='add'){
            // ADD MORE THAN ONE PRODUCT
            if(singleProductData.count > 1){
                for(let i = 0 ; i < singleProductData.count ; i++){
                    productsData.push(singleProductData)
                }
            }
            // ADD ONE PRODUCT
            else{
                productsData.push(singleProductData)
            }
        }else{
            productsData [temp] = singleProductData
            mood = 'add'
            addNew.innerHTML = 'اضافة منتج جديد'
            count.style.display = 'block'
        }
        // CLAER INPUTS 
   ProductName.value = ""
   price.value = ""
   taxes.value = ""
   ads.value = ""
   discount.value = ""
   total.innerHTML = ""
   count.value = ""
   category.value = ""
   showData()
    }

// SAVE DATA TO LOCAL STORAGE
   localStorage.setItem('product' , JSON.stringify(productsData))



}

// READ DATA
function showData(){
    let table = ''
    for(let i = 0 ; i < productsData.length ; i++ ){
        table += `<tr>
        <td>${i + 1}</td>
        <td>${productsData[i].Name}</td>
        <td>${productsData[i].price}</td>
        <td>${productsData[i].taxes}</td>
        <td>${productsData[i].ads}</td>
        <td>${productsData[i].discount}</td>
        <td>${productsData[i].total}</td>
        <td>${productsData[i].category}</td>
        <td><button onclick="updateProduct(${i})" id=" update">تعديل</button></td>
        <td><button onclick="deletProduct(${i})" id=" delete" >حذف</button></td>
                </tr>`
        getTotal()        
    }
    document.getElementById('tbody').innerHTML = table
        
    // IF THERE SOME DATA IN THE TABLE SHOW DELETE ALL BUTTON IF NOT DO NOT SHOW IT
    let btnDeletALL = document.getElementById('deletAll')
    if(productsData.length > 0 ){
        btnDeletALL.innerHTML = `
        <button onclick="deletALL()">حذف الكل ( ${productsData.length} )</button>
        `
    }else{
        btnDeletALL.innerHTML = ''
    }
}

showData()




// DELETE 
function deletProduct(i){
    productsData.splice(i,1);
    localStorage.product = JSON.stringify(productsData);
    showData()
}
// DELETE ALL
function deletALL(){
    localStorage.clear()
    productsData.splice(0)
    showData()
}


//UPDATE 
function updateProduct(i){
    ProductName.value  = productsData[i].Name
    price.value = productsData[i].price
    taxes.value = productsData[i].taxes
    ads.value = productsData[i].ads
    discount.value = productsData[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = productsData[i].category
    addNew.innerHTML = 'تحديث'
    mood = 'update'
    temp = i
   scroll({
       top: 0,
       behavior: "smooth"
   })
}


// SEARCH

let searchMood = 'title'

function searchProductByMood(id){
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMood = 'title'
        search.placeholder = 'بحث بالاسم'
    }else{
        searchMood = 'category'
        search.placeholder = 'بحث بالصنف'
    }
    search.focus()
    search.value = ''
    showData()
}


function searchProduct(value){
   
    let table = ''
    if( searchMood == 'title'){
        for(let i = 0 ; i < productsData.length ; i++){
            if(productsData[i].Name.includes(value.toLowerCase())){
                table += `<tr>
                <td>${i}</td>
                <td>${productsData[i].Name}</td>
                <td>${productsData[i].price}</td>
                <td>${productsData[i].taxes}</td>
                <td>${productsData[i].ads}</td>
                <td>${productsData[i].discount}</td>
                <td>${productsData[i].total}</td>
                <td>${productsData[i].category}</td>
                <td><button onclick="updateProduct(${i})" id=" update">تعديل</button></td>
                <td><button onclick="deletProduct(${i})" id=" delete" >حذف</button></td>
                        </tr>`    
            }
           }
   }else{
    for(let i = 0 ; i < productsData.length ; i++){
        if(productsData[i].category.includes(value.toLowerCase())){
            table += `<tr>
            <td>${i}</td>
            <td>${productsData[i].Name}</td>
            <td>${productsData[i].price}</td>
            <td>${productsData[i].taxes}</td>
            <td>${productsData[i].ads}</td>
            <td>${productsData[i].discount}</td>
            <td>${productsData[i].total}</td>
            <td>${productsData[i].category}</td>
            <td><button onclick="updateProduct(${i})" id=" update">تعديل</button></td>
            <td><button onclick="deletProduct(${i})" id=" delete" >حذف</button></td>
                    </tr>`    
        }
       }
   }
   document.getElementById('tbody').innerHTML = table
}


// CLEAN DATA
