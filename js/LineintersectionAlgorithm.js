class Point { 
  constructor(x, y) { 
      this.x = x; 
      this.y = y; 
  } 
};


function onSegment(p, q, r) { 
  if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && 
      q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y)) 
    return true; 
  
  return false; 
}

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
function orientation(p, q, r) {
  let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y); 
  if (val == 0) return 0; // collinear 
        
  return (val > 0)? 1: 2; // clock or counterclock wise 
}

// Prints convex hull of a set of n points. 
export function doIntersect1(p1, q1, p2, q2) { 

  // Find the four orientations needed for general and 
  // special cases 
  let o1 = orientation(p1, q1, p2); 
  let o2 = orientation(p1, q1, q2); 
  let o3 = orientation(p2, q2, p1); 
  let o4 = orientation(p2, q2, q1); 
  
  // General case 
  if (o1 != o2 && o3 != o4) 
      return true; 
  
  // Special Cases 
  // p1, q1 and p2 are collinear and p2 lies on segment p1q1 
  if (o1 == 0 && onSegment(p1, p2, q1)) return true; 
  
  // p1, q1 and q2 are collinear and q2 lies on segment p1q1 
  if (o2 == 0 && onSegment(p1, q2, q1)) return true; 
  
  // p2, q2 and p1 are collinear and p1 lies on segment p2q2 
  if (o3 == 0 && onSegment(p2, p1, q2)) return true; 
  
  // p2, q2 and q1 are collinear and q1 lies on segment p2q2 
  if (o4 == 0 && onSegment(p2, q1, q2)) return true; 
  
  return false; // Doesn't fall in any of the above cases 
} 

export function doIntersect2(p1, q1, p2, q2) {
  let x1 = p1.x, y1 = p1.y;
  let x2 = q1.x, y2 = q1.y;
  let x3 = p2.x, y3 = p2.y;
  let x4 = q2.x, y4 = q2.y;

  let denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom === 0) {  // parallel
      return null;
  }
  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  if (ua < 0 || ua > 1) {  // out of range
      return null;
  }
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
  if (ub < 0 || ub > 1) {  // out of range
      return null;
  }
  let x = x1 + ua * (x2 - x1);
  let y = y1 + ua * (y2 - y1);
  return { x, y };
}

export function doIntersect3(p0, p1, p2, p3) {
  let s1 = new Point(p1.x - p0.x, p1.y - p0.y);
  let s2 = new Point(p3.x - p2.x, p3.y - p2.y);

  let s, t;
  let x, y;
  let i = new Point(-1, -1);
  s = (-s1.y * (p0.x - p2.x) + s1.x * (p0.y - p2.y)) / (-s2.x * s1.y + s1.x * s2.y);
  t = (s2.x * (p0.y - p2.y) - s2.y * (p0.x - p2.x)) / (-s2.x * s1.y + s1.x * s2.y);

  if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
      if (i.x != -1)
          i.x = p0.x + (t * s1.x);
      if (i.y != -1)
          i.y = p0.y + (t * s1.y);
      return { result: 1, x: p0.x + (t * s1.x), y: p0.y + (t * s1.y) };
  }

  return { result: 0, x: 0, y: 0 };
}


export function drawLines(p1, p2, color) {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Set the line color and width
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(p1.x-2.5, p1.y-22.5);
  ctx.lineTo(p2.x-2.5, p2.y-22.5);
  ctx.stroke();
    
}