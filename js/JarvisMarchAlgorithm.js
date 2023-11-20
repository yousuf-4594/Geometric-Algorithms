
var pointsList;

class Point { 
    constructor(x, y) { 
        this.x = x; 
        this.y = y; 
    } 
} 
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function orientation(p, q, r) { 
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y); 
    
    if (val == 0) return 0;
    return (val > 0)? 1: 2;
} 
export var speed = 2;

export function convexHull(points, n) {
    if (n < 3) return;

    let hull = [];

    let l = 0;
    for (let i = 1; i < n; i++)
        if (points[i].x < points[l].x)
            l = i;

    let p = l,q;

    function drawLineWithDelay(i) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (orientation(points[p], points[i], points[q]) === 2) {
                    q = i;
                }
                resolve();
            }, 100/speed);
        });
    }

    async function nextIteration() {
        hull.push(points[p]);
        q = (p + 1) % n;
        drawhull(hull);

        for (let i = 0; i < n; i++) {
            if (!hull.includes(points[i]))
                drawLines(points[p], points[i], "#464646");
            await drawLineWithDelay(i);
        }

        p = q;
        drawhull(hull);
        if (p !== l) {
            setTimeout(nextIteration, 200/speed);
        }
    }
    nextIteration();
}

export function drawLines(p1, p2, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(p1.x-2.5, p1.y-22.5);
    ctx.lineTo(p2.x-2.5, p2.y-22.5);
    ctx.stroke();
}

export function drawhull(pointsList) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#782AF5";
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
}