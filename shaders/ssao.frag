precision highp float;

uniform sampler2D uDepthTexture;
varying vec2 vTexCoord;

float random(vec3 scale, float seed) {
    // Basic random function
    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);
}

void main() {
    float depth = texture2D(uDepthTexture, vTexCoord).r;
    
    float occlusion = 0.0;
    for(int i = 0; i < 4; ++i) { // Using 4 samples for simplicity, increase for better quality
        float rand = random(vec3(12.9898, 78.233, 151.7182), float(i));
        vec2 offset = vec2(cos(rand), sin(rand)) * 0.1; // 0.1 as sample radius
        occlusion += texture2D(uDepthTexture, vTexCoord + offset).r > depth + 0.05 ? 1.0 : 0.0;
    }
    
    occlusion = 1.0 - (occlusion / 4.0);
    // gl_FragColor = vec4(vec3(occlusion), 1.0);
    gl_FragColor = vec4(1.0, 0.0, 0.0, 3.0);
}
