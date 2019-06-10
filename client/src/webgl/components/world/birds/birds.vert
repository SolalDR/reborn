uniform float time;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec3 newPosition = position;
    newPosition.y += min(1., (cos(time) * .5) * pow((vUv.x - .5) * 2., 2.));

    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1. );
}
