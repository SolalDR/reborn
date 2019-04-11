uniform float step;
uniform float intensity;
uniform float threshold;

float sobel_intensity(in vec4 color){
	return sqrt((color.x*color.x)+(color.y*color.y)+(color.z*color.z));
}

float when_gt(float x, float y) {
  return max(sign(x - y), 0.0);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, const in float depth, out vec4 outputColor) {

  float stepx = step*0.001;
  float stepy = step*0.001*aspect;

  float tleft =   sobel_intensity(texture2D(inputBuffer, uv + vec2(-stepx,stepy)));
  float left =    sobel_intensity(texture2D(inputBuffer, uv + vec2(-stepx,0)));
  float bleft =   sobel_intensity(texture2D(inputBuffer, uv + vec2(-stepx,-stepy)));
  float top =     sobel_intensity(texture2D(inputBuffer, uv + vec2(0,stepy)));
  float bottom =  sobel_intensity(texture2D(inputBuffer, uv + vec2(0,-stepy)));
  float tright =  sobel_intensity(texture2D(inputBuffer, uv + vec2(stepx,stepy)));
  float right =   sobel_intensity(texture2D(inputBuffer, uv + vec2(stepx,0)));
  float bright =  sobel_intensity(texture2D(inputBuffer, uv + vec2(stepx,-stepy)));

  float x = tleft + 2.0*left + bleft - tright - 2.0*right - bright;
  float y = -tleft - 2.0*top - tright + bleft + 2.0 * bottom + bright;
  float color = sqrt((x*x) + (y*y));

  color = when_gt(color, threshold);

  outputColor = inputColor - vec4(vec3(color), 1.)*intensity;
}
