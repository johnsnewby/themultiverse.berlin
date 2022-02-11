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


function openNav() {
    document.body.style.overflow = 'hidden';
    document.getElementById("nav").style.width = "100%";
}

function closeNav() {
    document.body.style.overflow = 'auto';
    document.getElementById("nav").style.width = "0%";
}


var slideIndex = 1;

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


var slideIndex = 0;
showSlides();
