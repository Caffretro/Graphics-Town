uniform sampler2D colormap;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
    vec4 lookupColor = texture2D(colormap,vUv);
    gl_FragColor = lookupColor;
}
