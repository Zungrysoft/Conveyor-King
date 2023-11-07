precision mediump float;

varying vec3 normal;

void main() {
  gl_FragColor = vec4((normal.x+1.0)/2.0, (normal.y+1.0)/2.0, (normal.z+1.0)/2.0, 1.0);
}

