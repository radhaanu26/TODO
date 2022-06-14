let todoList = []
let todoMap = new Map()
let filter = 'all'

const todoListEl = document.querySelector('.todoList')
const allEl = document.querySelector('.displayAll')
const todoActiveEl = document.querySelector('.activeAll')
const completedEl = document.querySelector('.completedAll')

const input = document.querySelector('.todoInput')
input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        todoList.push(event.target.value)
        todoMap.set(event.target.value,false)
        event.target.value=''
        render()
    }
  })

todoListEl.addEventListener("click",function(event){
    const itemId=event.target.getAttribute('data-itemId')
    
    if(itemId !== null){
       if(event.target.nodeName==='BUTTON'){
           todoList= todoList.filter(function(item){
                if(item===itemId){
                    return false
                }
                else{ return true}
            })

    }
    else{

        const checkboxState=todoMap.get(itemId)
        todoMap.set(itemId,!checkboxState)
    } 
    render()
    }


})

function select(type){
    filter=type
    render()
    if(filter==='all'){
        allEl.classList.add('selected')
        todoActiveEl.classList.remove('selected')
        completedEl.classList.remove('selected')  
    }else if(filter==='active'){
        allEl.classList.remove('selected')
        todoActiveEl.classList.add('selected')
        completedEl.classList.remove('selected')  
    }else{
        allEl.classList.remove('selected')
        todoActiveEl.classList.remove('selected')
        completedEl.classList.add('selected')  
    }
}


function render(){
    const items = []
    todoList.forEach(item => {
        if(todoMap.get(item)===true && filter==='active'){ 
            return
        }
        if(todoMap.get(item)===false && filter==='completed'){ 
            return
        }


        const itemEl=document.createElement('li')
        itemEl.classList.add('todoItem')
     
        const checkboxEl = document.createElement('input')
        checkboxEl.setAttribute('data-itemId',item)
        checkboxEl.setAttribute('type', 'checkbox')
        checkboxEl.classList.add('todoCheckbox')
        checkboxEl.checked=todoMap.get(item)

     
     
        const todoTextEl = document.createElement('span')
        todoTextEl.classList.add('todoText')
        const text = document.createTextNode(item)
        todoTextEl.append(text)
     
        const closeButtonEl = document.createElement('button')
        closeButtonEl.classList.add('closeButton')
        closeButtonEl.setAttribute('data-itemId',item)
    
        const closeIcon = document.createTextNode('X')
        closeButtonEl.append(closeIcon)


     
        itemEl.append(checkboxEl,todoTextEl,closeButtonEl)
        items.push(itemEl)
      
     })
   todoListEl.replaceChildren(...items)
     
}





// function createTodoList(todoList) {
//     const ul = document.createElement('ul')
//     ul.classList.add('list', 'todoList')
//     todoList.forEach(element => {
//         const li = document.createElement('li')
//         const card = document.createElement('div') 
//         card.classList.add('card')       
//         li.appendChild(card)
//         const cardContent = document.createElement('div');
//         cardContent.classList.add('card-content');
//         card.appendChild(cardContent);
//         const content = document.createElement('div');
//         content.classList.add('content');
//         cardContent.appendChild(content);
//         const name = document.createElement('div');
//         name.classList.add('name');
//         name.textContent = todoList[element];
//         cardContent.appendChild(name);
    
//     });
// }

// createTodoList(todoList)