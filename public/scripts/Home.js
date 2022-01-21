function getCoords() {
    var element = document.getElementById('TheMV');
    var position = element.getBoundingClientRect();
    var y = position.bottom + window.scrollY;
    document.getElementById('infomation').style.top = y + 50 + 'px';
    console.log(y);
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