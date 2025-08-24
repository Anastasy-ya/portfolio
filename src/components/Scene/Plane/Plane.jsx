// import "./styles.css";

import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, ShaderMaterial, Mesh } from 'three'
import { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import TouchTexture from './TouchTexture'
import { forwardRef } from 'react'

const HEIGHT = 5
const ASPECT_RATIO = 1
const WIDTH = HEIGHT * ASPECT_RATIO

const Plane = forwardRef((props, ref) => {
  const mesh = useRef(null)
  const shader = useRef(null)
  const offset = useRef(Math.random() * 10000)

  /////
  useEffect(() => {
    if (ref) {
      ref.current = mesh.current
    }
  }, [ref])
  /////

  const touchTexture = useMemo(
    () =>
      new TouchTexture({
        debugCanvas: false,
        size: 128
      }),
    []
  )

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uTouch: { value: touchTexture.texture }
      // uTexture: { value: texture },
    }),
    []
  )

  useFrame((state, delta) => {
    // Add animations or updates here if needed
    touchTexture.update()

    // if (mesh.current) {
    //   const t = state.clock.getElapsedTime();
    //   mesh.current.rotation.x = Math.cos(t) * 0.1;
    //   mesh.current.rotation.y = Math.cos(t) * 0.1;
    // }

    // sending the time to the uniforms/ shader
    if (shader.current) {
      shader.current.uniforms.uTime.value += delta
    }
  })

  const handlePointerMove = e => {
    // console.log(e, 'e')
    // We normalize the mouse coordinates from pixel values
    //to a 0-1 range so they can be used properly in our shader.
    const normalizedY = e.point.y / HEIGHT + 0.5
    const normalizedX = e.point.x / WIDTH + 0.5
    touchTexture.addPoint({ x: normalizedX, y: normalizedY })
  }

  /////

  //   const WIDTH = 6;
  // const HEIGHT = 6;
  // const [touchPath, setTouchPath] = useState<{ x: number; y: number }[]>([]);

  //   // Реф для хранения текущего пути (без ререндера)
  //   const pathRef = useRef<{ x: number; y: number }[]>([]);

  //   // Таймер для long press
  //   const longPressTimer = useRef<number | null>(null);

  //   // Флаги
  //   const isLongPress = useRef(false);
  //   const isTracking = useRef(false);

  //   // Нормализация точки в UV-координаты (0..1)
  //   const normalizePoint = useCallback(
  //     (point: { x: number; y: number }) => {
  //       return {
  //         x: point.x / WIDTH + 0.5,
  //         y: point.y / HEIGHT + 0.5,
  //       };
  //     },
  //     [WIDTH, HEIGHT]
  //   );

  //   // Обработчик начала касания
  //   const beginSliding = useCallback(
  //     (e: ThreeEvent<PointerEvent>) => {
  //       e.stopPropagation();
  //       const event = e.nativeEvent as PointerEvent;
  //       const target = event.target as Element;

  //       // Сбрасываем путь
  //       pathRef.current = [];
  //       isLongPress.current = false;
  //       isTracking.current = false;

  //       // Устанавливаем таймер для long press (например, 500 мс)
  //       longPressTimer.current = window.setTimeout(() => {
  //         isLongPress.current = true;
  //         isTracking.current = true;
  //         console.log('Long press detected, started tracking path');
  //       }, 500);

  //       // Обработчик движения
  //       const handlePointerMove = (moveEvent: PointerEvent) => {
  //         if (isTracking.current) {
  //           // e.point — это уже нормализовано в ThreeEvent?
  //           // В Three.js `e.point` — это 3D-координата, но ты используешь 2D
  //           // Поэтому, возможно, тебе нужно взять `.offsetX`, `.offsetY`
  //           // Или использовать `raycaster` — но упростим для примера
  //           const x = moveEvent.offsetX ?? 0;
  //           const y = moveEvent.offsetY ?? 0;

  //           const point = { x, y };
  //           const normalized = normalizePoint(point);
  //           pathRef.current.push(normalized);
  //           setTouchPath([...pathRef.current]); // триггерим ререндер
  //         }
  //       };

  //       // Назначаем обработчик
  //       target.addEventListener('pointermove', handlePointerMove as EventListener);

  //       // Сохраняем ссылку на обработчик, чтобы можно было удалить
  //       (target as any).__handlePointerMove__ = handlePointerMove;

  //       // Захватываем указатель
  //       target.setPointerCapture(event.pointerId);
  //     },
  //     [normalizePoint]
  //   );

  //   // Обработчик окончания касания
  //   const stopSliding = useCallback((e: ThreeEvent<PointerEvent>) => {
  //     const event = e.nativeEvent as PointerEvent;
  //     const target = event.target as Element;

  //     // Очищаем таймер
  //     if (longPressTimer.current !== null) {
  //       window.clearTimeout(longPressTimer.current);
  //       longPressTimer.current = null;
  //     }

  //     // Проверяем, был ли long press
  //     if (isTracking.current) {
  //       isTracking.current = false;
  //       console.log('Long press ended, full path:', pathRef.current);
  //       // Можно отправить путь куда-то
  //     } else {
  //       console.log('Short tap (ignored)');
  //     }

  //     // Удаляем обработчик движения
  //     const handlePointerMove = (target as any).__handlePointerMove__;
  //     if (handlePointerMove) {
  //       target.removeEventListener('pointermove', handlePointerMove);
  //       delete (target as any).__handlePointerMove__;
  //     }

  //     if (target.hasPointerCapture && target.hasPointerCapture(event.pointerId)) {
  //       target.releasePointerCapture(event.pointerId);
  //     }
  //   }, []);
  /////

  return (
    <mesh
      ref={mesh}
      onPointerMove={handlePointerMove}
      // rotation={[ Math.PI/2, Math.PI/2, Math.PI/2]}
      position={[0, 0, -5]}

      // onPointerDown={beginSliding}
      // onPointerUp={stopSliding}
      // onPointerLeave={stopSliding}
    >
      <planeGeometry args={[WIDTH, HEIGHT, 64, 64]} />
      <shaderMaterial
        ref={shader}
        uniforms={uniforms}
        // wireframe={true} сетка вытянута вертикально
        vertexShader={`
    varying vec2 vUv;
    varying vec3 vPositionEye;
    varying vec3 vNormalEye;

    void main() {
      vec4 vertexPositionEye = viewMatrix * modelMatrix * vec4(position, 1.0);

      vPositionEye = (modelMatrix * vec4(position, 1.0)).xyz;
      vNormalEye = normal;

      vUv = uv;

      gl_Position = projectionMatrix * vertexPositionEye;
    }
  `}
        fragmentShader={`
precision highp float;

varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTouch;

// === Цвета ===
vec3 colors[7] = vec3[](
  vec3(0.874, 0.965, 0.012), // салатовый
  vec3(0.047, 0.914, 0.608), // бирюза
  vec3(0.537, 0.941, 0.945), // голубой
  vec3(0.571, 0.488, 0.965), // лавандовый
  vec3(0.980, 0.251, 0.286), // коралловый (быстрый участок)
  vec3(1.000, 1.000, 0.000), // жёлтый (быстрый участок)
  vec3(0.973, 1.000, 0.004)  // лимонный (быстрый участок)
);

// Веса (сумма = 1.0): длинные на холодных, короткие на тёплых
float weights[7] = float[](
  0.20, // салат → бирюза
  0.20, // бирюза → голубой
  0.20, // голубой → лавандовый
  0.20, // лавандовый → коралловый
  0.07, // коралловый → жёлтый
  0.07, // жёлтый → лимонный
  0.06  // лимонный → салат (замыкание)
);

// === Быстрый шум-хеш ===
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  // === Фон ===
  vec3 grayBase = vec3(0.85, 0.88, 0.92);
  vec3 grayLight = vec3(0.92, 0.94, 0.96);
  vec3 grayDark = vec3(0.75, 0.78, 0.82);

  float wave1 = sin(vUv.x * 4.0 + uTime * 0.4) * 0.5 + 0.5;
  float wave2 = cos(vUv.y * 3.0 + uTime * 0.3) * 0.5 + 0.5;
  float t = sin(uTime * 0.2) * 0.5 + 0.5;

  vec3 background = mix(grayBase, grayLight, wave1 * 0.3);
  background = mix(background, grayDark, wave2 * 0.1);
  background = mix(background, grayBase, t);

  // === Сила касания ===
  float touch = texture2D(uTouch, vUv).r;

  // === Цветовой цикл (замедлен ×1.5) ===
  float cycle = mod(uTime * (0.05 / 1.5), 1.0);

  // Находим текущий отрезок по весам
  float acc = 0.0;
  int idx = 0;
  for (int i = 0; i < 7; i++) {
    acc += weights[i];
    if (cycle <= acc) {
      idx = i;
      break;
    }
  }

  float prevAcc = acc - weights[idx];
  float localT = (cycle - prevAcc) / weights[idx];

  // === Добавляем мягкий шум к переходу ===
  float n = noise(vUv * 6.0 + uTime * 0.05);
  localT = clamp(localT + (n - 0.5) * 0.1, 0.0, 1.0);

  int idx1 = idx;
  int idx2 = (idx + 1) % 7;
  vec3 activeColor = mix(colors[idx1], colors[idx2], localT);

  // === Пятно цвета ===
  vec3 pulseColor = mix(grayBase, activeColor, smoothstep(0.0, 0.3, touch));
  pulseColor = mix(pulseColor, activeColor, touch * 0.7);
  pulseColor *= 1.5;

  // === Итог ===
  vec3 finalColor = mix(background, pulseColor, touch);

  gl_FragColor = vec4(finalColor, 1.0);
}


`}
      />
    </mesh>
  )
})

export default Plane

////////////////////////////////////////////////////////////////////////////////////////

// 223 246 3 салатовый ближе  желтому
// 148 235 1 салатовый
// 12 233 155 бирюза
// 137 240 242 голубой
// 146 125 246 лавандовый
// 250 64 73 коралловый
// 255 83 35 кирпичный оранжевый
// 248 255 1 лимонный
// и по кругу с начала списка

// 220 220 220 благородный серый
// с переливами светлого 235 255 254
