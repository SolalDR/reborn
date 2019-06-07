uniform sampler2D map;
uniform sampler2D alphaMap;

varying vec2 vUv;

void main() {
    vec4 mapColor = texture2D(map, vUv);
    vec4 alphaColor = texture2D(alphaMap, vUv);
    gl_FragColor = vec4(mapColor.xyz, alphaColor.x);
}
