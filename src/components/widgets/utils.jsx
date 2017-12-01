export function getColor(index, opacity) {
  // Google colors
  const colors = [
    [51, 102, 204], [220, 57, 18], [16, 150, 24], [255, 153, 0], [153, 0, 153],
    [59, 62, 172], [0, 153, 198], [221, 68, 119], [102, 170, 0], [184, 46, 46],
    [49, 99, 149], [153, 68, 153], [34, 170, 153], [170, 170, 17], [102, 51, 204],
    [230, 115, 0], [139, 7, 7], [50, 146, 98], [85, 116, 166], [59, 62, 172]
  ]
  index = index % colors.length 
  return 'rgba('+colors[index][0]+', '+colors[index][1]+', '+colors[index][1]+', '+opacity+')';
}