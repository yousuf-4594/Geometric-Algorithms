var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function findSide(p1, p2, p){
    let val = (p.y - p1.y) * (p2.x - p1.x) -(p2.y - p1.y) * (p.x - p1.x);
 
    if (val > 0)
        return 1;
    if (val < 0)
        return -1;
    return 0;
}

function lineDist(p1, p2, p){
    return Math.abs ((p.y - p1.y) * (p2.x - p1.x) - (p2.y - p1.y) * (p.x - p1.x));
}
let hulloutput = [];
 
export async function QuickHullFunction(a, n) {
    if (n < 3) {
        console.log("Convex hull not possible");
        return;
    }

    var hullArray = Array.from(a);

    // Finding the point with minimum and
    // maximum x-coordinate
    let min_x = 0, max_x = 0;
    for (let i = 1; i < n; i++) {
        if (a[i].x < a[min_x].x)
            min_x = i;
        if (a[i].x > a[max_x].x)
            max_x = i;
    }

    await quickHull(a, n, a[min_x], a[max_x], 1, hullArray);
    await quickHull(a, n, a[min_x], a[max_x], -1, hullArray);

}

async function quickHull(a, n, p1, p2, side, hullArray) {
    await sleep(50);

    let ind = -1;
    let max_dist = 0;

    for (let i = 0; i < n; i++) {
        let temp = lineDist(p1, p2, a[i]);
        if ((findSide(p1, p2, a[i]) == side) && (temp > max_dist)) {
            ind = i;
            max_dist = temp;
        }
    }

    if (ind == -1) {
        // Base case: add the end points of L to the convex hull
        hullArray.push(p1);
        hullArray.push(p2);

        hulloutput.push({p1,p2});        
        await drawLines(p1, p2, "#782AF5", 6);
        return;
    }

    // Recur for the two parts divided by a[ind]
    await quickHull(a, n, a[ind], p1, -findSide(a[ind], p1, p2), hullArray);
    await drawLines(a[ind], p1, "#46B530", 1.5);
    await quickHull(a, n, a[ind], p2, -findSide(a[ind], p2, p1), hullArray);
    await drawLines(a[ind], p2, "#F35959", 1.5);
}


async function drawLines(p1, p2, color, width = 1) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;

    ctx.beginPath();
    ctx.moveTo(p1.x - 2.5, p1.y - 22.5);
    ctx.lineTo(p2.x - 2.5, p2.y - 22.5);
    ctx.stroke();
    await sleep(200); // Adjust the delay time (in milliseconds)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

