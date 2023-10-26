//*****             Botones y select
$("#btn-home").addEventListener('click', () => showView("list-jobs"))
$('#btn-create-job').addEventListener('click', () => showView("create-job"))
$('#btn-submit-job').addEventListener('click', () => addJob())
$('#img-select').addEventListener('input', (e)=>changeBackground(e))
$('#category-select').addEventListener('input', ()=> filterCategories())
$('#seniority-select').addEventListener('input', ()=> filterSeniorities())
$('#location-select').addEventListener('input', ()=> filterLocation())
$("#btb-clear").addEventListener('click', ()=>clearSelect())

//*****             Navbar burger
document.addEventListener('DOMContentLoaded', () => {
    const navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    navbarBurgers.forEach((element) => {
        element.addEventListener('click', () => {
            const target = element.dataset.target;
            const $target = document.getElementById(target);
            element.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        });
    });
});

//*****             Mostrar lista de trabajos 
const postData = (data) => {
    $("#container-cards").innerHTML = "";
    if (data) {
        for ({ id, name, image, description, seniority, category} of data) {
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
                            <p class="subtitle is-6">${description.slice(0, 100)}...</p>
                        </div>
                    </div>
                    <div class="content">
                        <a class="tag">${seniority}</a>
                        <a class="tag">${category}</a> 
                    </div>
                    <div class="content">
                        <button onclick= getJobsById(${id}) class="button btn-details is-rounded" type="button">See datails</button>
                    </div>
                </div>
            </div>`
        }
    } else {
        alert(`No results found :( `)
    }
    showView("list-jobs")
}

//*****             Mostrar detalles
const showDetails = ({ name, image, description, seniority, category, salary, location, benefits, id }) => {
    showView("container-details")
    $('#container-card-details').innerHTML = `
    <div class= "columns ">
        <div class="column">
            <figure class="image-details">
                <img src="${image}" alt="${name}">
            </figure>
        </div>
        <div class="column is-8 card-description">
            <h2 class= "title">${name}</h2>
            <p class="mb-3">${description}</p>
            <h3 class="m-2">Benefits:</h3>
            <ul>
                <li><i class="fa-solid fa-plus"></i> Vacations: ${benefits.vacation}</li>
                <li><i class="fa-solid fa-plus mt-3"></i> Health job: ${benefits.health_ensurance}</li>
                <li><i class="fa-solid fa-plus my-3"></i> Internet paid: ${benefits.internet_paid}</li>
            </ul>
            <div class="my-3">
                <span class="tag mx-2">${location}</span>
                <span class="tag mx-2">${seniority}</span>
                <span class="tag mx-2">${category}</span>
                <span class="tag mx-2">$ ${salary}</span>
            </div>
            <div class="is-flex is-mobile container-btn-details">
                <button onclick= getJobsInfo(${id}) type="button" class="button is-rounded btn-details m-1" id="btn-edit-job">Edit job</button>
                <button onclick= openModal() type="button is-rounded btn-color" class="button m-1 is-rounded btn-details" id="btn-delete-job">Delete job</button>
                <button type="button" class="button is-rounded btn-color m-1" onclick= showView("list-jobs")>Back...</button>
            </div>
        </div>
    </div>    
    <div class="is-hidden" id="edit-job">
        <form class="form-create-job box columns is-multiline my-3" id="form-new-job">
            <div class="column is-8 my-3">
                <label for="job-title">Job title:</label>
                <input id="name-job-edit" type="text" class="input is-rounded my-3" placeholder="Job title...">
                <label for="image">Image:</label>
                <select id="img-select-edit" class="input is-rounded my-3">
                    <option value="" disabled selected>Image...</option>
                    <option value="https://i.pinimg.com/564x/f5/bf/af/f5bfaf73b060f82f840f495b5cacad6c.jpg">Option 1</option>
                    <option value="https://i.pinimg.com/564x/68/56/aa/6856aadae3e4aed340f34224ae00a60b.jpg">Option 2</option>
                    <option value="https://i.pinimg.com/564x/80/41/fa/8041fa1695cf9c53a3be90f2688957b1.jpg">Option 3</option>
                    <option value="https://i.pinimg.com/564x/ca/70/15/ca70158ed58ce9085e1cbd54c73bd0e4.jpg">Option 4</option>
                    <option value="https://i.pinimg.com/564x/d0/83/b4/d083b498830cfac3f5e5dbf7b7831da3.jpg">Option 5</option>
                </select>
                <label for="description">Description:</label>
                <textarea id="description-job-edit" type="text" class="input my-3" placeholder="Description..."></textarea>
            </div>
            <div class="column is-4">
                <figure id="preview-edit" class="figure-preview image">
                </figure>
            </div>
            <div class="column is-6">
                <label for="tags" class="mt-3">Tags</label>
                <input id="location-job-edit" type="text" class="input is-rounded mt-3" placeholder="Location...">
                <select id="seniority-job-edit" class="input is-rounded mt-3">
                    <option value=" " disabled selected>Seniority...</option>
                    <option value="Junior">Junior</option>
                    <option value="Semienior">Semisenior</option>
                    <option value="Senior">Senior</option>
                </select>
                <input id="category-job-edit" type="text" class="input is-rounded my-3" placeholder="Category...">
                <label for="salary">Salary:</label>
                <input id="salary-job-edit" type="number" class="input is-rounded mt-3" placeholder="Salary...">
            </div>
            <div class="column is-6">
                <label for="benefits" class="mt-3">Benefits:</label>
                <input id="vacation-job-edit" type="text" class="input is-rounded mt-3" placeholder="Vacation...">
                <input id="health-job-edit" type="text" class="input is-rounded mt-3" placeholder="Health job...">
                <select id="internet-job-edit" type="text" class="input is-rounded my-3">
                    <option value=" " disabled selected>Internet...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                <label for="long-term">Long term?:</label>
                <select id="longterm-job-edit" class="input is-rounded mt-3">
                    <option value="" disabled selected>Select...</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div class="column is-12">
                <label for="languages" class="mt-3">Languages:</label>
                <input id="languages-job-edit" type="text" class="input is-rounded mt-3" placeholder="Languages...">
            </div>
            <button onclick= editJob(${id}) type="button" class="button is-rounded mt-5 mx-3 btn-details" id="btn-edit-job">Edit job</button>
        </form>
    </div>
    <div class="modal" id="modal-delete">
        <div class="modal-background"></div>
        <div class="modal-content is-flex is-center">
            <h2 class="modal-text m-3">Are you sure to delete this job?</h2>
            <button onclick= closeModal() class="button btn-details is-rounded m-3" type="button">No</button>
            <button onclick= deleteJob(${id}) class="button btn-details is-rounded m-3" type="button">Delete</button>
        </div>
        <button onclick= closeModal() class="modal-close is-large m-3" aria-label="close"></button>
    </div>`
}

//*****             Crear nuevo trabajo
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
            ($("#languages-job").value).split(',')
        ]
    }
    showView("list-jobs")
    return newJob
}

//*****              Cambiar fondo del preview de la imagen
const changeBackground= (e) => {
    $("#preview").style.backgroundImage=`url('${e.target.value}')`
}

//*****             Llenar los input del job a editar
const getInformarmation = ({ name, image, description, location, category, seniority, benefits, salary, long_term, languages }) => {
    $("#name-job-edit").value = name
    $("#img-select-edit").value = image
    $("#description-job-edit").value = description
    $("#location-job-edit").value = location
    $("#category-job-edit").value = category
    $("#seniority-job-edit").value = seniority
    $("#vacation-job-edit").value = benefits.vacation
    $("#health-job-edit").value = benefits.health_ensurance
    $("#internet-job-edit").value = benefits.internet_paid
    $("#salary-job-edit").value = salary
    $("#longterm-job-edit").value = long_term
    $("#languages-job-edit").value = languages
    $("#preview-edit").style.backgroundImage = `url('${image}')`
    $('#img-select-edit').addEventListener('input', (e) => changeBackgroundEdit(e))
    const changeBackgroundEdit = (e) => {
        $("#preview-edit").style.backgroundImage = `url('${e.target.value}')`
    }
}

//*****             Editar trabajo
const editJobInformation = () => {
    let jobEdit = {
        name: $("#name-job-edit").value,
        image: $("#img-select-edit").value,
        description: $("#description-job-edit").value,
        location: $("#location-job-edit").value,
        category: $("#category-job-edit").value,
        seniority: $("#seniority-job-edit").value,
        benefits: {
            vacation: $("#vacation-job-edit").value,
            health_ensurance: $("#health-job-edit").value,
            internet_paid: $("#internet-job-edit").value,
        },
        salary: $("#salary-job-edit").value,
        long_term: $("#longterm-job-edit").value,
        languages: [
            ($("#languages-job-edit").value).split(',')
        ]
    }
    return jobEdit
}

//*****             Modal
const openModal=()=>{
    $('#modal-delete').classList.add('is-active');
}

const closeModal=()=>{
    $('#modal-delete').classList.remove('is-active');
}

//*****             Traer y rellenar select
const countries= []
const categories= []
const seniorities= []

const getCountries = (data)=>{
    data.forEach(element => {
        if (!countries.includes(element.location)){
            countries.push(element.location)
        }
    });
    loadSelect($$(".location-select"), countries)
    return countries
}

const getCategories = (data)=>{
    data.forEach(element => {
        if (!categories.includes(element.category)){
            categories.push(element.category)
        }
    });
    loadSelect($$(".category-select"), categories)
    return categories
}

const getSeniority = (data)=>{
    data.forEach(element => {
        if (!seniorities.includes(element.seniority)){
            seniorities.push(element.seniority)
        }
    });
    loadSelect($$(".seniority-select"), seniorities)
    return seniorities
}

const loadSelect = (select, params) =>{
    select.forEach((select)=>{
        for(let element of params){
        select.innerHTML += `<option value="${element}" aria-label="${element}">${element}</option>`}
    })
}

const clearSelect=()=>{
    $('#category-select').value= " "
    $('#seniority-select').value= " " 
    $('#location-select').value= " "
    getData()
}

//*****             Filtros de busqueda 
const filterLocation= ()=>{
    let params = {
        location: $('#location-select').value,
    }
    getFilter(new URLSearchParams(params).toString())
}

const filterSeniorities= ()=>{
    let params = {
        seniority: $('#seniority-select').value,
    }
    getFilter(new URLSearchParams(params).toString())
}

const filterCategories= ()=>{
    let params = {
        category: $('#category-select').value,
    }
    getFilter(new URLSearchParams(params).toString())
}