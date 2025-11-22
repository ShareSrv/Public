let riesgosControl = document.querySelector("#riesgos-control");
let riesgos1Control = document.querySelector("#riesgos1-control");
let riesgos2Control = document.querySelector("#riesgos2-control");
let riesgos1Button = document.querySelector("#riesgos1Button");
let riesgos2Button = document.querySelector("#riesgos2Button");
let scroller = document.querySelector(".scroller");
let leftJumpButton = document.querySelector("#leftJumpButton");
let rightJumpButton = document.querySelector("#rightJumpButton");
let metodosControl = document.querySelector("#metodos-control");
let metodos1Button = document.querySelector("#metodos1Button");
let metodos2Button = document.querySelector("#metodos2Button");
let metodos3Button = document.querySelector("#metodos3Button");
let metodos1Control = document.querySelector("#metodos1-control");
let metodos2Control = document.querySelector("#metodos2-control");
let metodos3Control = document.querySelector("#metodos3-control");


window.addEventListener('load', () => {
    if (localStorage.getItem('fst') == null) {
        localStorage.setItem('fst', 'true');
        globalThis.alert('Bienvenido. \nEsta página se encuentra aún en desarrollo, por lo que se recomienda utilizar una computadora para una mejor experiencia. \n\n- Ignacio Apuy Anchía');
    }

    if (localStorage.getItem('dark') == 'true') {
        darkMode();
        document.querySelector(".lIcon-container > img").src = "C/img/lIcon2.png";
    }

    setTimeout(() => {
        for (let e of document.querySelectorAll(".bg > div")) {
            e.style.transition = "1.7s";
        }
    }, 1);
    //tour();
});




window.addEventListener('scroll', () => {
})




function goTo(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const yOffset = -130;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}




function darkMode() {
    for (let e of document.querySelectorAll(".bg > div")) {
        e.classList.toggle("dark");
    }
}





riesgos1Button.addEventListener("click", function (ev) {
    riesgosMostrar(ev, riesgos1Control);
})

riesgos2Button.addEventListener("click", function (ev) {
    riesgosMostrar(ev, riesgos2Control);
})

function riesgosMostrar(ev, el) {
    let bt = ev.target;
    if (bt.tagName != "DIV") {
        bt = bt.parentElement;
    }
    riesgosControl.style.animation = "moveUp 0.2s ease forwards";
    riesgos1Control.classList.add("hidden");
    riesgos2Control.classList.add("hidden");

    if (bt.classList.contains("active")) {
        bt.classList.remove("active");
        riesgosControl.style.animation = "moveDown 0.3s ease forwards";
        return;
    }
    riesgos1Button.classList.remove("active");
    riesgos2Button.classList.remove("active");
    bt.classList.add("active");


    el.classList.remove("hidden");
    el.style.animation = "showUp 0.5s ease forwards";
}



metodos1Button.addEventListener("click", function (ev) {
    metodosMostrar(ev, metodos1Control);
})

metodos2Button.addEventListener("click", function (ev) {
    metodosMostrar(ev, metodos2Control);
})

metodos3Button.addEventListener("click", function (ev) {
    metodosMostrar(ev, metodos3Control);
})

function metodosMostrar(ev, el) {
    let bt = ev.target;
    if (bt.tagName != "DIV") {
        bt = bt.parentElement;
    }

    metodosControl.style.animation = "moveLeft 0.3s ease forwards";
    metodosControl.classList.add("col-md-2");
    metodosControl.classList.remove("col-md-4");
    metodos1Control.classList.add("hidden");
    metodos2Control.classList.add("hidden");
    metodos3Control.classList.add("hidden");

    if (bt.classList.contains("active")) {
        bt.classList.remove("active");
        metodosControl.classList.remove("col-md-2");
        metodosControl.classList.add("col-md-4");
        metodosControl.style.animation = "moveRight 0.4s ease forwards";
        return;
    }

    metodos1Button.classList.remove("active");
    metodos2Button.classList.remove("active");
    metodos3Button.classList.remove("active");

    bt.classList.add("active");

    el.classList.remove("hidden");
    el.style.animation = "showUp 0.6s ease forwards";
}




document.querySelector(".lIcon-container").addEventListener("click", function (ev) {
    if (localStorage.getItem('dark') == 'true') {
        localStorage.setItem('dark', 'false')
        ev.target.src = "C/img/lIcon.png";
    } else {
        localStorage.setItem('dark', 'true');
        ev.target.src = "C/img/lIcon2.png";
    }
    darkMode();
});
document.querySelector(".rIcon-container > img").addEventListener("click", function () { globalThis.scrollTo(0, 0); });

window.addEventListener('resize', () => {
    scrollerIndex = 0;
    scroller.scrollTo({
        left: 0,
        behavior: 'smooth'
    });
})





let scrollerIndex = 0;
const scrollerChildren = scroller.querySelectorAll('.scroll-card > .textbox');
leftJumpButton.addEventListener("click", function () {
    const nextElement = scrollerChildren[scrollerIndex - 1];
    if (nextElement) {
        const nextOffset = nextElement.getBoundingClientRect().left - scroller.getBoundingClientRect().left;

        scroller.scrollTo({
            left: scroller.scrollLeft + nextOffset - (scroller.clientWidth / 2) + (nextElement.clientWidth / 2),
            behavior: 'smooth'
        });
        scrollerIndex--;
    }
})

rightJumpButton.addEventListener("click", function () {

    const nextElement = scrollerChildren[scrollerIndex + 1];

    if (nextElement) {
        const nextOffset = nextElement.getBoundingClientRect().left - scroller.getBoundingClientRect().left;

        scroller.scrollTo({
            left: scroller.scrollLeft + nextOffset - (scroller.clientWidth / 2) + (nextElement.clientWidth / 2),
            behavior: 'smooth'
        });

        scrollerIndex++;
    }
})

let tourIndex = 0;
function tour() {
    globalThis.scrollTo(0, 0);
    globalThis.addEventListener("keydown", function (ev) {
        if (ev.key == "ArrowRight") {
            ev.preventDefault();
            tourIndex++;
            next();
        }
    })
    return "Modo Tour habilitado."
}

function next() {
    console.log(tourIndex);
    switch (tourIndex) {
        case 1:
            goTo("riesgos");
            break;
        case 2:
            riesgos1Button.click();
            break;
        case 3:
            riesgos2Button.click();
            break;
        case 4:
            goTo("datos");
            break;
        case 5: case 6: case 7: case 8: case 9: case 10: case 11:
            rightJumpButton.click();
            break;
        case 12:
            goTo("prevencion");
            break;
        case 13:
            metodos1Button.click();
            break;
        case 14:
            metodos2Button.click();
            break;
        case 15:
            metodos3Button.click();
            break;
        case 16:
            goTo("contacto");
            break;
        case 17:
            globalThis.scrollTo(0, document.body.scrollHeight);
            break;
        case 18:
            end();
            break;
    }
}

function end() {
    document.querySelector(".bg").style.transition = "0s";
    document.querySelector(".bg").style.backgroundColor = "rgba(93, 80, 152, 1)";
    document.querySelector(".navbar-container").classList.add("hidden");
    document.querySelector(".lIcon-container").classList.add("hidden");
    document.querySelector(".rIcon-container").classList.add("hidden");
    document.body.style.overflow = "hidden";
    for (let e of document.querySelectorAll(".bg > div")) {
        e.style.animation = "end 1.5s ease alternate forwards";
    }
    document.querySelector("#end").classList.remove("force-hidden");
    setTimeout(() => {
        document.querySelector("#end > div").style.animation = "showUp 1.5s ease-out forwards";
        document.querySelector("#end > div").classList.remove("force-hidden");
    }, 1500)
    globalThis.scrollTo(0, document.body.scrollHeight);
}
//meter tour guiado, o sea que voy dando →→→ para avanzar automáticamente estilo powerpoint
//al final del tour usar end() y poner un texto de despedida