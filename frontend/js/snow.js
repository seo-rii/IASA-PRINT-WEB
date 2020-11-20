let canvas
let ctx
let particlesOnScreen = 245
let particlesArray = []
let w, h

function random(min, max) {
    return min + Math.random() * (max - min + 1)
}

function clientResize() {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
}

window.addEventListener("resize", clientResize)

function createSnowFlakes() {
    for (let i = 0; i < particlesOnScreen; i++) {
        particlesArray.push({
            x: Math.random() * w,
            y: Math.random() * h,
            opacity: Math.random(),
            speedX: random(-1, 1),
            speedY: random(1, 3),
            radius: random(0.5, 1.5),
        })
    }
}

function drawSnowFlakes() {
    for (let i = 0; i < particlesArray.length; i++) {
        let gradient = ctx.createRadialGradient(
            particlesArray[i].x,
            particlesArray[i].y,
            0,
            particlesArray[i].x,
            particlesArray[i].y,
            particlesArray[i].radius
        )

        gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")")  // white
        gradient.addColorStop(.8, "rgba(210, 236, 242," + particlesArray[i].opacity + ")")  // bluish
        gradient.addColorStop(1, "rgba(237, 247, 249," + particlesArray[i].opacity + ")")   // lighter bluish

        ctx.beginPath()
        ctx.arc(
            particlesArray[i].x,
            particlesArray[i].y,
            particlesArray[i].radius,
            0,
            Math.PI * 2,
            false
        )

        ctx.fillStyle = gradient
        ctx.fill()
    }
}

function moveSnowFlakes() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].x += particlesArray[i].speedX
        particlesArray[i].y += particlesArray[i].speedY

        if (particlesArray[i].y > h) {
            particlesArray[i].x = Math.random() * w * 1.5
            particlesArray[i].y = -50
        }
    }
}

function updateSnowFall() {
    ctx.clearRect(0, 0, w, h)
    drawSnowFlakes()
    moveSnowFlakes()
}

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
    clientResize()
    setInterval(updateSnowFall)
    createSnowFlakes()
})
