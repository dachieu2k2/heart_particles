export const fragmentShader = `

    uniform sampler2D uTexture;


    varying float vDistance;
    varying vec2 vUv;


    void main(){

        vec3 color = vec3(0.34, 0.53, 0.96);

        float strength = distance(gl_PointCoord,vec2(0.6));
        strength = 1.0 - strength;
        strength = pow(strength,3.0);
        color = mix(color, vec3(0.97, 0.70, 0.45), vDistance * 0.9);

        color = mix(vec3(0.0), color,strength);
        vec3 texture = texture2D(uTexture, vUv).rgb;
        
        gl_FragColor = vec4(color, strength);
    }
`