varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform float time;

void main() {

    // To pass variables to the fragment shader, you assign them here in the
    // main function. Traditionally you name the varying with vAttributeName
    vNormal = normal;
    vUv = uv;
    vPosition = position*vec3(2.2,1.5,1)+vec3(1,1,(cos(time+position.x*3.0)*(position.x-1.0)));;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);

}