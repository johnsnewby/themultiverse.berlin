function getCoords() {
    var element = document.getElementById('TheMV');
    var position = element.getBoundingClientRect();
    var y = position.bottom + window.scrollY;
    document.getElementById('infomation').style.top = y + 50 + 'px';
}

var resizeObserver = new ResizeObserver(function (entries) {
    entries.forEach(function (entry) {
        getCoords();
    });
});
resizeObserver.observe(document.getElementById('TheMV'));

document.addEventListener('keydown', function (e) {
    if (e.key === "F12") {
        getCoords();
    }
});

function footerResize() {
    var element = document.getElementById('contact-form-right');
    var position = element.getBoundingClientRect();
    var y = position.bottom + window.scrollY;
    var element2 = document.getElementById('contact-form-left');
    var position2 = element2.getBoundingClientRect();
    var y2 = position2.bottom + window.scrollY;
    var footer = document.getElementById('footer');
    if (y > y2) {
        footer.style.top = y + 80 + 'px';
    } else {
        footer.style.top = y2 + 80 + 'px';
    }

}
window.addEventListener('resize', footerResize);


function smoothScroll(div) {
    closeNav();
    var element = document.getElementById(div.id);
    var position = element.getBoundingClientRect();
    var y = position.top;
    if (window.innerWidth > 600) {
        y = y - 100;
    }
    window.scrollTo({
        top: y + window.scrollY,
        behavior: 'smooth'
    });

} 


document.body.style.zoom="100%"

window.onload = function () {
    document.getElementById('footer').style.display = 'none';
    setTimeout(function () {
        footerResize();
        document.getElementById('footer').style.display = 'flex';
    }, 2);
}

function openNav() {
    document.getElementById("nav").style.width = "100%";
}

function closeNav() {
    document.getElementById("nav").style.width = "0%";
}