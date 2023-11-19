export function bruteForceConvexHull(points, n) {
    if (n < 3) {
        return [];
    }

    // Helper function to calculate the orientation of three points
    function orientation(p, q, r) {
        let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
        if (val == 0) return 0; // collinear
        return (val > 0) ? 1 : 2; // clockwise or counterclockwise
    }

    // Helper function to check if q is on the segment p-r
    function onSegment(p, q, r) {
        return (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
                q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y));
    }

    let hull = [];

    // Iterate through all possible combinations of three points
    for (let i = 0; i < n - 2; i++) {
        for (let j = i + 1; j < n - 1; j++) {
            for (let k = j + 1; k < n; k++) {
                let p = points[i], q = points[j], r = points[k];

                // Check if they are collinear
                if (orientation(p, q, r) === 0) continue;

                // Check if there is any point inside the triangle formed by p, q, r
                let flag = true;
                for (let l = 0; l < n; l++) {
                    if (l !== i && l !== j && l !== k) {
                        if (onSegment(p, points[l], q) || onSegment(q, points[l], r) || onSegment(r, points[l], p)) {
                            flag = false;
                            break;
                        }
                    }
                }

                // If no points are inside, add the triangle to the hull
                if (flag) {
                    hull.push(p, q, r);
                }
            }
        }
    }

    return hull;
}
