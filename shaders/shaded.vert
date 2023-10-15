attribute vec4 vertexPosition;
attribute vec2 vertexTexture;
attribute vec3 vertexNormal;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

varying vec2 uv;
varying vec3 normal;
varying vec4 worldPosition;
varying vec4 viewPosition;
varying vec3 origNormal;

float getLength(float x, float y, float z) {
  return sqrt(x*x + y*y + z*z);
}

vec3 calculateNormal() {
  // Get row scales
  float sx = getLength(modelMatrix[0][0], modelMatrix[1][0], modelMatrix[2][0]);
  float sy = getLength(modelMatrix[0][1], modelMatrix[1][1], modelMatrix[2][1]);
  float sz = getLength(modelMatrix[0][2], modelMatrix[1][2], modelMatrix[2][2]);

  // Isolate rotation matrix
  mat4 rotationMatrix = mat4(
    modelMatrix[0][0] / sx, modelMatrix[0][1] / sy, modelMatrix[0][2] / sz, 0,
    modelMatrix[1][0] / sx, modelMatrix[1][1] / sy, modelMatrix[1][2] / sz, 0,
    modelMatrix[2][0] / sx, modelMatrix[2][1] / sy, modelMatrix[2][2] / sz, 0,
    0, 0, 0, 1
  );

  // Calculate normal
  return (rotationMatrix * vec4(vertexNormal.xyz, 1.0)).xyz;
}

void main() {
  normal = calculateNormal();
  uv = vertexTexture;
  origNormal = vertexNormal;
  worldPosition = modelMatrix * vertexPosition;
  viewPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vertexPosition;
}
