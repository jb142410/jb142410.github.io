// SCROLL SUAVE
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if(link.hash){
      e.preventDefault();
      document.querySelector(link.hash)
      .scrollIntoView({behavior:"smooth"});
    }
  });
});

// ANIMACIÓN AL SCROLL
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }
  });
});

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});





/* movimiento*/

document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");
  let index = 0;

  setInterval(() => {
    slides[index].classList.remove("active");

    index++;
    if(index >= slides.length){
      index = 0;
    }

    slides[index].classList.add("active");

  }, 4000);

});


// envio

const form = document.getElementById("formulario");
const mensajeExito = document.getElementById("mensaje-exito");

form.addEventListener("submit", async function(e){
  e.preventDefault();

  let valido = true;

  // VALIDACIÓN
  document.querySelectorAll(".input-group").forEach(group => {
    const input = group.querySelector("input, textarea");
    const error = group.querySelector(".error");

    if(!input.value.trim()){
      group.classList.add("input-error");
      error.style.display = "block";
      valido = false;
    } else {
      group.classList.remove("input-error");
      error.style.display = "none";
    }
  });

  if(!valido) return;

  // ANIMACIÓN DE CARGA
  form.classList.add("loading");

  // ENVÍO A FORMSPREE
  const datos = new FormData(form);

  try{
    await fetch(form.action, {
      method: "POST",
      body: datos,
      headers: { 'Accept': 'application/json' }
    });

    // ÉXITO
    mensajeExito.style.display = "block";
    form.reset();

  } catch(error){
    alert("Error al enviar");
  }

  form.classList.remove("loading");
});



//  nostros js 

function cambiar(index){

  const titulos = [
    "Quiénes somos",
    "Nuestra misión",
    "Nuestra visión"
  ];

  const textos = [
    "QABA Diseño y Construcción es una empresa dedicada al desarrollo integral de proyectos de arquitectura, diseño y construcción. Trabajamos cada proyecto desde su planificación hasta la ejecución, gestionando cada etapa con criterio técnico, orden y atención al detalle, asegurando resultados coherentes y correctamente desarrollados.",
    "Desarrollar proyectos de arquitectura, diseño y construcción de manera integral, gestionando cada etapa con criterio técnico, orden y control, asegurando soluciones funcionales y una ejecución coherente con lo proyectado.",
    "Consolidarnos como una empresa sólida en el desarrollo integral de proyectos de arquitectura, diseño y construcción, reconocida por la consistencia de sus procesos, la claridad técnica y la correcta ejecución de cada proyecto."
  ];

  // CAMBIAR TEXTO
  document.getElementById("titulo").innerText = titulos[index];
  document.getElementById("texto").innerText = textos[index];

  // CAMBIAR IMAGEN
  const imagenes = document.querySelectorAll(".img");

  imagenes.forEach(img => img.classList.remove("active"));
  imagenes[index].classList.add("active");
}