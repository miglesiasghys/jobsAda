//*****Botones
$("#btn-home").addEventListener('click', ()=> showView("list-jobs"))
$('#btn-create-job').addEventListener('click', ()=> showView("create-job")) 
$('#btn-submit-job').addEventListener('click', ()=>{addJob()})

//*****Mostrar lista de trabajos 
const postData=(data)=>{
    $("#container-cards").innerHTML= "";
    if (data){
        for({id, name, image, description, seniority, category, salary} of data){
            $("#container-cards").innerHTML += `
            <div class="card card-job">
                <div class="card-image">
                    <figure class="image is-4by5">
                        <img src="${image}" alt="${name}">
                    </figure>
                </div>
                <div class="content m-3">
                    <div class="media">
                        <div class="media-content">
                            <p class="title is-6 pb-2">${name}</p>
                            <p class="subtitle is-6">${description.slice(0,100)}...</p>
                        </div>
                    </div>
                    <div class="content">
                        <a class="tag">${seniority}</a>
                        <a class="tag">${category}</a> 
                        <a class="tag">$$:${salary}</a>
                    </div>
                    <div class="content">
                        <button onclick= getJobsById(${id}) class="button" type="button">See datails</button>
                    </div>
                </div>
            </div>`
        }
    }else{
        alert(`No results found :( `)
    }
    showView("list-jobs")
}

//*****Mostrar detalles
const showDetails=({name, image, description, seniority, category, salary, location})=>{
    showView("container-details")
    $('#container-card-details').innerHTML= `
    <div class="column is-3">
        <figure class="image-details">
            <img src="${image}" alt="${name}">
        </figure>
    </div>
    <div class="column">
        <h2>${name}</h2>
        <p>${description}</p>
        <div>
            <span class="tag">${location}</span>
            <span class="tag">${seniority}</span>
            <span class="tag">${category}</span>
            <span class="tag">${salary}</span>
        </div>
        <button type="button" class="button" id="btn-edit-job">Edit job</button>
        <button type="button" class="button" id="btn-delete-job">Delete job</button>
        <button type="button" class="button" onclick= showView("list-jobs")>Back...</button>
    </div>`
}

//***** Filtrar por pais
const countries= []

const getCountries = (data)=>{
    data.forEach(element => {
        if (!countries.includes(element.location)){
            countries.push(element.location)
        }
    });
    loadSelect(countries)
    return countries
}

const loadSelect = (countries) =>{
    $$('.location-select').forEach((select)=>{
        select.innerHTML='<option value="" disabled selected>Location...</option>'
        for(let country of countries){
        select.innerHTML += `<option value="${country}" aria-label="${country}">${country}</option>`}
    })
}

// const filter= ()=>{
//     let seniority = $('#seniority-select').value
//     getFilter(new URLSearchParams(seniority).toString())
// }

// $('#btn-search').addEventListener('click', ()=> filter())

//*****Crear nuevo trabajo
const createNewJob = ()=>{
    let newJob= {
        name: $("#name-job").value,
        image: $("#img-select").value,
        description: $("#description-job").value,
        location: $("#location-job").value,
        category: $("#category-job").value,
        seniority: $("#seniority-job").value,
        benefits: {
            vacation: $("#vacation-job").value,
            health_ensurance: $("#health-job").value,
            internet_paid: $("#internet-job").value,
        },
        salary: $("#salary-job").value,
        long_term: $("#longterm-job").value,
        languages: [
            $("#languages-job").value
        ]
    }
    showView("list-jobs")
    return newJob
}

//
$('#img-select').addEventListener('input', (e)=>changeBackground(e))

const changeBackground= (e) => {
    $("#preview").style.backgroundImage=`url('${e.target.value}')`
}
