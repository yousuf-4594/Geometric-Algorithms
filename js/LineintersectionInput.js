import{
    doIntersect1,
    doIntersect2,
    drawLines
}from '../js/LineintersectionAlgorithm.js'

document.addEventListener("DOMContentLoaded", function () {
// Array to store coordinates
var coordinatesArray = [];
var pointsList;

document.addEventListener("click", function (event) {
    if (coordinatesArray.length < 4) {
    
        console.log("mouseclick at: x:"+event.clientX+" y:"+event.clientY);

        // Create a new div element for the circle
        var circle = document.createElement("div");
        circle.className = "circle";

        // Set the position of the circle at the mouse click coordinates
        var xPosition = event.clientX - 5;
        var yPosition = event.clientY - 5;
        circle.style.left = xPosition + "px";
        circle.style.top = yPosition + "px";

        if (coordinatesArray.length < 2) 
            circle.style.backgroundColor = "red";
        else
            circle.style.backgroundColor = "green";
            
            
        document.body.appendChild(circle);            
        // Store the coordinates in the array
        coordinatesArray.push({ x: xPosition, y: yPosition });

        if (coordinatesArray.length === 2) 
            drawLines(coordinatesArray[0], coordinatesArray[1]);
        
        if (coordinatesArray.length === 4) 
            drawLines(coordinatesArray[2], coordinatesArray[3]);
        
    }
});
class Point { 
    constructor(x, y) { 
        this.x = x; 
        this.y = y; 
    } 
};
window.doIntersectMethod1 = function () {
    console.log("Coordinates Array:", coordinatesArray);

    pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
    if(doIntersect1(pointsList[0],pointsList[1],pointsList[2],pointsList[3]))
        document.write("Yes<br>"); 
    else
        document.write("No<br>"); 
};

window.doIntersectMethod2 = function () {
    console.log("Coordinates Array:", coordinatesArray);

    pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
    let point = doIntersect2(pointsList[0],pointsList[1],pointsList[2],pointsList[3]);
    if(point !== null)
        document.write("Yes<br>"); 
    else
        document.write("No<br>"); 
};
});