const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.getElementById('input');
const botonEnter = document.getElementById('enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id
let LIST 

const FECHA = new Date()
fecha.innerHTML=FECHA.toLocaleDateString('es-MX',{weekday:'long', month:'long', day:'numeric'})

// Funcion de agregar tarea
function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?lineThrough :''

    const elemento = `
                <li id="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}<p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                </li>
                    `
    lista.insertAdjacentHTML('beforeend', elemento)
}

// Funcion Tarea Realizada

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true
}

function tareaEliminada(element){
    element.parentNode.parentNode.remove(element)
    LIST[element.id].eliminado = true
}

botonEnter.addEventListener('click', ()=>{
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea, id, false, false)
    }
    LIST.push({
        nombre:tarea,
        id:id,
        realizado:false,
        eliminado:false
    })
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value= ''
    id++
})


document.addEventListener('keyup', function(event){
    if(event.key=='Enter'){
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea, id, false, false)
    }
    LIST.push({
        nombre:tarea,
        id:id,
        realizado:false,
        eliminado:false
    })
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value= ''
    id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData === 'realizado'){
        tareaRealizada(element)
    }else if(elementData === 'eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))

})

let data = localStorage.getItem('TODO')
if(data){
    LIST=JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
    }else{
        LIST = []
        id = 0
    }

    function cargarLista(data){
        data.forEach(function(i){
            agregarTarea(i.nombre, i.id, i.realizado, i.eliminado)
        })
    }