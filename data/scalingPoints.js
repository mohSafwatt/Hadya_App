export default function scaleAndAnchorAreas(areas, scaleFactor, xAdd, yAdd) {
  return areas.map(area => {
    const points = area.points;
    const t = area.tolerance || 0;

    // Choose anchor point — top-left of the area
    const anchorX = area.x;
    const anchorY = area.y;

    // Scale points relative to anchor
    const scaledPoints = points.map(p => ({
      x: (anchorX + (p.x - anchorX) * scaleFactor)+ xAdd,
      y: (anchorY + (p.y - anchorY) * scaleFactor)+yAdd
    }));

    // Recalculate area bounding box including tolerance
    const xs = scaledPoints.map(p => p.x);
    const ys = scaledPoints.map(p => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);

    return {
      ...area,
      x: minX - t,
      y: minY - t,
      w: (maxX - minX) + 2 * t,
      h: (maxY - minY) + 2 * t,
      points: scaledPoints
    };
  });
}
