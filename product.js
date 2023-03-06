// Nhan cac bien duoc truyen tu main.js
let titleSource = sessionStorage.getItem("viewInfoTitle")
let priceSource = sessionStorage.getItem("viewInfoPrice")
let imageSource = sessionStorage.getItem("viewInfoImage")
let listAccountStringify = sessionStorage.getItem("listAccountStringify")
let listAccount = JSON.parse(listAccountStringify)
// Tao cac bien moi cua product.js
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const image = $$(".product-image img:not(.share-image img)")
const title = $(".title")
const price = $(".price")
image.forEach(function(value){
    value.src = imageSource
})
title.innerHTML = `<p>${titleSource}</p>`
price.innerHTML = `<p>${priceSource}</p>`
// Xu ly giu nguyen login khi reset trang
const loginButton = $(".nav-search button");
const cart = $(".nav-search .cart")
const avatar = $(".nav-search .avatar")
const nameUser = $(".avatar ~ p")
isLogin = sessionStorage.getItem("isLogin")
if(isLogin){
	loginButton.style.display = "none"
	cart.style.display = "block"
	avatar.style.display = "block"
	nameUser.style.display = "inline"
	nameUser.innerHTML = sessionStorage.getItem("nameUser")
}

// Xu ly them san pham vao gio hang
const addProductSuccess = $(".sure-add .ok")
const addProductFailure = $(".sure-add .cancel")
const addProductAsk = $(".sure-add")
const addProductDone = $(".add-success")
const doneButton = $(".add-success .ok")
const addProduct = $(".add-product")
const login = $(".login")
const coat = $(".coat")
let parse = sessionStorage.getItem("productCurrentArrayStringify")
productCurrentArray = JSON.parse(parse)
addProduct.onclick = () => {
	if(isLogin){
	exitAll()
	addProductAsk.style.display = "block";
	coat.style.display = "block"
	addProductAsk.style.animation = "notice ease-in-out 0.6s 0s";
	}
	else{
		loginOn()
	}
}
// Xu ly khi khach hang tu choi add san pham
addProductFailure.onclick = () => {
	exitAll()
}
// Xu ly khi khach hang dong y add san pham
addProductSuccess.onclick = () => {
	if(isLogin){
	exitAll()
	addProductDone.style.display = "block";
	addProductDone.style.animation = "notice ease-in-out 0.6s 0s";
	coat.style.display = "block"
	productCurrentArray === null ? productCurrentArray = [] : productCurrentArray
	viewInfoTitle = titleSource;
	viewInfoPrice = priceSource;
	viewInfoImage = imageSource;
	productNewArray = [{
		viewInfoTitle, viewInfoPrice, viewInfoImage
	}]
	productCurrentArray = productCurrentArray.concat(productNewArray)
	productStringify = JSON.stringify(productCurrentArray)
	sessionStorage.setItem("productStringify", productStringify);
	productCurrentArrayStringify = JSON.stringify(productCurrentArray)
	sessionStorage.setItem("productCurrentArrayStringify", productCurrentArrayStringify)
	}
}
doneButton.onclick = () => {
	exitAll()
}
// Tao function loginOn
const loginOn = function(){
	login.style.animation = "notice ease-in-out 0.6s 0s";
	login.style.display = "block";
	coat.style.display = "block";
}
// Xu ly login
isLogin = sessionStorage.getItem("isLogin")
let notChange = true;
const exitButtonLogin = $(".login .exit");
const signUp = $(".login .sign-up");
const signUpGmail = $(".login .gmail");
const loginTitle = $(".login .login-title");
const registerButton = $(".login .button p");
const accountLoginButton = $(".login .button")
const inputForm = $$(".login input")
const inputFormWarn = $$(".login input ~ p")
const loginSuccess = $(".login-success")
const loginFail = $(".login-fail")
const exitButtonSuccess = $(".login-success .exit")
const exitButtonFail = $(".login-fail .exit")
exitButtonLogin.onclick = () => {
	login.style.display = "none";
	coat.style.display = "none";
};
loginButton.onclick = () => {
	loginOn()
};
signUp.onclick = () => {
	if (notChange) {
		changeTo()
	} else {
		changeBack()
	}
};
// Xu ly doi qua doi lai giao dien sign up va login
const changeTo = () => {
	signUpGmail.style.display = "block";
	loginTitle.innerHTML = "REGISTER";
	registerButton.innerHTML = "REGISTER";
	signUp.innerHTML = "LOG IN";
	notChange = false;
}
const changeBack = () => {
	signUpGmail.style.display = "none";
	loginTitle.innerHTML = "LOG IN";
	registerButton.innerHTML = "LOG IN";
	signUp.innerHTML = "SIGN UP";
	notChange = true;
}
// Xu ly thong bao fail sign up va thong bao login thanh cong
accountLoginButton.onclick = () => {
	if(notChange){
		// Xu ly khi login
		for(let i = 0; i < listAccount.length; i++){
			if(inputForm[0].value == listAccount[i].username && inputForm[1].value == listAccount[i].password){
				exitAll();
				loginSuccess.style.display = "block";
				loginSuccess.style.animation = "notice ease-in-out 0.6s 0s"
				coat.style.display = "block"
				loginButton.style.display = "none"
				cart.style.display = "block"
				avatar.style.display = "block"
				nameUser.style.display = "inline"
				nameUser.innerHTML = `${inputForm[0].value}`
				isLogin = true
				sessionStorage.setItem("isLogin", isLogin)
				sessionStorage.setItem("nameUser", nameUser.innerHTML)
			}
			else{
				exitAll();
				loginFail.style.display = "block";
				loginFail.style.animation = "notice ease-in-out 0.6s 0s"
				coat.style.display = "block"
			}
		}
	}
	else{
		// Mo thong bao fail sign up
		for(let i = 0; i < inputForm.length - 1; i++){
			if(inputForm[i].value.length <= 5){
				inputFormWarn[i].style.display = "block";
			} 
		}
		if(!inputForm[2].value.includes("@gmail.com")){
			inputFormWarn[2].style.display = "block";
		}
		// Tat thong bao fail sign up
		for(let i = 0; i < inputForm.length; i++){
			inputForm[i].onclick = () => {
			inputFormWarn[i].style.display = "none";	
			}
		}
		// Xu ly luu username va password khi sign up thanh cong
		if(inputForm[0].value.length > 5 && inputForm[1].value.length > 5 && inputForm[2].value.includes("@gmail.com")){
			newAccount = new account(0,`${inputForm[0].value}`,`${inputForm[1].value}`)
			changeBack()
			return listAccount = listAccount.concat(newAccount)
		}
	}
}

// Xu ly giu nguyen login khi reset trang
if(isLogin){
	loginButton.style.display = "none"
	cart.style.display = "block"
	avatar.style.display = "block"
	nameUser.style.display = "inline"
	nameUser.innerHTML = sessionStorage.getItem("nameUser")
}
// Xu ly tat thong bao success va fail
exitButtonSuccess.onclick = () => {exitAll()}
exitButtonFail.onclick = () => {exitAll()}
// Xu ly bam vao coat thi exit login hoac viewInfo
coat.onclick = () => {
	exitAll()
};

// Xu ly exit moi thu
const exitAll = function(){
	coat.style.display = "none";
	login.style.display = "none";
	loginSuccess.style.display = "none";
	loginFail.style.display = "none";
	addProductAsk.style.display = "none"
	addProductDone.style.display = "none"
}