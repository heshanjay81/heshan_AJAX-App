

const divisor = document.querySelector("#divisor");
const slider = document.querySelector("#slider");

function moveDivisor() {
    console.log(slider.value);
    divisor.style.width = slider.value + "%";
      
}
slider.addEventListener("input", moveDivisor);


//Scroll-on-animation

const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 101; 
const images = [];
let imagesLoaded = 0;



// Load all the animation frames
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/scroll_ani/frame_${i.toString().padStart(3, '0')}.webp`;

    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
            initAnimation();
        }
    };

    img.onerror = (e) => {
        console.error(`Image loading failed: ${img.src}`, e);
    };

    images.push(img);
}

const buds = { frame: 0 };

function initAnimation() {
    if (!gsap || !ScrollTrigger) {
        console.error("GSAP and ScrollTrigger are required for this animation.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    gsap.to(buds, {
        frame: frameCount - 1,
        snap: "frame",
        scrollTrigger: {
            trigger: "#explode-view",
            pin: true,
            scrub: 1,
            markers: true,
            start: "top top",
            end: "bottom bottom",
        },
        onUpdate: render
    });

    render(); // Render the first frame
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const currentImage = images[Math.round(buds.frame)];
    if (currentImage && currentImage.complete) {
        context.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
    } else {
        console.warn("Image is not loaded or complete yet:", currentImage);
    }
}

// Ensure canvas is responsive
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    render(); // Re-render after resizing
}

// Event listener for resizing
window.addEventListener("resize", resizeCanvas);
resizeCanvas(); // Initialize canvas size on load
