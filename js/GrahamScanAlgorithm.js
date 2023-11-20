var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');


class Point {
	constructor(x = null, y = null) {
		this.x = x;
		this.y = y;
	}
}


let p0 = new Point(0, 0);

// A utility function to find next to top in a stack
function nextToTop(stack) {
    return stack[stack.length - 2];
}

// A utility function to return the square of the distance between p1 and p2
function distSq(p1, p2) {
	return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
}

// To find the orientation of the ordered triplet (p, q, r).
// The function returns the following values:
// 0 --> p, q, and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p, q, r) {
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;  // Collinear
    return (val > 0) ? 1 : 2; // Clockwise or Counterclockwise
}

function compare(p1, p2) {
	// Find orientation
	let o = orientation(p0, p1, p2);
	if (o == 0) {
		return distSq(p0, p2) >= distSq(p0, p1) ? -1 : 1;
	} else {
		return o == 2 ? -1 : 1;
	}
}

export function GrahamScanFunction(points, n) {
    if (n < 3) {
        return [];
    }

    let minY = points[0].y;
    let minIndex = 0;

    for (let i = 1; i < n; i++) {
        let y = points[i].y;
        if (y < minY || (y === minY && points[i].x < points[minIndex].x)) {
            minY = y;
            minIndex = i;
        }
    }

    [points[0], points[minIndex]] = [points[minIndex], points[0]];


    changeColor(points[0]);
    createPivotLines(points);

    points.sort((a, b) => {
        let angleA = Math.atan2(a.y - minY, a.x - points[0].x);
        let angleB = Math.atan2(b.y - minY, b.x - points[0].x);
        return angleA - angleB;
    });

    let hull = [points[0], points[1], points[2]];

    async function drawWithDelay() {
        for (let i = 3; i < n; i++) {
            createPivotLines(points);
            while (hull.length > 1 && orientation(nextToTop(hull), hull[hull.length - 1], points[i]) !== 2) {
                drawLines( hull[hull.length - 1], nextToTop(hull), "#FF6969", 5);
                hull.pop();
                await delay(300);
            }
            drawLines( hull[hull.length - 1], points[i], "#4FED6F", 5);
            await delay(500);
            hull.push(points[i]);
            drawhull(hull);
            
        }
        drawhull(hull,true);
    }
    drawWithDelay();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function createPivotLines(points){
    let pivot = points[0];

    for(let i=0;i<points.length;i++){
        drawLines(pivot, points[i], "#464646", 0.5);
    }
}

function changeColor(pivot){

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

export function drawLines(p1, p2, color, width=1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(p1.x-2.5, p1.y-22.5);
    ctx.lineTo(p2.x-2.5, p2.y-22.5);
    ctx.stroke();
}

export function drawhull(pointsList, connect=false) {
    for(var i=0;i<pointsList.length;i++)
        console.log(pointsList[i]);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#782AF5";
    ctx.lineWidth = 5;

    for (var i = 0; i < pointsList.length - 1; i++) {
        ctx.beginPath();
        ctx.moveTo(pointsList[i].x-2.5, pointsList[i].y-22.5);
        ctx.lineTo(pointsList[i + 1].x-2.5, pointsList[i + 1].y-22.5);
        ctx.stroke();
    }
    if(connect){
        ctx.beginPath();
        ctx.moveTo(pointsList[pointsList.length - 1].x - 2.5, pointsList[pointsList.length - 1].y - 22.5);
        ctx.lineTo(pointsList[0].x - 2.5, pointsList[0].y - 22.5);
        ctx.stroke();
    }
}
