
const todo_icon=document.querySelector("#todo_icon");
const todo_window=document.querySelector("#todo-wrap");
const todofold_icon=document.querySelector("#todoFold");
const playerfold=document.querySelector("#musicMode");
const Todo_KEY="Todo";
const TodoStorage=localStorage.getItem(Todo_KEY);
const Tday = new Date();
let checklist=[];
let dateSelected;
let TodoList=[];
todo_window.classList.add("hidden");


if(TodoStorage!==null){
    let parsedTodo=JSON.parse(TodoStorage);
    TodoList=parsedTodo;
    TodoList.sort(listSort);
    for(let item=0;item<TodoList.length;item++){
        paintTodo(TodoList[item]);
    }
    todayTodo();
    tomorrowTodo();

}else{
    localStorage.setItem(Todo_KEY,TodoList);
}


function listSort(a,b){
    return a.date-b.date;
}


let mode=playerfold.value;
setInterval(function(){mode=playerfold.value;},500);
playerfold.addEventListener("click",TodowidthHandler);
todo_icon.addEventListener("click",TodoHandler);


function checkedHandler(item){ 
        const id= item.target.parentElement.id;
        const target=TodoList.find(element=>String(element.id)===String(id));
        if(target&&target.checked===false){
            target.checked=true;
            savedTodo();
            update();
            return;
        }else if(target&&target.checked===true){
            target.checked=false;
            savedTodo();
            update();
            return;
        }
       
        
}

function createList(obj,position){
    const item=document.createElement("li");
    const label=document.createElement('label');
    label.className="container";
    const checkbox=document.createElement('input');
    checkbox.type="checkbox";
    if(obj.checked)checkbox.checked=true;
    checkbox.addEventListener("click",checkedHandler);
    const checkmark=document.createElement('span');
    const Tododay=document.createElement('span');
    Tododay.classList.add("date");
    const TODO=document.createElement('span');
    checkmark.className="checkmark";
    Tododay.innerText=`${Tday.getMonth()+1} / ${obj.date}`;
    TODO.innerText= obj.todo;
    label.appendChild(Tododay);
    label.appendChild(TODO);
    label.id=obj.id;
    label.appendChild(checkbox);
    label.appendChild(checkmark)
    item.appendChild(label);
    item.addEventListener("contextmenu",delteTodo);
    position.appendChild(item);
 
}

function update(){
   
    document.querySelectorAll("#todo-today li").forEach(event=>event.remove());
    document.querySelectorAll("#todo-tomorrow li").forEach(event=>event.remove());
    document.querySelectorAll("#todo-list li").forEach(event=>event.remove());
    TodoList.sort(listSort);
    for(let item=0;item<TodoList.length;item++){
        paintTodo(TodoList[item]);
    }
    todayTodo();
    tomorrowTodo();
    
}

function coloring(date,option){
    for(let item=0;item<dateSelected.length;item++){             
        if(String(date)===dateSelected[item].innerHTML){
          if(option) dateSelected[item].classList.add("schedule");
          else  dateSelected[item].classList.remove("schedule");       
        } 
                     
              
    }
}

function paintTodo(obj){
    const Todolist=document.querySelector("#todo-list");
   createList(obj,Todolist); 
}


function todayTodo(){
    let Today=[]
    Today=TodoList.filter(e=>String(e.date)===String(Tday.getDate()));
    const Todayschedule=document.querySelector("#todo-today ul");
    Today.forEach(e=>createList(e,Todayschedule));
}

function tomorrowTodo(){
    let nextday=[]
    nextday=TodoList.filter(e=>String(e.date)===String(Tday.getDate()+1));
    const Tomorrowschedule=document.querySelector("#todo-tomorrow ul");
    nextday.forEach(e=>createList(e,Tomorrowschedule));
}


function addTodo(event){
    if(TodoList.length >10){
        alert("You can't add it more");
        return;
    }
    const ask=`[ ${Tday.getMonth()+1}/${event.target.innerText} ]  What is your schedule?`;
    const Todoanswer=prompt(ask);  
    if(Todoanswer.length>20){
        alert("Too long. Retry!");
        return;
    }
     if(Todoanswer){
        const obj={
            id:Date.now(),
            date:event.target.innerText,
            todo:Todoanswer,
            checked:false
        }
        TodoList.push(obj);
        savedTodo();
        update();
        coloring(obj.date,true);
     }
}


function delteTodo(event){
    event.preventDefault();
    const answer=confirm("Do you want to really delete this schedule?");
   if(answer){
    const item=event.target.parentElement;
    const id=item.id;
    TodoList=TodoList.filter(e=>String(e.id)!==String(id));
    item.remove();
    savedTodo();
    update();
    const date=String(item.querySelector('span').innerHTML);
    const day_index=date.indexOf("/");
    const day=date.substr(day_index+1,date.length);
    coloring(parseInt(day),false);
    }
 }

function savedTodo(){
    localStorage.setItem(Todo_KEY,JSON.stringify(TodoList));    
}

function TodowidthHandler(){
    if(mode==="on"){
        todo_window.style.cssText="max-width:62%";
    }else{
        todo_window.style.cssText="position:relative";
        todo_window.style.cssText="max-width:75%";
    }
}

function TodoHandler(){    
    if(todo_icon.value==="fold") TodoPoP("unfold");
    else Todofold();
}

function TodoPoP(val){
    if(mode==="on"&&val==="unfold"){
        //todo_window.style.cssText="left:100px";
        todo_window.style.cssText="position:relative";
        todo_window.style.cssText="max-width:75%";
    }else{
        todo_window.style.cssText="max-width:62%";
    } 
    todo_icon.className="fas fa-angle-down fa-2x";
    todo_icon.classList.add("down");
    todo_window.classList.remove("hidden");
    todo_icon.value="unfold";

}
function Todofold(){
    todo_icon.className="fas fa-chevron-up fa-2x"; 
    todo_window.classList.add("hidden");
    todo_icon.classList.remove("down");
    todo_icon.value="fold";
}



function getDate(date) {
	return date.toLocaleDateString().replace(/\./g, "").split(" ");
}




function setCalender(Tday){
    const nowMonth = Tday.getMonth();
    const nowDay=Tday.getDate();  
    const [y, m] = getDate(new Date(Tday.setMonth(nowMonth)));
    const lastDay = getDate(new Date(y, m, 0)).pop() * 1; 
    const day = new Date([y, m, 1].join("-")).getDay();  
    const maxDay = Math.ceil((+day + lastDay) / 7) * 7;
    let html = '';;
    if(nowDay===1){
        TodoList=[];
        savedTodo();
        update();
        document.querySelectorAll(".schedule").forEach(e=>e.classList.remove("schedule"));
    } 
    
    for (let i = 1; i <= maxDay; i++) {
      const d = i > day && lastDay >= i - day ? i - day : '';
      const cls = !d ? 'background' : 'none';
      if(d===nowDay){
          html += `<div class="dateSel today ${cls}">${d}</div>`;
      }else html += `<div class="dateSel ${cls}">${d}</div>`;
    }
  
    document.querySelector('.dateSel').innerHTML = html;
    document.querySelector('.date_text').innerText = `${y}. ${m}`;
    dateSelected=document.getElementsByClassName('dateSel none');

    for(let item=0;item<dateSelected.length;item++){       
        dateSelected[item].addEventListener("click",addTodo);
        for(let t=0; t<TodoList.length;t++){
            if(String(TodoList[t].date)===dateSelected[item].innerHTML) 
                dateSelected[item].classList.add("schedule");
               
        }        
    }
        
}




window.onload =setCalender(Tday);
 function filtDate(item){
    return item.className==="dateSel";
 }
