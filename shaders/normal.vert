attribute vec4 vertexPosition;
attribute vec2 vertexTexture;
attribute vec3 vertexNormal;

uniform mat4 modelMatrix;
uniform mat4 rotationMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec3 normal;

void main() {
  normal = (rotationMatrix * vec4(vertexNormal.xyz, 1.0)).xyz;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertexPosition;
}
