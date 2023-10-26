//****              Selectores universales
const $=(selector=> document.querySelector(selector))
const $$=(selector=> document.querySelectorAll(selector))

//*****             Mostrar vistas
const showView=(view)=>{
    $$(".view").forEach((view)=> view.classList.add("is-hidden"));
    $(`#${view}`).classList.remove("is-hidden")
}

//*****             Obtener data de la Api
const getData= async()=>{
    showView("spinner")
    let response= await fetch("https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs")
    let data= await response.json()

    setTimeout(()=>{initialization(data)}, 2000)
}

//*****             Funciones que inicializan la web
const initialization=(data)=>{
    postData(data)
    getCountries(data)
    getCategories(data)
    getSeniority(data)
}

//*****             Filtrar por ID 
const getJobsById= async(id)=>{
    showView("spinner")
    let response= await fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs/${id}`) 
    let data= await response.json()

    setTimeout(()=>{showDetails(data)}, 2000)
}

//*****             Traer informacion para editar 
const getJobsInfo= async(id)=>{
    $("#edit-job").classList.remove('is-hidden')
    let response= await fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs/${id}`) 
    let data= await response.json()
    
    getInformarmation(data)
}

//              Filtro por parametros
const getFilter = async (params)=>{
    showView("spinner")
    let response= await fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs?${params}`)
    let data= await response.json()

    postData(data)
}

//*****             Agregar trabajo nuevo
const addJob= async()=>{
    let response= await fetch("https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs", {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(createNewJob())
    })
    const data= await response.json()
    
    createNewJob(data)
    getData()
    $("#form-new-job").reset()
    $("#preview").style.backgroundImage= "url('')"

}

//*****             Editar trabajo
const editJob= async(id)=>{
    let response= await fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs/${id}`, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(editJobInformation())
    })
    const data= await response.json()

    editJobInformation(data)
    getData()
}

//*****             Eliminar trabajo
const deleteJob= async (id)=>{
    let response = await fetch(`https://6533f91ee1b6f4c5904670c5.mockapi.io/api/jobs/${id}`, {
        method: 'DELETE',
    })
    const data = await response.json()

    getData()
}

window= getData()