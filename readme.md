# ** Tercer trabajo de asincronismo - Ada Careers **

# Pautas y requerimientos: 

- Ejemplo: https://youtu.be/kbw9MZhuuS0
- Este TP tiene un desarrollo individual.
- **Tecnologias:**
* Utilizar HTML, CSS y Javascript.
- **Disenio:**
* La eleccion de paleta de colores y tipografia es libre.
* Deben respetar la estructura dada por el ejemplo, en tamanio y dimensiones.
- DEBE ser responsive. Se revisara mobile y tablets tanto en portrait como en landscape.
- DEBE respetar el flow propuesto, es decir, donde y como aparecen los elementos segun los clicks del usuario.

# API:
La API a utilizar es MockAPI. Cada alumna debe tener su propia API y por lo tanto su propio endpoint.
Endpoint habra solo uno y sera llamado /jobs en donde se haran peticiones GET, POST, PUT y DELETE.

# Flow del proyecto
* Al cargarse la pagina se visualiza el navbar, el formulario de busqueda y el footer.
* Hay un componente que simula una carga, este durara 2 segundos, y al finalizar se cargaran los todos jobs disponibles (metodo GET).
* El formulario permite filtrar la busqueda de jobs mediante los fields location, seniority o category. La busqueda realizada mostrara todos los resultados coincidentes con lo que elige el usuario. (metodo GET con filtros, recuerden que mockAPI muestra todos los resultados que coincidan con cualquiera de los filtros puestos).
* Si el usuario da click en "Clear" se deben limpiar los filtros del formulario y reiniciarse la busqueda (es decir, volveran a aparecer todos los jobs, metodo GET).
* Si el usuario da click en "Create a job" debe desaparecer la homepage dejando ver un formulario para crear jobs (metodo POST). Al volver a la home, se vera el nuevo job creado igual que los preexistentes.
* Si el usuario da click en "Details" se debera ver en pantalla unicamente el detalle del job seleccionado, tras 2 segundos de visualizar el componente de carga.
* En el detalle del job se vera informacion adicional del mismo y los botones de "Edit" y "Delete".
* Si el usuario da click en "Edit", debera aparecer debajo del detalle un formulario con los datos del job ya precargados. Al enviar el fomulario se debe actualizar este job con las modificaciones hechas (metodo PUT).
* Si el usuario da click en "Delete", debe desaparecer el detalle y en su lugar aparecer un componente de alerta preguntando si estas seguro de realizar esta accion, en conjunto con el respectivo boton de "Delete" que efectiviza la solicitud (metodo DELETE) y el de "Cancel" que devolvera al usuario a la pagina principal.
* Se les da la posibilidad de agregar datos adicionales al objeto job, pero como MINIMO debe contener la estructura propuesta y seran 20 objetos de minima.

# URL deployada
**https://miglesiasghys.github.io/jobsAda/**