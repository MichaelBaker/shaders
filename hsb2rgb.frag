uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PI 6.28318530718

vec3 hsb2rgb(in vec3 hsb){
  vec3 c   = vec3((hsb.x/TWO_PI)+0.5,hsb.y,hsb.z);
  vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
  rgb      = rgb*rgb*(3.0-2.0*rgb);
  return c.z * mix( vec3(1.0), rgb, c.y);
}

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;
  vec2 toCenter = vec2(0.5) - st;
  float angle   = atan(toCenter.y, toCenter.x);
  float radius  = length(toCenter) * 2.0;
  gl_FragColor  = vec4(hsb2rgb(vec3(angle, radius, 1.0)), 1.0);
}
