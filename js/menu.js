const openMenu = document.querySelector("#open-menu")
const closeMenu = document.querySelector("#close-menu")
const aside = document.querySelector("aside")
const main = document.querySelector("main")

openMenu.addEventListener("click",() => {
    if(aside.classList.contains('aside-visible')){
        aside.classList.remove('aside-visible');
    }else{
        aside.classList.add('aside-visible');
    }
})

main.addEventListener("click",()=>{
    aside.classList.remove('aside-visible');
})

closeMenu.addEventListener("click",() => {
    aside.classList.remove('aside-visible');
})

botonesCategorias.forEach(boton => boton.addEventListener("click",() => {
    aside.classList.remove('aside-visible');
}))