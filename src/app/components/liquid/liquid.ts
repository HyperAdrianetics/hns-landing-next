// Motor del líquido de marca: metaballs con mezcla de color y brillo especular.
// Lo usan el hero (pintura dentro del logo) y la pausa (el logo emerge).

export type RGB = [number, number, number];
export type RGBA = [number, number, number, number];

export type LiquidBlob = {
  /** Centro en unidades normalizadas: 0,0 es el centro y 1 la mitad del lado menor. */
  x: number;
  y: number;
  /** Radio en las mismas unidades. */
  r: number;
  color: RGB;
  /** Amplitud del vaivén en x/y. */
  ax: number;
  ay: number;
  /** Velocidad angular (rad/s) y fase inicial. */
  speed: number;
  phase: number;
};

export const MAX_BLOBS = 8;

export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export const PAINT = {
  magenta: hexToRgb("#f06fae"),
  gold: hexToRgb("#e8b64c"),
  green: hexToRgb("#a7cf9e"),
  indigo: hexToRgb("#3a3f8f"),
  copper: hexToRgb("#b5553f"),
  cream: hexToRgb("#d2d2af"),
} as const;

/**
 * Posiciones del frame `t` (segundos) empaquetadas como x,y,r por mancha.
 * `spread` > 1 separa las manchas del centro (se usa en la entrada "converge").
 */
export function blobFrame(
  blobs: LiquidBlob[],
  t: number,
  spread = 1,
  out = new Float32Array(MAX_BLOBS * 3)
): Float32Array {
  for (let i = 0; i < Math.min(blobs.length, MAX_BLOBS); i++) {
    const b = blobs[i];
    const x = b.x + b.ax * Math.sin(t * b.speed + b.phase);
    const y = b.y + b.ay * Math.cos(t * b.speed * 0.83 + b.phase * 1.7);
    out[i * 3] = x * spread;
    out[i * 3 + 1] = y * spread;
    out[i * 3 + 2] = b.r;
  }
  return out;
}

export const VERTEX_SHADER = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

// Campo f = sum(r^2 / d^2); el borde está en f = 1. El color se mezcla con
// pesos (r^2/d^2)^3, que dan transiciones suaves donde dos manchas se funden.
// Para el relieve se usa la altura h = 1 - 1/f (cero en el borde, máxima en el
// centro), así que la superficie se ve como una gota: plana arriba e inclinada
// en los bordes, donde aparece el brillo.
export const FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

const int MAX_BLOBS = ${MAX_BLOBS};
uniform vec2 uRes;
uniform vec3 uBlob[MAX_BLOBS];
uniform vec3 uCol[MAX_BLOBS];
uniform int uCount;
uniform vec4 uBase;

void main() {
  float unit = 0.5 * min(uRes.x, uRes.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / unit;

  float f = 0.0;
  vec2 g = vec2(0.0);
  vec3 col = vec3(0.0);
  float wsum = 0.0;

  for (int i = 0; i < MAX_BLOBS; i++) {
    if (i >= uCount) break;
    vec2 d = p - uBlob[i].xy;
    float r2 = uBlob[i].z * uBlob[i].z;
    float d2 = dot(d, d) + 1e-4;
    float k = r2 / d2;
    f += k;
    g -= 2.0 * r2 * d / (d2 * d2);
    float w = k * k * k;
    col += uCol[i] * w;
    wsum += w;
  }
  col /= max(wsum, 1e-5);

  // Antialias de ~1.5 px usando el gradiente del campo.
  float px = 1.5 / unit;
  float alpha = clamp((f - 1.0) / max(length(g) * px, 1e-4) + 0.5, 0.0, 1.0);

  // Relieve y luz desde arriba a la izquierda.
  vec2 hg = g / max(f * f, 1e-3);
  vec3 n = normalize(vec3(-hg * 0.14, 1.0));
  vec3 L = normalize(vec3(-0.45, 0.55, 0.72));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
  float diff = 0.74 + 0.26 * max(dot(n, L), 0.0);
  float nh = max(dot(n, H), 0.0);
  float spec = pow(nh, 56.0) * 0.6 + pow(nh, 9.0) * 0.04;
  float rim = 1.0 - smoothstep(1.0, 1.7, f);
  vec3 lit = col * diff * (1.0 - 0.16 * rim) + vec3(spec);

  // Halo tenue fuera del borde: da luminosidad sin endurecer la silueta.
  float halo = 0.16 * smoothstep(0.42, 1.0, f) * (1.0 - alpha);

  vec3 rgb = lit * alpha + col * halo;
  float a = alpha + halo;
  rgb += uBase.rgb * uBase.a * (1.0 - a);
  a += uBase.a * (1.0 - a);
  gl_FragColor = vec4(rgb, a);
}
`;
