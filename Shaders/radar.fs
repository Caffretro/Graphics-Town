
#define PI 3.14159265359
precision highp float;

varying vec3 Position;
varying vec3 Normal;
varying vec2 v_uv;

uniform float time;
uniform float radius;
uniform float glowStrength;
uniform vec3 color;
uniform float fillStrength;
uniform vec2 resolution;

float d2y(float d) {
    return 1. / (0.2 + d);
}

float fct(vec2 p, float r) {
    float a = 3.0 * mod(-atan(p.y, p.x) + time, 2.0 * PI);
    return (d2y(a) + fillStrength) * (2.0 - step(radius, r));
}

float circle(vec2 p, float r) {
    float d = distance(r, radius);
    return d2y(50.0 * d);
}


void main(void) {
    vec2 position = ((v_uv.xy) - 0.5 * resolution) / resolution.y;
    position /= cos(1.5 * length(position));
    float y = 0.0;
    float dc = length(position);
    y += fct(position, dc);
    y += circle(position, dc);
    y = pow(y, 1.0 / glowStrength );
    gl_FragColor = vec4(sqrt(y) * color, 1.0);
}

