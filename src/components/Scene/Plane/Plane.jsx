import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, ShaderMaterial, Mesh } from 'three'
import { useMemo, useRef, useEffect, useCallback, useState } from 'react'
import TouchTexture from './TouchTexture'
import { forwardRef } from 'react'

const HEIGHT = 7
const ASPECT_RATIO = 1
const WIDTH = HEIGHT * ASPECT_RATIO

const Plane = forwardRef((props, ref) => {
  const mesh = useRef(null)
  const shader = useRef(null)
  const offset = useRef(Math.random() * 10000)

  useEffect(() => {
    if (ref) {
      ref.current = mesh.current
    }
  }, [ref])

  const touchTexture = useMemo(
    () =>
      new TouchTexture({
        debugCanvas: false,
        size: 800
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
    touchTexture.update()
    if (shader.current) {
      shader.current.uniforms.uTime.value += delta
    }
  })

  const handlePointerMove = e => {
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
      position={[0, 0, -8]}

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
        // fragmentShader={`
        //   precision highp float;

        //   varying vec2 vUv;
        //   uniform float uTime;
        //   uniform sampler2D uTouch;

        //   // === Цвета ===
        //   vec3 colors[7] = vec3[](
        //     vec3(0.874, 0.965, 0.012), // салатовый
        //     vec3(0.047, 0.914, 0.608), // бирюза
        //     vec3(0.537, 0.941, 0.945), // голубой
        //     vec3(0.571, 0.488, 0.965), // лавандовый
        //     vec3(0.980, 0.251, 0.286), // коралловый
        //     vec3(1.000, 1.000, 0.000), // жёлтый
        //     vec3(0.973, 1.000, 0.004)  // лимонный
        //   );

        //   // Веса (сумма = 1.0)
        //   float weights[7] = float[](
        //     0.20, // салат → бирюза
        //     0.20, // бирюза → голубой
        //     0.20, // голубой → лавандовый
        //     0.20, // лавандовый → коралловый
        //     0.07, // коралловый → жёлтый
        //     0.07, // жёлтый → лимонный
        //     0.06  // лимонный → салат
        //   );

        //   // === Быстрый шум-хеш ===
        //   float hash(vec2 p) {
        //     return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        //   }

        //   float noise(vec2 p) {
        //     vec2 i = floor(p);
        //     vec2 f = fract(p);
        //     float a = hash(i);
        //     float b = hash(i + vec2(1.0, 0.0));
        //     float c = hash(i + vec2(0.0, 1.0));
        //     float d = hash(i + vec2(1.0, 1.0));
        //     vec2 u = f * f * (3.0 - 2.0 * f);
        //     return mix(a, b, u.x) +
        //           (c - a) * u.y * (1.0 - u.x) +
        //           (d - b) * u.x * u.y;
        //   }

        //   // Функция для создания расползающегося эффекта
        //   vec4 getSpreadingTouch(vec2 uv, float timeOffset) {
        //     vec2 displacedUV = uv;

        //     // spreadTime теперь не зацикливаем
        //     float spreadTime = uTime - timeOffset;

        //     // Экспоненциальное затухание (оставляем)
        //     float fade = exp(-spreadTime * 0.1);

        //     // --- старый код ---
        //     // float spreadAmount = spreadTime * 0.1;
        //     // --- новый код ---
        //     // Накапливаем искажения, но ограничиваем сверху
        //     float spreadAmount = min(spreadTime * 1.05, 1.6); 
        //     // ↑ чем больше коэффициент (0.05), тем быстрее растёт искажение
        //     // ↑ чем больше порог (3.6), тем сильнее максимум искажений

        //     // Создаем смещение для расползания
        //     vec2 spreadDir = vec2(
        //       noise(uv * 10.0 + spreadTime * 0.2) - 0.5,
        //       noise(uv * 10.0 + spreadTime * 0.3 + 100.0) - 0.5
        //     ) * 0.02;

        //     displacedUV += spreadDir * spreadAmount;

        //     // Получаем исходное значение касания с небольшим размытием
        //     float touch = 0.0;
        //     for (int i = -1; i <= 1; i++) {
        //       for (int j = -1; j <= 1; j++) {
        //         vec2 offset = vec2(float(i), float(j)) * 0.002 * (1.0 + spreadAmount);
        //         touch += texture2D(uTouch, displacedUV + offset).r;
        //       }
        //     }
        //     touch /= 9.0;

        //     return vec4(touch, spreadTime, fade, 0.0);
        //   }


        //   void main() {
        //     // === Фон ===
        //     vec3 grayBase = vec3(0.85, 0.88, 0.92);
        //     vec3 grayLight = vec3(0.92, 0.94, 0.96);
        //     vec3 grayDark = vec3(0.75, 0.78, 0.82);

        //     float wave1 = sin(vUv.x * 4.0 + uTime * 0.4) * 0.5 + 0.5;
        //     float wave2 = cos(vUv.y * 3.0 + uTime * 0.3) * 0.5 + 0.5;
        //     float t = sin(uTime * 0.2) * 0.5 + 0.5;

        //     vec3 background = mix(grayBase, grayLight, wave1 * 0.3);
        //     background = mix(background, grayDark, wave2 * 0.1);
        //     background = mix(background, grayBase, t);

        //     // === Получаем несколько слоев расползающихся штрихов ===
        //     vec4 touchCurrent = getSpreadingTouch(vUv, 0.0);
        //     vec4 touchOld1 = getSpreadingTouch(vUv, 2.0);
        //     vec4 touchOld2 = getSpreadingTouch(vUv, 4.0);

        //     float totalTouch = max(touchCurrent.x, max(touchOld1.x, touchOld2.x));

        //     // === Цветовой цикл ===
        //     float cycle = mod(uTime * 0.05, 1.0);
        //     float acc = 0.0;
        //     int idx = 0;

        //     for (int i = 0; i < 7; i++) {
        //       acc += weights[i];
        //       if (cycle <= acc) {
        //         idx = i;
        //         break;
        //       }
        //     }

        //     int nextIdx = (idx + 1) % 7;

        //     float prevAcc = acc - weights[idx];
        //     float localT = (cycle - prevAcc) / weights[idx];
        //     float n = noise(vUv * 6.0 + uTime * 0.05);
        //     localT = clamp(localT + (n - 0.5) * 0.1, 0.0, 1.0);

        //     vec3 activeColor = mix(colors[idx], colors[nextIdx], localT);

        //     float centerIntensity = smoothstep(0.0, 0.2, touchCurrent.x);
        //     float edgeIntensity = smoothstep(0.0, 0.5, touchCurrent.x);

        //     vec3 centerColor = activeColor * (1.0 + centerIntensity * 0.3);

        //     vec3 oldColor1 = mix(background, activeColor, touchOld1.x * touchOld1.z * 0.5);
        //     vec3 oldColor2 = mix(background, activeColor, touchOld2.x * touchOld2.z * 0.3);

        //     vec3 finalColor = background;
        //     finalColor = mix(finalColor, oldColor2, touchOld2.x);
        //     finalColor = mix(finalColor, oldColor1, touchOld1.x);
        //     finalColor = mix(finalColor, centerColor, edgeIntensity);

        //     float glow = smoothstep(0.1, 0.3, touchCurrent.x) * 0.3;
        //     finalColor += activeColor * glow;

        //     gl_FragColor = vec4(finalColor, 1.0);
        //   }


        // `}


        fragmentShader={`
          precision highp float;

          varying vec2 vUv;
          uniform float uTime;
          uniform sampler2D uTouch;

          // === Цвета ===
          vec3 colors[7] = vec3[](
            vec3(0.874, 0.965, 0.012),
            vec3(0.047, 0.914, 0.608),
            vec3(0.537, 0.941, 0.945),
            vec3(0.571, 0.488, 0.965),
            vec3(0.980, 0.251, 0.286),
            vec3(1.000, 1.000, 0.000),
            vec3(0.973, 1.000, 0.004)
          );

          float weights[7] = float[](
            0.20, 0.20, 0.20, 0.20, 0.07, 0.07, 0.06
          );

          // Функция расползания касания
          vec4 getSpreadingTouch(vec2 uv, float timeOffset) {
              vec2 displacedUV = uv;
              float spreadTime = uTime - timeOffset;
              float fade = exp(-spreadTime * 0.1);
              float spreadAmount = min(spreadTime * 1.05, 1.6);

              // Простое смещение без шума
              displacedUV += vec2(0.01, -0.01) * spreadAmount;

              // Семплирование крестом (5 точек)
              float touch = 0.0;
              touch += texture2D(uTouch, displacedUV).r;
              touch += texture2D(uTouch, displacedUV + vec2(0.002, 0.0)).r;
              touch += texture2D(uTouch, displacedUV + vec2(-0.002, 0.0)).r;
              touch += texture2D(uTouch, displacedUV + vec2(0.0, 0.002)).r;
              touch += texture2D(uTouch, displacedUV + vec2(0.0, -0.002)).r;
              touch /= 5.0;

              return vec4(touch, spreadTime, fade, 0.0);
          }

          void main() {
              // === Фон упрощённый ===
              vec3 grayBase = vec3(0.85, 0.88, 0.92);
              vec3 grayLight = vec3(0.92, 0.94, 0.96);

              float wave = sin(vUv.x * 4.0 + uTime * 0.4) * 0.5 + 0.5;
              vec3 background = mix(grayBase, grayLight, wave * 0.3);

              // === Расползающееся касание ===
              vec4 touchCurrent = getSpreadingTouch(vUv, 0.0);
              vec4 touchOld1 = getSpreadingTouch(vUv, 2.0);

              float totalTouch = max(touchCurrent.x, touchOld1.x);

              // === Цветовой цикл ===
              float cycle = mod(uTime * 0.05, 1.0);
              float acc = 0.0;
              int idx = 0;
              for (int i = 0; i < 7; i++) {
                  acc += weights[i];
                  if (cycle <= acc) {
                      idx = i;
                      break;
                  }
              }

              int nextIdx = (idx + 1) % 7;
              float prevAcc = acc - weights[idx];
              float localT = (cycle - prevAcc) / weights[idx];
              localT = clamp(localT, 0.0, 1.0);

              vec3 activeColor = mix(colors[idx], colors[nextIdx], localT);

              float centerIntensity = smoothstep(0.0, 0.2, touchCurrent.x);
              float edgeIntensity = smoothstep(0.0, 0.5, touchCurrent.x);

              vec3 centerColor = activeColor * (1.0 + centerIntensity * 0.3);

              vec3 oldColor1 = mix(background, activeColor, touchOld1.x * touchOld1.z * 0.5);

              vec3 finalColor = background;
              finalColor = mix(finalColor, oldColor1, touchOld1.x);
              finalColor = mix(finalColor, centerColor, edgeIntensity);

              float glow = smoothstep(0.1, 0.3, touchCurrent.x) * 0.3;
              finalColor += activeColor * glow;

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
