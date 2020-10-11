
varying vec3 Position;
varying vec3 Normal;
varying vec2 v_uv;

void main() {

    Position = position;
    Normal = normal;
    v_uv = uv;

    // modelViewMatrix actuallyy = viewMatrix * modelMatrix
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}