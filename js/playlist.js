const addBtn=document.querySelector("#add");
const addForm=document.querySelector("body form");
const list=document.querySelector("body ul");
const val= document.querySelectorAll('input');
const player=new Map();
const PLAYER_KEY="player";
const PLAYLIST_KEY="playlist";
let MusicStorage=[];
let MusicList=[];
const savedPlayer=localStorage.getItem(PLAYER_KEY);
const savedList=localStorage.getItem(PLAYLIST_KEY);


if(savedPlayer===null)
    localStorage.setItem(PLAYER_KEY,MusicStorage);
else{
    const parsedPlayer=JSON.parse(savedPlayer);
    MusicStorage=parsedPlayer;
    MusicStorage.forEach(item=>setList(item));
}    


function addMusic(event){
    event.preventDefault();
    const item=event.target.parentElement;    
    if(savedList===null) 
        localStorage.setItem(PLAYLIST_KEY,MusicList);
    else if(savedList.length===0){
        MusicList=parsedList;
    }
    else{
        alert("Successfully added to playlist");
        const parsedList=JSON.parse(savedList);
        MusicList=parsedList;
    }
    MusicStorage.forEach(element=>{
        if(element.id===item.id){
            const obj={
                id:element.id,
                title:element.title,
                artist:element.artist,
                url:element.url
            }
            MusicList.push(obj);
            savedMusicList();
        }
    })

}



function CheckBox(){
    let success=true;
    for(let i=0; i<val.length;i++){
        if(val[i].value===""){
            success=false;
            alert("check your box");
            return false;
        }
    }
    return true;   
}

function deleteItem(event){
    const li=event.target.parentElement;
    console.log(li);
    MusicStorage=MusicStorage.filter((item)=>String(item.id)!==String(li.id));
    console.log(MusicStorage);
    li.remove();
    savedItem();
}


function setList(obj){
        const newlist=document.createElement('li');
        const newMusic_title=document.createElement('span');
        const newMusic_artist=document.createElement('span');
        const deleteBtn=document.createElement('i');
        const addBtn=document.createElement('i');
        const line=document.createElement('hr');
        deleteBtn.className="fas fa-minus-circle";
        deleteBtn.id="deleteBtn";
        deleteBtn.addEventListener("click",deleteItem);
        addBtn.className="fas fa-plus-circle";
        addBtn.style.float="right"; addBtn.style.marginLeft="10px";
        addBtn.addEventListener("click",addMusic);    
        newlist.id=obj.id;    
        newMusic_title.innerHTML=obj.title+" /";
        newMusic_artist.innerHTML=obj.artist;
        newlist.appendChild(newMusic_title);
        newlist.appendChild(newMusic_artist);
        newlist.appendChild(deleteBtn);
        newlist.appendChild(addBtn);      
        newlist.appendChild(line);
        list.appendChild(newlist);
        player.set(`${obj.title}_${obj.artist}`,obj.url); 
    
    
}
function addItem(event){
    event.preventDefault();
    if(CheckBox()){
        console.log("val",val);
        const newObj={
            id:`${Date.now()}`,
            title:val[0].value,
            artist:val[1].value,
            url:val[2].value
        };
        MusicStorage.push(newObj);
        savedItem();
        setList(newObj);
    }
}

function savedItem(){
    localStorage.setItem(PLAYER_KEY,JSON.stringify(MusicStorage));
}

function savedMusicList(){    
        localStorage.setItem(PLAYLIST_KEY,JSON.stringify(MusicList)); 
}
console.log(addForm);

addForm.addEventListener("submit",addItem);


