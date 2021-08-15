const btn=document.querySelector("#musicMode");
const Modebtn=document.querySelector("#musicStop");
const musicBar=document.querySelector("#playerBar");
const mainBar=document.querySelector("#main-full");
const cd_icon=document.querySelector("#cd");
const list_icon=document.querySelector("#playlist i");
const Youtube=document.querySelector("#youtube");
const list=document.querySelector("#Index");
const PLAYLIST_KEY="playlist";
let MusicList=[];
let saved=[];
let PlayNow=null;

const Before=document.querySelector("#before");
Before.addEventListener("click",musicBefore);
const Next=document.querySelector("#next");
Next.addEventListener("click",musicNext);


// saved.fill(MusicList,0,MusicList.length);
const HIDDEN_CLASSNAME = "hidden";
const Full_CLASSNAME="main-full";

musicBar.classList.add(HIDDEN_CLASSNAME);
btn.addEventListener("click",MusicMode);
Modebtn.addEventListener("click",musicHandler);
list_icon.addEventListener("click",list_pop);
list.classList.add(HIDDEN_CLASSNAME);
cd_icon.addEventListener("click",ShowList);
list.addEventListener("click",HideList);



setInterval(Spin,80);


function list_pop(){
    const _width = '600';
    const  _height = '700';
    const _left = Math.ceil(( window.screen.width - _width )/2);
    const _top = Math.ceil(( window.screen.height - _height )/2); 
    window.open('PopUp.html', 'popup-test', 'width='+ _width +', height='+ _height +', left=' + _left + ', top='+ _top ); 
}

function musicHandler(){
    const iframe=musicBar.querySelector('iframe');
    iframe.src=iframe.src;
}

function musicBefore(){
    const iframe=musicBar.querySelector('iframe');
    const src=iframe.src;
    for(let i=0; i<MusicList.length;i++){
        if(MusicList[i].url===src){
            if(i==0){
                iframe.src=MusicList[MusicList.length-1].url;
            }else{
                iframe.src=MusicList[i-1].url;
            }
            break;
        }
    }
    NowColoring( iframe.src);   
}

function musicNext(){
    const iframe=musicBar.querySelector('iframe');
    const src=iframe.src;
    for(let i=0; i<MusicList.length;i++){
        if(MusicList[i].url===src){
            if(i==MusicList.length-1){
                iframe.src=MusicList[0].url;
            }else{
                iframe.src=MusicList[i+1].url;
            }
            break;
        }
    }
    NowColoring( iframe.src);
}

function MusicMode(){
    if(btn.value==="off"){
        btn.value="on";
        musicBar.classList.remove(HIDDEN_CLASSNAME);
        mainBar.id="main";
        btn.innerHTML=" OFF";
        ShowList();
        YoutubeConnect();
       
    }else{   
        btn.value="off";
        btn.innerHTML=" ON";
        mainBar.id="main-full";
        musicBar.classList.add(HIDDEN_CLASSNAME);
    }
}

let count=0;
function Spin(){
     count++;
     const deg=count*15;   
     cd_icon.querySelector('i').style.transform="rotate("+deg+"deg)";
}


function YoutubeConnect(){
    const savedList=localStorage.getItem(PLAYLIST_KEY);
    const parsedList=JSON.parse(savedList);
    const video=Youtube.querySelector('iframe');  
    const cover=Youtube.querySelector('#cover'); 
    
    if(parsedList==null ||parsedList.length==0){
      video.classList.add(HIDDEN_CLASSNAME);
      cover.classList.remove(HIDDEN_CLASSNAME);   
      
    }else{
        video.classList.remove(HIDDEN_CLASSNAME);
        cover.classList.add(HIDDEN_CLASSNAME);
        loadList(); 
        Youtube.querySelector('iframe').src=MusicList[0].url;
        PlayNow=MusicList[0].url;
        document.querySelector("#Index li").classList.add("NOW");
           
    }
}

function ShowList(){
   
    cd_icon.classList.add(HIDDEN_CLASSNAME);
    list.classList.remove(HIDDEN_CLASSNAME);
    loadList();
  
      
}

function HideList(){
    cd_icon.classList.remove(HIDDEN_CLASSNAME);
    list.classList.add(HIDDEN_CLASSNAME);
}

function paintList(obj){
    const listIndex=document.createElement("li");   
    listIndex.innerHTML=`${obj.title} [${obj.artist}]`;
    listIndex.id=obj.url;
    listIndex.addEventListener("click",PlayStart);
    listIndex.addEventListener("contextmenu",deleteList);
    list.appendChild(listIndex);
   
}

function NowColoring(item_url){
    const list=document.querySelector("#Index");
    const li=list.querySelectorAll('li');
    let now;
    for(let i=0;i<li.length;i++){
        if(String(li[i].id)===PlayNow){
            const before=li[i].classList.remove("NOW");
        }else if(String(li[i].id)===item_url){
            now=li[i];
        }
    }
    now.classList.add("NOW");
    PlayNow=now.id;
}


function PlayStart(event){
    const item=event.target;
    try{
        Youtube.querySelector("iframe").src=item.id;
        NowColoring(item.id);
        video.classList.remove(HIDDEN_CLASSNAME);
        cover.classList.add(HIDDEN_CLASSNAME);
      
    }catch(error){
        console.alert("ERROR URL!");
    }
}

function loadList(){
    const savedList=localStorage.getItem(PLAYLIST_KEY);
    const parsedList=JSON.parse(savedList);
    MusicList=parsedList;
    if(MusicList===null||MusicList.length===0){
        alert("Play list is empty!");
        return;
    }
    if(saved.length!==MusicList.length){
        const old=list.querySelectorAll('li');
        old.forEach(item=>item.remove());
        MusicList.forEach((item)=>paintList(item));
  
    }
    saved=MusicList;
  
}

function deleteList(event){
    event.preventDefault();
    const answer=confirm("Do you want to really delete this song?");
    if(answer){
    const item=event.target;
    const id=item.id;
    console.log(item,"!");
    MusicList=MusicList.filter(e=>e.url!==id);
    item.remove();
    localStorage.setItem(PLAYLIST_KEY,JSON.stringify(MusicList)); 
    YoutubeConnect();
    }
}

