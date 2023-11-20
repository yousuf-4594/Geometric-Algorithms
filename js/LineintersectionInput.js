var canvas = document.getElementById('myCanvas');

import{
    doIntersect1,
    doIntersect2,
    doIntersect3,
    drawLines
}from '../js/LineintersectionAlgorithm.js'



document.addEventListener("DOMContentLoaded", function () {
    // Array to store coordinates
    var coordinatesArray = [];
    var pointsList;

    document.addEventListener("click", function (event) {
        if (coordinatesArray.length < 4) {
    
            console.log("mouseclick at: x:"+event.clientX+" y:"+event.clientY);



            var canvasRect = canvas.getBoundingClientRect();
            var canvasTop = canvasRect.top;
            var canvasLeft = canvasRect.left;
    
            if (
                event.clientX >= canvasLeft &&
                event.clientX <= canvasLeft + canvas.width &&
                event.clientY >= canvasTop &&
                event.clientY <= canvasTop + canvas.height
            ) {

                // Create a new div element for the circle
                var circle = document.createElement("div");

                circle.className = "circle";

                // Set the position of the circle at the mouse click coordinates
                var xPosition = event.clientX - 5;
                var yPosition = event.clientY - 5;
                circle.style.left = xPosition + "px";
                circle.style.top = yPosition + "px";

                if (coordinatesArray.length < 2) 
                    circle.style.backgroundColor = "#e36b79";
                else
                    circle.style.backgroundColor = "#995cff";
                    
                    
                document.body.appendChild(circle);
                // canvasDiv.appendChild(circle);

                var canvasRect = canvas.getBoundingClientRect();
                var canvasTop = canvasRect.top;
                console.log(canvasTop);

                coordinatesArray.push({ x: xPosition-10, y: yPosition-canvasTop+27.5});

                if (coordinatesArray.length === 2) 
                    drawLines(coordinatesArray[0], coordinatesArray[1], "#e36b79");
                
                if (coordinatesArray.length === 4) 
                    drawLines(coordinatesArray[2], coordinatesArray[3], "#995cff");
            }
        
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
        if(doIntersect1(pointsList[0], pointsList[1], pointsList[2], pointsList[3])) {
            updateIntersectionAlert("Orientation Test Method: Lines Intersect", true);
        } else {
            updateIntersectionAlert("Orientation Test Method: Lines do not Intersect", false);
        }
    };
    
    window.doIntersectMethod2 = function () {
        console.log("Coordinates Array:", coordinatesArray);
    
        pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
        let point = doIntersect2(pointsList[0], pointsList[1], pointsList[2], pointsList[3]);
        if (point !== null) {
            updateIntersectionAlert("Relative Gradient Method: Lines Intersect", true);
        } else {
            updateIntersectionAlert("Relative Gradient Method: Lines do not Intersect", false);
        }
    };
    
    window.doIntersectMethod3 = function () {
        console.log("Coordinates Array:", coordinatesArray);
    
        pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
        let results = doIntersect3(pointsList[0], pointsList[1], pointsList[2], pointsList[3]);
        if (results.result == 1) {
            console.log('yes');
            console.log(results.x);
            console.log(results.y);
            updateIntersectionAlert("Crammer Intersection Method: Lines Intersect", true);
        } else {
            console.log('no');
            updateIntersectionAlert("Crammer Intersection Method: Lines do not Intersect", false);
        }
    };
});

function updateIntersectionAlert(result, type) {
    const alertElement = document.getElementById("intersectionAlert");
    alertElement.textContent = `${result}`;
    if(type)
        alertElement.className="alert alert-info custom-width custom-margin";
    else
        alertElement.className="alert alert-danger custom-width custom-margin";
}

