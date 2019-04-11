varying vec3 v_position;
varying vec3 v_color;

void main() {

  float opacity = distance(gl_FragCoord.xy, vec2(0.5));

  float intensity = distance(v_position * 0.5, vec3(0.));
  gl_FragColor = vec4(intensity * v_color, opacity);
  gl_FragColor = vec4(vec3(gl_FragCoord.xyz), 1.);
}