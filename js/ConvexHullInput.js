var canvas = document.getElementById('myCanvas');

import{
    convexHull,    
}from './JarvisMarchAlgorithm.js'

import{
    GrahamScanFunction
}from './GrahamScanAlgorithm.js'

import{
    BruteForceFunction
}from './BruteForceAlgorithm.js'

import{
    QuickHullFunction
}from './QuickHullAlgorithm.js'

import{
    AndrewScanFunction
}from './AndrewScanAlgorithm.js'

document.addEventListener("DOMContentLoaded", function () {
    
    var coordinatesArray = [];

    document.addEventListener("click", function (event) {


      var canvasRect = canvas.getBoundingClientRect();
      var canvasTop = canvasRect.top;
      var canvasLeft = canvasRect.left;

      if (
          event.clientX >= canvasLeft &&
          event.clientX <= canvasLeft + canvas.width &&
          event.clientY >= canvasTop &&
          event.clientY <= canvasTop + canvas.height
      ) {

        var circle = document.createElement("div");
        circle.className = "circle";

        var xPosition = event.clientX ; // Adjusting for circle width
        var yPosition = event.clientY ; // Adjusting for circle height
        circle.style.left = xPosition + "px";
        circle.style.top = yPosition + "px";

        document.body.appendChild(circle);


        var canvasRect = canvas.getBoundingClientRect();
        var canvasTop = canvasRect.top;
        console.log(canvasTop);


        coordinatesArray.push({ x: xPosition-10, y: yPosition-canvasTop+27.5 });

      }
    });


    document.getElementById('fileInput').addEventListener('change', handleFileSelect);

    function handleFileSelect(event) {
      var file = event.target.files[0];

      if (file) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var coordinatesText = e.target.result;
          parseCoordinates(coordinatesText);
        };
        reader.readAsText(file);
      }
    }

    function parseCoordinates(coordinatesText) {
      var lines = coordinatesText.split('\n');
      lines.forEach(function(line) {
        var coordinates = line.split(',').map(function(coord) {
          return parseInt(coord.trim());
        });
        if (coordinates.length === 2 && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
          var canvasRect = canvas.getBoundingClientRect();
          var canvasTop = canvasRect.top;
          
          createCircle(coordinates[0]+10, coordinates[1]+canvasTop-27.5);

          
          coordinatesArray.push({ x: coordinates[0], y: coordinates[1]});
        }
      });
    }

    function createCircle(x, y) {
      var circle = document.createElement('div');
      circle.className = 'circle';
      circle.style.left = x + 'px';
      circle.style.top = y + 'px';
      document.body.appendChild(circle);
    }
    
    
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
        
        GrahamScanFunction(pointsList,pointsList.length);

    };
    window.BruteForce = function () {
        console.log("Coordinates Array:", coordinatesArray);

        var pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
        
        BruteForceFunction(pointsList,pointsList.length);

    };
    window.QuickHull = function () {
        console.log("Coordinates Array:", coordinatesArray);

        var pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
        
        QuickHullFunction(pointsList,pointsList.length);

    };

    window.AdrewScan = function () {
        console.log("Coordinates Array:", coordinatesArray);

        var pointsList = coordinatesArray.map(coord => new Point(coord.x, coord.y));
        
        AndrewScanFunction(pointsList);

    };





    

});