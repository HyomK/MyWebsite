const bookmark=document.querySelector("#bookmark");
const bookmarkBar=document.querySelector("#bookmarkBar");
const BOOKMARK_KEY="bookmark";
let BKstorage=[];
const BKsaved=localStorage.getItem(BOOKMARK_KEY);
const addBKform=bookmarkBar.querySelector('form');
const addBK_icon=document.querySelector("#BKplus");
const BKinput=document.querySelector("#urlInput");
const submit=bookmarkBar.querySelector("#submitBK");


addBKform.classList.add(HIDDEN_CLASSNAME);
BKinput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      submit.click();
      
    }
  });

addBK_icon.addEventListener("click",function(){ 
    addBKform.classList.remove(HIDDEN_CLASSNAME);
    document.querySelector("#titleInput").value="";
    document.querySelector("#urlInput").value="";
});

submit.addEventListener("click",addBK);



if(BKsaved){
    const parsedBK=JSON.parse(BKsaved);
    BKstorage=parsedBK;
    parsedBK.forEach(paintBookmark);
}


bookmark.addEventListener("click",bookmarkSet);
bookmarkBar.classList.add(HIDDEN_CLASSNAME);
let fold=true;


function bookmarkSet(){
  

    if(fold){
        bookmark.classList.add("folded");
        mainBar.id="main";
        mainBar.style.width="90%";
        bookmarkBar.classList.remove(HIDDEN_CLASSNAME);
        fold=false;
    }else{
        bookmark.classList.remove("folded");
        mainBar.id="main-full";
        mainBar.style.width="100%";
        bookmarkBar.classList.add(HIDDEN_CLASSNAME);
        fold=true;
    }
}


function paintBookmark(newBK){
    const BKlist= bookmarkBar.querySelector("ul");
    const newitem=document.createElement('li');
    const newlink=document.createElement('a');   
    newlink.href=newBK.url;
    newlink.innerHTML=newBK.title;
    newitem.id=newBK.id;
    newitem.appendChild(newlink);
    newitem.addEventListener("contextmenu",deleteBK);
    BKlist.appendChild(newitem);


}

function addBK(event){

    if(BKstorage.length>20){
        alert("you can't add bookmark more");
        return;
    }


    const newtitle=bookmarkBar.querySelector("#titleInput");
    const newurl=bookmarkBar.querySelector("#urlInput");
    console.log(newtitle,newurl);
    const BK={
        id:Date.now(),
        title:newtitle.value,
        url:`https://${newurl.value}`
    }
    BKstorage.push(BK);
    paintBookmark(BK);
    localStorage.setItem(BOOKMARK_KEY,JSON.stringify(BKstorage));
    addBKform.classList.add(HIDDEN_CLASSNAME);
}

function deleteBK(event){
    event.preventDefault();
    const answer=confirm("Do you really want to delete this?");
    if(answer){
        const target=event.target.parentElement;
        console.log(target);
        BKstorage=BKstorage.filter((item)=>(String(item.id)!==target.id));
        target.remove();
        localStorage.setItem(BOOKMARK_KEY,JSON.stringify(BKstorage));
        addBKform.classList.add(HIDDEN_CLASSNAME);
    }
    
}