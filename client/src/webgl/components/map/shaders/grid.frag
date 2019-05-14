varying vec2 vUv;

uniform vec2 size;
uniform float width;

void main(){
    // Normalized pixel coordinates (from 0 to 1)
    
    vec2 newUv = vUv + vec2(width)/2.;

    float intensity = 0.; 
    if(mod(newUv.x, (1./size.x)) < width) {
    	intensity = .6;
    }
    
    if(mod(newUv.y, (1./size.y)) < width) {
    	intensity = .6;
    }
    
    gl_FragColor = vec4(vec3(1.), intensity);
}