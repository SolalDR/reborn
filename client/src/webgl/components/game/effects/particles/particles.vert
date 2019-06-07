void main() {
  gl_PointSize = 50.;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
}