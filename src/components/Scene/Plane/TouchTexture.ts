import { Texture } from 'three'

interface Point {
  x: number
  y: number
  age: number
  force: number
}

interface TouchTextureOptions {
  size: number
  radius: number
  maxAge: number
  debugCanvas?: boolean
}

// Pure function
const outSine = (n: number) => Math.sin((n * Math.PI) / 2)

// Pure function for calculating force between points
const calculateForce = (
  last: Point | null,
  newPoint: { x: number; y: number }
) => {
  if (!last) return 0
  const dx = last.x - newPoint.x
  const dy = last.y - newPoint.y
  const dd = dx * dx + dy * dy
  return Math.min(dd * 10000, 1)
}

// Pure function for calculating intensity
const calculateIntensity = (age: number, maxAge: number) => {
  if (age < maxAge * 0.3) {
    return outSine(age / (maxAge * 0.3))
  }
  return outSine(1 - (age - maxAge * 0.3) / (maxAge * 0.7))
}

export default class TouchTexture {
  options: TouchTextureOptions
  texture: Texture | null
  ctx: CanvasRenderingContext2D | null
  trail: Point[]

  constructor({ size = 128, radius = 0.2, maxAge = 120, debugCanvas = false }) {
    this.options = {
      size,
      radius,
      maxAge,
      debugCanvas
    }

    this.ctx = null
    this.texture = null
    this.trail = []

    this.initCanvas()
  }

  private initCanvas() {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = this.options.size
    this.ctx = canvas.getContext('2d')

    const initContext = (ctx: CanvasRenderingContext2D) => {
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    if (this.ctx) initContext(this.ctx)

    this.texture = new Texture(canvas)
    this.texture.needsUpdate = true

    Object.assign(canvas.style, {
      position: 'fixed',
      bottom: '0',
      zIndex: '10000'
    })
    canvas.id = 'touchTexture'

    if (this.options.debugCanvas) document.body.appendChild(canvas)
  }

  addPoint(pointPos: { x: number; y: number }) {
    const last = this.trail.length ? this.trail[this.trail.length - 1] : null
    const force = calculateForce(last, pointPos)
    this.trail.push({ ...pointPos, age: 0, force })
  }

  private drawPoint(point: Point) {
    if (!this.ctx) return

    const pos = {
      x: point.x * this.options.size,
      y: (1 - point.y) * this.options.size
    }

    const intensity =
      calculateIntensity(point.age, this.options.maxAge) * point.force
    const radius = this.options.size * this.options.radius * intensity

    const grd = this.ctx.createRadialGradient(
      pos.x,
      pos.y,
      radius * 0.25,
      pos.x,
      pos.y,
      radius
    )

    grd.addColorStop(0, `rgb(217, 223, 233)`)
    grd.addColorStop(1, 'rgba(0, 0, 0, 0.0)')

    this.ctx.beginPath()
    this.ctx.fillStyle = grd
    this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2)
    this.ctx.fill()
  }

  update() {
    this.clear()

    // Age points and filter out old ones
    this.trail = this.trail
      .map(point => ({ ...point, age: point.age + 1 }))
      .filter(point => point.age <= this.options.maxAge)

    this.trail.forEach(point => this.drawPoint(point))

    if (this.texture) {
      this.texture.needsUpdate = true
    }
  }

  clear() {
    if (this.ctx) {
      this.ctx.fillStyle = 'black'
      this.ctx.fillRect(0, 0, this.options.size, this.options.size)
    }
  }
}
