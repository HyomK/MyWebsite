const loginBtn=document.getElementById("#Welcome-login i");
const UserInput=document.querySelector("#Welcome-login input");
const UserForm=document.querySelector("#Welcome-login");
const logout=document.querySelector("#out");
const USERNAME_KEY="user";
const NowPage=window.location.href;
const MainPage=String(NowPage).substr(0,String(NowPage).indexOf("login"))+"ProjectIndex.html";
const directBtn=document.getElementById("loginbtn");


logout.addEventListener("click",function(){
    console.log("clicked");
    localStorage.removeItem(USERNAME_KEY);
    location.href="./loginPage.html";
});

function loginHandler(event){
    event.preventDefault();
    const username = UserInput.value;
    if(username===""&&localStorage.getItem(USERNAME_KEY)===null){
        alert("Check your Name!");
        return;
    }
    localStorage.setItem(USERNAME_KEY, username);
    intentDefaultPage();
}

function intentDefaultPage(){
    const data="user="+localStorage.getItem(USERNAME_KEY);
    location.href=MainPage+"?"+data;
};

UserForm.addEventListener("submit",loginHandler);
directBtn.addEventListener("click",loginHandler);
const header=document.querySelector("h1");


if(localStorage.getItem(USERNAME_KEY)===null){   
    header.innerHTML="Welcome Bro!";
    directBtn.classList.add("hidden");
    
}else{
    header.innerHTML="Happy to see you again, "+localStorage.getItem(USERNAME_KEY)+"!";
    header.style.fontSize="70px";
    UserForm.classList.add("hidden");
}
