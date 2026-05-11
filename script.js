// 🔹 SCROLL SUAVE SOLO PARA ANCLAS (#)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const destino = document.querySelector(this.getAttribute("href"));
    if(destino){
      e.preventDefault();
      destino.scrollIntoView({ behavior: "smooth" });
    }
  });
});


// 🔹 ANIMACIÓN AL SCROLL
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


// 🔹 SLIDER (SOLO SI EXISTE)
document.addEventListener("DOMContentLoaded", () => {

  const slides = document.querySelectorAll(".slide");
  if(slides.length === 0) return;

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


// 🔹 FORMULARIO (SOLO SI EXISTE)
const form = document.getElementById("formulario");

if(form){

  const mensajeExito = document.getElementById("mensaje-exito");

  form.addEventListener("submit", async function(e){
    e.preventDefault();

    let valido = true;

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

    form.classList.add("loading");

    const datos = new FormData(form);

    try{
      await fetch(form.action, {
        method: "POST",
        body: datos,
        headers: { 'Accept': 'application/json' }
      });

      mensajeExito.style.display = "block";
      form.reset();

    } catch(error){
      alert("Error al enviar");
    }

    form.classList.remove("loading");
  });

}


// 🔹 SECCIÓN NOSOTROS
function cambiar(index){

  const titulos = [
    "Quiénes somos",
    "Nuestra misión",
    "Nuestra visión"
  ];

  const textos = [
    "QABA Diseño y Construcción es una empresa dedicada al desarrollo integral de proyectos de arquitectura, diseño y construcción. Trabajamos cada proyecto desde su planificación hasta la ejecución, gestionando cada etapa con criterio técnico, orden y atención al detalle.",
    "Desarrollar proyectos de arquitectura, diseño y construcción de manera integral, gestionando cada etapa con criterio técnico, orden y control, asegurando soluciones funcionales.",
    "Consolidarnos como una empresa sólida en el desarrollo integral de proyectos de arquitectura, diseño y construcción, reconocida por la consistencia de sus procesos."
  ];

  const titulo = document.getElementById("titulo");
  const texto = document.getElementById("texto");
  const imagenes = document.querySelectorAll(".img");

  if(!titulo || !texto || imagenes.length === 0) return;

  titulo.innerText = titulos[index];
  texto.innerText = textos[index];

  imagenes.forEach(img => img.classList.remove("active"));
  imagenes[index].classList.add("active");
}


window.onload = function() {
  if (document.getElementById("titulo")) {
    cambiar(0); // Carga "Quiénes somos" automáticamente al iniciar
  }
};