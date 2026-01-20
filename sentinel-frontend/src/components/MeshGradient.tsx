import { useEffect, useRef } from 'react';

/**
 * WebGL Moving Mesh Gradient
 * Creates an animated gradient effect using Stripe-inspired colors
 * Colors: #635BFF (Primary Blue), #00D4FF (Cyan), #97FBD1 (Mint)
 */
export default function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS gradient');
      return;
    }

    // Set canvas size
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader with animated mesh gradient
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;

      // Sentinel brand colors
      vec3 color1 = vec3(0.388, 0.357, 1.0);    // #635BFF - Primary Blue
      vec3 color2 = vec3(0.0, 0.831, 1.0);       // #00D4FF - Cyan
      vec3 color3 = vec3(0.592, 0.984, 0.820);   // #97FBD1 - Mint

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;

        // Create animated wave patterns
        float wave1 = sin(uv.x * 3.0 + u_time * 0.5) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 3.0 - u_time * 0.3) * 0.5 + 0.5;
        float wave3 = sin((uv.x + uv.y) * 2.0 + u_time * 0.4) * 0.5 + 0.5;

        // Blend colors based on wave patterns
        vec3 color = mix(color1, color2, wave1);
        color = mix(color, color3, wave2 * 0.7);

        // Add depth with radial gradient
        float radial = distance(uv, vec2(0.5, 0.5));
        color = mix(color, color * 0.8, radial * 0.5);

        // Subtle noise for texture
        float noise = fract(sin(dot(uv + u_time * 0.1, vec2(12.9898, 78.233))) * 43758.5453);
        color += noise * 0.02;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile shader
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create full-screen quad
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    // Animation loop
    let startTime = Date.now();
    let animationId: number;

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    render();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{
        background: 'linear-gradient(135deg, #635BFF 0%, #00D4FF 50%, #97FBD1 100%)',
      }}
    />
  );
}
