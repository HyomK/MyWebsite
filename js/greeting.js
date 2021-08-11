
const Mainpage=document.querySelector("#wrap");
//const HIDDEN_CLASSNAME = "hidden";
Mainpage.classList.remove(HIDDEN_CLASSNAME);
const username=localStorage.getItem("user");
const hello=document.querySelector("#greeting");

function msg(){
    const date=new Date();
    const now=date.getHours();
    if(now>=6 && now<12) return "moring";
    else if(now>=12 && now<18) return "afternoon";
    else return "evening";
}

setInterval(function(){
    hello.innerHTML=`Good ${msg()}, ${username}!`;},1000);