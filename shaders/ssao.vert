attribute vec3 vertexPosition;
attribute vec2 vertexTexture;

varying vec2 vTexCoord;

void main() {
    vTexCoord = vertexTexture;
    gl_Position = vec4(vertexPosition, 1.0);
}
