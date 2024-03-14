const all = document.querySelector("*");
const body = document.querySelector("body");
const point = document.getElementById("point");
const center = document.getElementById("nexus");

const width = window.innerWidth || document.documentElement.clientWidth;
const height = window.innerHeight || document.documentElement.clientHeight;

const ox = width / 2;
const oy = height / 2;

const speed = 7;
const min_distance = 4;
const offset_x = 0;
const offset_y = 0;

let cx = -1;
let cy = -1;

const PI = 3.14;
const TS = 15;

let elapsed = 0;
let text = "";
let doom = false;

document.addEventListener("DOMContentLoaded", startPage);
document.addEventListener("mousemove", mouseMove);
document.addEventListener("click", click);

document.addEventListener("keydown", (e) => {
    const key = e.key;

    text = text + key;
    elapsed = 1;

    if(text === "doomsday") {
        elapsed = 0;
        text = "";
        doomsday();
    }
});

setInterval(tick, TS);

function startPage() {
    console.log(ox, oy);
}

function click(e) {
    console.log(e.clientX, e.clientY);
}

function mouseMove(e) {
    followCursor(e.clientX, e.clientY);
}

function followCursor(x, y) {
    [cx, cy] = [x, y];
}

function tick() {
    if(cx !== -1) {
        const [px, py] = getPointPosition();
        const [dx, dy] = distance([cx, cy], [px, py]);

        const ax = dx / (Math.abs(dx) > speed + 5 ? speed : min_distance);
        const ay = dy / (Math.abs(dy) > speed + 5 ? speed : min_distance);

        changePointPosition(px + ax - offset_x, py + ay - offset_y);
        //console.log(realDistance(nexus, [cx, cy]));
    }
    if(elapsed > 0) {
        elapsed++;
    }
    if(elapsed === 200) {
        elapsed = 0;
        text = "";
    }
}

function distance([fx, fy], [sx, sy]) {
    return [fx-sx, fy-sy];
}

function getPointPosition() {
    return [point.offsetLeft, point.offsetTop];
}

function changePointPosition(x, y) {
    point.style.left = x;
    point.style.top = y;
}

function realDistance([fx, fy], [sx, sy]) {
    return Math.sqrt((fx - sx) ** 2 + (fy - sy) ** 2);
}

function doomsday() {
    if(!doom) all.style.filter = "invert(100%)";
    else all.style.filter = "invert(0%)";
    doom = !doom;
}

/*function newShipPosition(cx, cy) {
    console.log(cx, cy);
    gx = cx;
    gy = cy;

    /*let dx = sx-cx;
    let dy = sy-cy;

    let x = cx + dx/5;
    let y = cy + dy/5;

    console.log(cx, cy);

    let angle = getAngle(cx, cy, x, y);

    triangle.style.left = x + "px";
    triangle.style.top = y + "px";
    triangle.style.rotate = angle + "rad";

    console.log(angle);
}

function spawnBlocks() {
    for(let i = 0; i < stars; i++) {
        let new_block = document.createElement("div");

        new_block.className = "block";
        new_block.style.top = Math.floor(Math.random() * (600 - 1 + 1)) + 1 + "px";
        new_block.style.left = Math.floor(Math.random() * (1300 - 1 + 1)) + 1 + "px";
        
        const size = Math.floor(Math.random() * (s_max - s_min + 1)) + s_min + "px";

        new_block.style.width = size;
        new_block.style.height = size;
        new_block.style.borderRadius = size;

        blocks.appendChild(new_block);
    }
}

// Froxwin (c) 2024
// MIT License
// :trollhd:
function getAngle(mx, my, tx, ty) {
    const slope1 = (mx - tx) / (my - ty)
    const slope2 = 0
    const angle = Math.atan(-((slope1 - slope2) / (1 + (slope1 * slope2))))
    return (my < sy ? angle + 90 : angle + Math.PI)
}
//thanks a lot to my frendo frox for helping me with this function.(rotating the triangle)

function tick() {
    const [tx, ty] = shipPosition();

    //rotateShip(getAngle(gx, gy, tx, ty));
    changeShipPosition(tx + (gx - tx) / ship_speed, ty + (gy - ty) / ship_speed);
}

function isOnPlanet(x, y, ix, iy, tx, ty) {
    return tx > x && tx < ix && ty > y && ty < iy;
}

function shipPosition() {
    const txy = document.getElementById("triangle").getBoundingClientRect();
    return [txy.x, txy.y];
}

function changeShipPosition(x, y) {
    triangle.style.left = x + "px";
    triangle.style.top = y + "px";
}

function rotateShip(rad) {
    triangle.style.rotate = rad + "rad";
}

function revealAbout() {
}*/