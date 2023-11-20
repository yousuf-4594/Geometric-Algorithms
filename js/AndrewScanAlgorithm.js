var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


class Point {
    constructor(x = -1, y = -1) {
        this.x = x;
        this.y = y;
    }
}

function cross(a, b, o) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
}


export async function AndrewScanFunction(points){
    points.sort(function (a, b) {
        return a.x == b.x ? a.y - b.y : a.x - b.x;
    });

    
    var lower = [];
    for (var i = 0; i < points.length; i++) {
        await changeColor(points[points.length-1]);
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
            await drawLines(lower[lower.length - 1], points[i], 'green', 2.5);
            lower.pop();
        }
        lower.push(points[i]);
        await drawhull(lower, "#F52A71");
    }
    await sleep(1000);
    var upper = [];
    for (var i = points.length - 1; i >= 0; i--) {
        await changeColor(points[points.length-1]);
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
            await drawLines(lower[lower.length - 1], points[i], 'green', 2.5);
            upper.pop();
        }
        upper.push(points[i]);
        await drawhull(upper, "#2A63F5");
    }

    upper.pop();
    lower.pop();
    let hull =  lower.concat(upper);

    await sleep(1000);
    drawhull(hull, "#782AF5");

}

function changeColor(pivot) {
    var canvasRect = canvas.getBoundingClientRect();
    var canvasTop = canvasRect.top;

    var newPoint = { x: pivot.x+10, y: pivot.y +canvasTop-27.5};



    var circle = document.createElement("div");
    circle.className = "circle";
    circle.style.left = pivot.x+10 + "px";
    circle.style.top = pivot.y+canvasTop-27.5 + "px";
    circle.style.backgroundColor = 'red';

    document.body.appendChild(circle);

    newPoint.element = circle;

}


async function drawLines(p1, p2, color, width=1,) {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(p1.x-2.5, p1.y-22.5);
    ctx.lineTo(p2.x-2.5, p2.y-22.5);
    ctx.stroke();
    await sleep(200);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function drawhull(pointsList, color) {
    for(var i=0;i<pointsList.length;i++)
        console.log(pointsList[i]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = color;
    ctx.lineWidth = 5;

    for (var i = 0; i < pointsList.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(pointsList[i].x-2.5, pointsList[i].y-22.5);
        ctx.lineTo(pointsList[i + 1].x-2.5, pointsList[i + 1].y-22.5);
        ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(pointsList[pointsList.length - 1].x - 2.5, pointsList[pointsList.length - 1].y - 22.5);
    ctx.lineTo(pointsList[0].x - 2.5, pointsList[0].y - 22.5);
    ctx.stroke();
    await sleep(200); 
}