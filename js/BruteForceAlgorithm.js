var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function checkLine(point1, point2, allPoints) {
    var a = point2.y - point1.y;
    var b = point1.x - point2.x;
    var c = (point1.x * point2.y) - (point1.y * point2.x);
    var count = 0;
    var side = 0;

    function highlightVertex(index) {
        changeCircleColor(index);
        setTimeout(() => resetCircleColor(index), 150); // Adjust the delay time (in milliseconds)
    }

    function processPoint(k) {
        if (allPoints[k] !== point1 && allPoints[k] !== point2) {
            drawLines(point1,point2, "#464646", 2, true);

            highlightVertex(k);

            if (count === 0) {
                side = collinearity(a, b, c, allPoints[k]);
                if (side !== 0) count++;
            } else if (side === -1 && collinearity(a, b, c, allPoints[k]) === 1) {
                return false;
            } else if (side === 1 && collinearity(a, b, c, allPoints[k]) === -1) {
                return false;
            }

        }
        return true;
    }

    for (var k = 0; k < allPoints.length; k++) {
        if (!processPoint(k)) {
            return false;
        }
    }

    return true;
}
function collinearity(a,b,c,point) {
    if(point.x*a + point.y*b - c > 0){
        return 1;
    }
    if(point.x*a + point.y*b - c < 0){
        return -1;
    }
    return 0;
}

export function BruteForceFunction(points, n) {
    if (n < 3) {
        console.error("Convex hull not possible with less than 3 points");
        return [];
    }

    const hull = [];
    const delay = 200;
    const bufferTemp = [];

    function drawBufferLines() {
        // Draw lines stored in bufferTemp array
        bufferTemp.forEach(([p1, p2]) => {
            drawLines(p1, p2, "#782AF5", 5, false);
        });

    }


    function processPair(i, j) {
        setTimeout(() => {
            if (checkLine(points[i], points[j], points)) {
                if (!hull.includes(points[i])) {
                    hull.push(points[i]);
                }
                if (!hull.includes(points[j])) {
                    hull.push(points[j]);
                }
                bufferTemp.push([points[i], points[j]]);
            }
            if (i === n - 2 && j === n - 1) {
                // This is the last iteration, do any finalization here
                console.log("Convex hull found:", hull);
            }
            drawBufferLines();
        }, delay * (i * (n - 1) + j));
    }


    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            processPair(i, j);
        }
    }
}


function drawLines(p1, p2, color, width=1, flag) {
    if(flag)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(p1.x-2.5, p1.y-22.5);
    ctx.lineTo(p2.x-2.5, p2.y-22.5);
    ctx.stroke();
}

function changeCircleColor(index) {
    var circles = document.querySelectorAll(".circle");
    if (index >= 0 && index < circles.length) {        
        circles[index].style.backgroundColor = "#464646";
    }
}

function resetCircleColor(index) {
    var circles = document.querySelectorAll(".circle");
    if (index >= 0 && index < circles.length) {        
        circles[index].style.backgroundColor = 'rgb(183, 0, 255)';
    }
}


function drawhull(pointsList) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;

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
