import{
    convexHull,    
}from './JarvisMarchAlgorithm.js'

import{
    convexHull,    
}from './GrahamScanAlgorithm.js'

document.addEventListener("DOMContentLoaded", function () {
    
    var coordinatesArray = [];

    document.addEventListener("click", function (event) {
        var circle = document.createElement("div");
        circle.className = "circle";

        var xPosition = event.clientX ; // Adjusting for circle width
        var yPosition = event.clientY ; // Adjusting for circle height
        circle.style.left = xPosition + "px";
        circle.style.top = yPosition + "px";

        document.body.appendChild(circle);
        coordinatesArray.push({ x: xPosition, y: yPosition });
    });

    
    class Point { 
        constructor(x, y) { 
            this.x = x; 
            this.y = y; 
        } 
    } 

    window.jarvisMarch = function () {
        console.log("Coordinates Array:", coordinatesArray);

        var pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
        
        convexHull(pointsList,pointsList.length);

    };
    window.GrahamScan = function () {
        console.log("Coordinates Array:", coordinatesArray);

        var pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
        
        convexHull(pointsList,pointsList.length);

    };


});