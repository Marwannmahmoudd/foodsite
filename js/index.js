let x = document.querySelectorAll('ul li')

let loading = document.querySelector('.lds-roller')
$('.lds-roller').hide()
function closs() {
    let offset = 0
        $('.side-nav-menu').animate({
            left: '-256px'
        }, 500 ) 
        $("#closs").addClass("fa-align-justify");
        $("#closs").removeClass("fa-x");
        x.forEach(element => {
            setTimeout(() => {
                element.style.top = '300';
            
            },30 + offset);
            offset-=100;
        });
    }
function open() {
    for(let i = 0;i<x.length;i++){
        x[i].style.top = '300';
    }
    let offset = 0
        $('.side-nav-menu').animate({
            left: '0px'
        }, 500 ) 
        $("#closs").removeClass("fa-align-justify");
        $("#closs").addClass("fa-x");
        x.forEach(element => {
            setTimeout(() => {
                element.style.top = '0';
            
            },250 + offset);
            offset+=100;
        });
    }
$('#closs').click(function(){
   if($('.side-nav-menu').css('left') == '0px'){
    closs()
   }
   else{
    open()
   }
})
function display(arr){
   
    let cartonna = ''
   for (let i = 0; i < arr.length; i++) {
    cartonna+=` <div class="col-md-2 ">
    <div class="meal overflow-hidden position-relative" onclick ="getdetails(${arr[i].idMeal})">
        <div class=""><img src="${arr[i].strMealThumb}" class ="w-100 rounded"></div>
        <div class="  d-flex align-items-center text-white ">
                        <h5>${arr[i].strMeal}</h5>
                    </div>
                    </div>
    </div>
    `
    
   }
  
   document.getElementById('display').innerHTML=cartonna;
   
}
async function getdata(){
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let apijs =await api.json()
    
    display(apijs.meals)
    $('.lds-roller').fadeOut(300)
}
getdata()
async function getdetails(id){
    $('.lds-roller').fadeIn(300)
    let api = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
   api =await api.json()
console.log(api.meals);
    displaydetails(api.meals[0])
    $('.lds-roller').fadeOut(300)
}
function displaydetails(meal){
    
let gr = ''

    for (let i = 1; i < 21; i++) {
       // console.log(meal[`strTags${i}`])
        if (meal[`strIngredient${i}`]) {
            
            gr += `<li class="alert alert-info list-unstyled m-2 p-1 fs-6">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
   
   
   let z = meal.strTags?.split(',')
  // console.log(z);
  if(z == undefined){
    z = []
  }
   let tag=''
   for (let i = 0; i < z.length; i++) {
        tag+=`<li class="alert alert-danger list-unstyled m-2 p-1 fs-6">${z[i]}</li>`
   }
   // document.getElementById('display').classList.remove('row-cols-md-4','row-cols-1')
   
    document.getElementById('display').innerHTML = ""
    let cartonna = ''
   
    cartonna+=`<div class="as d-flex pb-3 ">
    <div class="col-md-4 pe-3"><img src='${meal.strMealThumb}' class="w-100 rounded">
    <div class="text-white "><h3>${meal.strMeal}</h3></div>
    </div>
    <div class="mm col-md-8"><h2>Instructions</h2>
    <div><p>${meal.strInstructions}</p></div>
    <div><h4>Area : ${meal.strArea}</h4></div>
    <div><h4>Category : ${meal.strCategory}</h4></div>
    <div class"dsa "><h4>Recipes :<ul class="d-flex text-nowrap flex-wrap">${gr}</ul></h4></div>
    <div><h4>tags : <ul class="d-flex text-nowrap ps-0" id="uls">${tag}</ul></h4></div>
    <div><a target="_blank" href="${meal.strSource}" class="btn btn-success" id="anchor1">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger" id="anchor2">Youtube</a>
    </div>
    </div>
    </div>
    
    `
    document.getElementById('display').innerHTML = cartonna
}
/*function search(){
    document.getElementById('display').innerHTML = ""

    let cartonna = ''
    cartonna+=`<div class="col-md-6 ">
    <input class="form-control bg-transparent text-white" type="text" placeholder="Search By Name" oninput="search1(this.value)">
</div>
<div class="col-md-6 ">
            <input  class="form-control  bg-transparent text-white" type="text" placeholder="Search By first letter" oninput="search2(this.value[0])" maxlength="1">
        </div>
    `
    document.getElementById('display2').innerHTML = cartonna
}*/
async function search1(name){
    $('.lds-roller').fadeIn(300)
let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
let apijs  =await api.json()
setTimeout(() => {
    $('.lds-roller').fadeOut(500)
 display(apijs.meals) 
}, 1000);
clearTimeout()
}
async function search2(name){
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    let apijs  =await api.json()
    $('.lds-roller').fadeOut(300)
     display(apijs.meals) 
     
    }
async function displaycategory(){
    document.getElementById('display').innerHTML= ""
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let apijs  =await api.json()
    console.log(apijs.categories);
    displaycategory2(apijs.categories)
    $('.lds-roller').fadeOut(300)
}
function displaycategory2(arr){
   // document.getElementById('display2').innerHTML = ''
    let cartonna = ''
   for (let i = 0; i < arr.length; i++) {
    cartonna+=` <div class="col-md-3 mb-3  ">
    <div class="mee overflow-hidden position-relative bg-dark" onclick ="getcategory3('${arr[i].strCategory}')">
        <div class="sas"><img src="${arr[i].strCategoryThumb}" class ="w-100 rounded"></div>
        <div class="title2 position-absolute  d-flex  ">
        <h5 class="text-white  ">${arr[i].strCategory}</h5>
                      
                    </div>
                    </div>
    </div>
    `
    
   }
  
   document.getElementById('display').innerHTML=cartonna;
}
async function getcategory3(name){
    document.getElementById('display').innerHTML= ""
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
    let apijs = await api.json()
    console.log(apijs.meals.slice(0,20));
    display(apijs.meals.slice(0,20))
    $('.lds-roller').fadeOut(300)
}
//onclick ="getcategory3(${arr[i].strCategory})
async function displayarea(){
    document.getElementById('display').innerHTML= ""
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let apijs  =await api.json()
    console.log(apijs.meals);
    displayarea2(apijs.meals)
    $('.lds-roller').fadeOut(300)
}
function displayarea2(arr){
   // document.getElementById('display2').innerHTML = ''
    let cartonna = ''
   for (let i = 0; i < arr.length; i++) {
    cartonna+=` <div class="col-md-3 ">
                <div onclick="getarea3('${arr[i].strArea}')" class="nn rounded-2 text-center text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
    `
    
   }
  
   document.getElementById('display').innerHTML=cartonna;
}
async function getarea3(name){
    document.getElementById('display').innerHTML= ""
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
    let apijs = await api.json()
    console.log(apijs.meals.slice(0,20));
    display(apijs.meals.slice(0,20))
    $('.lds-roller').fadeOut(300)
}
//onclick ="getcategory3(${arr[i].strCategory})
async function displayingred(){
    document.getElementById('display').innerHTML= ""
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let apijs  =await api.json()
    console.log(apijs.meals.slice(0,20));
    displayingred2(apijs.meals.slice(0,20))
    $('.lds-roller').fadeOut(300)
}
function displayingred2(arr){
   // document.getElementById('display2').innerHTML = ''
    let cartonna = ''
   for (let i = 0; i < arr.length; i++) {
    cartonna+=` <div class="col-md-3 text-center">
        <div class="ss text-white " onclick ="displayingred3('${arr[i].strIngredient}')">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
    </div>
    `
    
   }
  
   document.getElementById('display').innerHTML=cartonna;
}
async function displayingred3(name){
    document.getElementById('display').innerHTML= ""
    $('.lds-roller').fadeIn(300)
    let api =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`)
    let apijs = await api.json()
    console.log(apijs.meals.slice(0,20));
    display(apijs.meals.slice(0,20))
    $('.lds-roller').fadeOut(300)
}
function contacct() {
   // document.getElementById('display2').innerHTML = ''
    document.getElementById('display').innerHTML = `<form><div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="ee container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" oninput="validation1()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" oninput="validation2()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  oninput="validation3()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"  oninput="validation4()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" oninput="validation5()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" oninput="validation6()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> 
</form>
`
let inputtt = document.getElementById('submitBtn')
let marwan = false
let formdata = document.querySelector('form')

formdata.addEventListener('submit',function(e){
    e.preventDefault()

    })
    formdata.addEventListener('input',function(){
        if(validation1() && validation2() && validation3() && validation4() && validation5() && validation6() ){
            console.log("a7a");
            submitBtn.removeAttribute("disabled") 
        }else{
            marwan = false
            
        }
    })
   
}
let regexname = /^[a-zA-Z ]{2,30}$/;
let regexemail =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
let regexphone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
let regexage = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
let regexpass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/

function validation1(){
  
if(regexname.test(document.getElementById('nameInput').value) ){
    document.getElementById('nameAlert').classList.add('d-none')
    return true
}
else if(document.getElementById('nameInput').value == ''){
    return false
}
else{
    document.getElementById('nameAlert').classList.remove('d-none')
    return false
}
}
function validation2(){
    if(regexemail.test(document.getElementById('emailInput').value)){
        document.getElementById('emailAlert').classList.add('d-none')
        return true
    }
    else if(document.getElementById('nameInput').value == ''){
        return false
    }
    else{
        document.getElementById('emailAlert').classList.remove('d-none')
        return false
    }
}
function validation3(){
if(regexphone.test(document.getElementById('phoneInput').value)){
    document.getElementById('phoneAlert').classList.add('d-none')
    return true
}else{
    document.getElementById('phoneAlert').classList.remove('d-none')
    return false
}
        }
function validation4(){
    if(regexage.test(document.getElementById('ageInput').value)){
        document.getElementById('ageAlert').classList.add('d-none')
        return true
    }
    else{
        document.getElementById('ageAlert').classList.remove('d-none')
        return false
    }
        }   
function validation5(){
    if(regexpass.test(document.getElementById('passwordInput').value)){
        document.getElementById('passwordAlert').classList.add('d-none')
        return true
    }else{
        document.getElementById('passwordAlert').classList.remove('d-none')
        return false
    }
        } 
function validation6(){
if(document.getElementById('passwordInput').value == document.getElementById('repasswordInput').value){
    document.getElementById('repasswordAlert').classList.add('d-none')
return true
}else{
    document.getElementById('repasswordAlert').classList.remove('d-none')
    return false
}
        }            
       