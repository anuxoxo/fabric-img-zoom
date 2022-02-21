let canvas = new fabric.Canvas('c'), fileTag;
let imgElement = new Image();
let container = document.getElementById('container');

// resize canvas according to container's dimensions
let resizeObserver = new ResizeObserver(() => {
    canvas.setWidth(container.clientWidth)
    canvas.setHeight(container.clientHeight)
});
resizeObserver.observe(container);

// read image file 
fileTag = document.getElementById("file");
fileTag.addEventListener("change", function () {
    readImage(this);
});

function readImage(input) {
    let reader;

    if (input.files && input.files[0]) {
        reader = new FileReader();

        reader.onload = function (e) {
            // add image to canvas
            imgElement.src = e.target.result;

            imgElement.onload = function () {
                let imgInstance = new fabric.Image(imgElement, { selectable: false });
                canvas.add(imgInstance);
                canvas.centerObject(imgInstance)
            }
        }
        reader.readAsDataURL(input.files[0]);

    }
}

// zoom in/out functionality
canvas.on('mouse:wheel', function (opt) {
    console.log(opt)
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom < 1) {
        zoom = 1;
        canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
    }
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
});