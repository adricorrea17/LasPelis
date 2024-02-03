const API_KEY = 'api_key=4aed650e47494d9c082dca5bbe374381';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const buscarURL = `${BASE_URL}/search/movie?${API_KEY}`
const buscar = document.getElementById('buscar');
const contenedor = document.getElementById('contenedor');
const form = document.getElementById('form');
const lista = document.getElementById('milista')
const logo = document.getElementById('logo')
const carrousel = document.querySelector('#carouselExampleIndicators');


/////////////////////////////////Url api////////////////////////////////////////////
pelis(API_URL);

function pelis(url) {
    fetch(url).then(res => res.json()).then(data => {

        mostrar(data.results);

    })
}


//////////////////////////////////Mostrar listado de api///////////////////////////////////////////
function mostrar(data) {
    contenedor.innerHTML = ""
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const pelismovie = document.createElement('div');
        pelismovie.classList.add('pelis');
        const imagen = document.createElement('img')
        const divinfo = document.createElement('div')
        const h3 = document.createElement('h3')
        const span = document.createElement('span')
        const divover = document.createElement('div')
        const textover = document.createElement('p')
        const boton = document.createElement('button')

        contenedor.appendChild(pelismovie)
        pelismovie.appendChild(imagen)
        pelismovie.appendChild(divinfo)
        pelismovie.appendChild(divover)
        divinfo.appendChild(h3)
        divinfo.appendChild(span)
        divover.appendChild(textover)
        divover.appendChild(boton)
        imagen.setAttribute('class', 'img-fluid')
        imagen.setAttribute('src', `${IMG_URL+poster_path}`)
        imagen.setAttribute('alt', `${title}`)
        divinfo.setAttribute('class', 'info bg-dark d-flex flex-column mt-2')
        h3.innerHTML = title;
        span.innerHTML = vote_average;
        divover.setAttribute('class', "overview bg-dark")
        h3.setAttribute('class', 'text-light text-center')
        textover.innerHTML = overview
        boton.innerHTML = 'Ver mas'
        textover.setAttribute('class', 'text-light')
        boton.setAttribute('class', "btn-lg btn btn-dark btn-outline-light boton fw-light")
        boton.setAttribute('id', `${id}`)

        if (vote_average >= 8) {
            span.setAttribute('class', `green text-center`)
        } else if (vote_average >= 5) {
            span.setAttribute('class', `orange text-center`)
        } else {
            span.setAttribute('class', `red text-center`)
        }

        document.getElementById(id).addEventListener('click', () => {

            openmodal(movie)
        })

    })

}


/////////////////////////////////buscar peliculas y recargar peliculas////////////////////////////////////////////
form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const buscarterm = buscar.value;
    if (buscarterm) {
        pelis(buscarURL + '&query=' + buscarterm)
    }
})

logo.onclick = function() {
        window.location.reload();
    }
    //////////////////////////////////abrir modal///////////////////////////////////////////

let milista = [];
if (localStorage.getItem('milista') === null) {
    milista = [];
} else {
    milista = JSON.parse(localStorage['milista']);
}

function openmodal(movie) {
    fetch(`${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`).then(res => res.json()).then(modal => {


        const nav = document.getElementById("myNav")
        const a = document.getElementById("boton")
        const boton = document.createElement('button')
        const h1 = document.createElement('h1')
        const div = document.createElement('div')
        const div2 = document.createElement('div')
        const img = document.createElement('img')
        const vote = document.createElement('p')
        const over = document.createElement('p')
        img.setAttribute('class', 'img-fluid modalimg mt-4')
        div.appendChild(img)
        nav.appendChild(div)
        nav.appendChild(div2)
        div2.appendChild(h1)
        div2.appendChild(over)
        div2.appendChild(vote)
        div2.appendChild(boton)
        h1.innerHTML = `${movie.title}`
        vote.innerHTML = `PUNTUACION: <span id="span">${movie.vote_average}</span>`
        over.innerHTML = `${movie.overview}`
        a.setAttribute('class', 'block')
        h1.setAttribute('class', 'white titulomodal')
        boton.setAttribute('class', "btn-lg btn btn-dark btn-outline-light fw-light col-6")
        boton.innerHTML = "+ Agregar a mi lista"
        boton.setAttribute('id', 'btnmodal')
        vote.setAttribute('class', 'white mt-3 votomodal')
        over.setAttribute('class', 'white col-6 fs-5 overmodal overmodal')
        div.setAttribute('id', "overlay-content")
        div.setAttribute('class', 'overlay-content')
        div2.setAttribute('id', "overlay-text")
        div2.setAttribute('class', 'overlay-text d-flex flex-column top')
        img.setAttribute('src', `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
        document.getElementById('myNav').style.width = "100%";

        /////////////////////////////////validacion de color de votos////////////////////////////////////////////

        const span = document.getElementById('span')
        if (movie.vote_average >= 8) {
            span.setAttribute('class', `green`)
        } else if (movie.vote_average >= 5) {
            span.setAttribute('class', `orange`)
        } else {
            span.setAttribute('class', `red`)
        }

        //////////////////////////////////agregar pelicula y localstorage///////////////////////////////////////////

        const btn = document.getElementById('btnmodal')

        btn.addEventListener('click', () => {
            milista.push({
                id: movie.id,
                titulo: movie.title,
                overview: movie.overview,
                vote: movie.vote_average,
                img: movie.poster_path,
            })
            localStorage.setItem('milista', JSON.stringify(milista));

            for (let i = 0; i < milista.length; i++) {
                if (milista[i].id) {

                    btn.innerHTML = 'Agregada'
                    btn.setAttribute('disabled', '');

                }
            }




        })
    })
}
lista.onclick = function() {

    lista.innerHTML = "Volver"
    if (lista.innerHTML == "lista") {
        lista.innerHTML = "Volver"
    } else if (lista.innerHTML == "Volver") {
        lista.onclick = function() {
            window.location.reload();
        }
    }


    contenedor.setAttribute('class', 'none')
    form.setAttribute('class', 'none')
    carrousel.setAttribute(`class`, `none`)


    for (let i = 0; i < milista.length; i++) {

        const listado = document.getElementById('lista')
        const pelismovie = document.createElement('div');
        pelismovie.classList.add('pelis');
        const imagen = document.createElement('img')
        const divinfo = document.createElement('div')
        const h3 = document.createElement('h3')
        const span = document.createElement('span')
        const divover = document.createElement('div')
        const textover = document.createElement('p')
        const boton = document.createElement('button')

        listado.appendChild(pelismovie)
        pelismovie.appendChild(imagen)
        pelismovie.appendChild(divinfo)
        pelismovie.appendChild(divover)
        divinfo.appendChild(h3)
        divinfo.appendChild(span)
        divover.appendChild(textover)
        divover.appendChild(boton)
        imagen.setAttribute('class', 'img-fluid')
        imagen.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + milista[i].img)
        imagen.setAttribute('alt', milista[i].titulo)
        divinfo.setAttribute('class', 'info bg-dark d-flex flex-column mt-2')
        h3.innerHTML = milista[i].titulo;
        span.innerHTML = milista[i].vote;
        divover.setAttribute('class', "overview bg-dark")
        h3.setAttribute('class', 'text-light text-center')
        textover.innerHTML = milista[i].overview
        boton.innerHTML = 'Quitar de mi lista'
        textover.setAttribute('class', 'text-light')
        boton.setAttribute('class', "btn-lg btn btn-dark btn-outline-light boton fw-light quitar")
        boton.setAttribute('id', `${milista[i].id}`)

        const quitar = document.querySelectorAll('.quitar')
        for (let j = 0; j < milista.length; j++) {
            for (let btn of quitar) {
                btn.onclick = function() {
                    btn.parentNode.parentNode.remove()
                    milista = [];
                    milista = JSON.parse(localStorage.getItem('milista'));
                    milista.splice(i);
                    localStorage.setItem('milista', JSON.stringify(milista))
                    console.log(JSON.parse(localStorage.getItem('milista')).length)

                }
            }
        }
    }

}


let storedList = localStorage.getItem('milista');
if (storedList == null) {
    milista = [];
} else {
    milista - JSON.parse(storedList);

}




////////////////////////////////cerrar modal/////////////////////////////////////////////

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    document.getElementById("overlay-content").remove();
    document.getElementById("overlay-text").remove();
    const boton = document.getElementById("boton")
    boton.setAttribute('class', 'none')
}