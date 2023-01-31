export const vertexShader = `


    mat3 rotation3dY(float angle) {
        float s = sin(angle);
        float c = cos(angle);
    
        return mat3(
        c, 0.0, -s,
        0.0, 1.0, 0.0,
        s, 0.0, c
        );
    }
  

    uniform float uTime;
    uniform float uRadius;

    varying float vDistance;
    varying vec2 vUv;

    void main(){
        float distanceFactor = pow(uRadius - distance(position, vec3(0.0)),2.0);

        vec3 particlePosition = position * rotation3dY(uTime * 0.2 * distanceFactor);

        vec4 modelPosition = modelMatrix * vec4(particlePosition,1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;


        gl_Position = projectedPosition;


        float size = distanceFactor * 5.0 +5.0;

        gl_PointSize = size;
        // Size attenuation
        gl_PointSize *= (1.0 / -viewPosition.z);


        vDistance = distanceFactor;
        vUv = uv;
    }
`