import * as game from 'game'
import * as u from 'utils'
import * as soundmanager from 'soundmanager'
import * as gfx from 'webgl'
import * as mat from 'matrices'
import * as vec2 from 'vector2'
import * as vec3 from 'vector3'
import Thing from 'thing'
import { assets } from 'game'

// Animation params
const MOVE_LINEAR_SPEED = 0.035
const GRAVITY = -0.01
const MOVE_FRICTION_TIME = 30
const MOVE_FRICTION_FRICTION = 0.0025
const SPIN_FRICTION = 0.02
const MOVE_SHRINK_RATE = 0.05
const LASER_THICKNESS = 0.04
const LASER_SHRINK_RATE = 0.002
const ROTATE_LINEAR_SPEED = 0.05
const SCROLL_TIME = 28

const COLOR_MAP = {
  'red': [0.5, 0.0, 0.0, 1],
  'green': [0.0, 0.6, 0.0, 1],
  'blue': [0.0, 0.0, 0.4, 1],
  'yellow': [0.9, 0.9, 0.0, 1],
  'cyan': [0.0, 0.5, 0.5, 1],
  'purple': [0.5, 0.0, 0.8, 1],
  'orange': [1.0, 0.5, 0.0, 1],
  'white': [1.0, 1.0, 1.0, 1],
}

export default class Element extends Thing {
  constructor (elementReference) {
    super()

    this.elementReference = elementReference

    this.endAnimation()
  }

  update () {
    super.update()

    this.time ++

    this.animate()
  }

  animate() {
    // Linear movement (such as from conveyor belts)
    if (this.anim.moveType === 'linear') {this.animateLinear()}
    else if (this.anim.moveType === 'friction') {this.animateFriction()}
    else if (this.anim.moveType === 'fall') {this.animateFall()}
    else if (this.anim.moveType === 'deliver') {this.animateDeliver()}
    else if (this.anim.moveType === 'shrink') {this.animateShrink()}
    else if (this.anim.moveType === 'rotate') {this.animateRotate()}

    // Fan spinning
    if (this.anim.spinSpeed > 0) {
      this.anim.spinSpeed *= 1.0-SPIN_FRICTION
      this.anim.spinAngle = (this.anim.spinAngle + this.anim.spinSpeed) % (Math.PI*2)
    }

    // Texture scrolling
    if (this.anim.scrollTime > 0) {
      this.anim.scrollTime -= 1
      this.anim.scrollPosition += MOVE_LINEAR_SPEED
    }

    // Laser beam
    if (this.anim.laserThickness > 0) {
      this.anim.laserThickness = Math.max(0, this.anim.laserThickness - LASER_SHRINK_RATE)
    }
  }

  startAnimateLinear(startPosition, targetPosition) {
    this.anim.moveType = 'linear'
    this.anim.position = [...startPosition]
    this.anim.targetPosition = [...targetPosition]
  }

  animateLinear() {
    // If this is already really close, end the animation
    const delta = vec3.subtract(this.anim.targetPosition, this.anim.position)
    if (vec3.magnitude(delta) <= MOVE_LINEAR_SPEED) {
      this.endAnimation()
    }
    // Otherwise, move toward it at a constant velocity
    else {
      const vel = vec3.scale(vec3.normalize(delta), MOVE_LINEAR_SPEED)
      this.anim.position = vec3.add(this.anim.position, vel)
    }
  }

  startAnimateFriction(startPosition, targetPosition) {
    this.anim.moveType = 'friction'
    this.anim.position = [...startPosition]
    this.anim.targetPosition = [...targetPosition]
  }

  animateFriction() {
    // Find distance between start and end
    const delta = vec3.subtract(this.anim.targetPosition, this.anim.position)

    // If velocity is at zero, we've just started. So set initial values.
    // Initial speed is calculated such that the animation will complete in MOVE_FRICTION_TIME frames
    if (this.anim.speed === 0) {
      this.anim.speed = (vec3.magnitude(delta) - (0.5 * (-MOVE_FRICTION_FRICTION) * Math.pow(MOVE_FRICTION_TIME, 2))) / MOVE_FRICTION_TIME
    }

    // If this is already really close, end the animation
    this.anim.moveFrictionTime ++
    if (this.anim.moveFrictionTime >= MOVE_FRICTION_TIME) {
      this.endAnimation()
    }
    // Otherwise, move toward it
    else {
      this.anim.speed -= MOVE_FRICTION_FRICTION
      const vel = vec3.scale(vec3.normalize(delta), this.anim.speed)
      this.anim.position = vec3.add(this.anim.position, vel)
    }
  }

  startAnimateFall(startPosition, targetPosition, isDelivered = false, isFailed = false) {
    this.anim.moveType = 'fall'
    this.anim.isDelivered = isDelivered
    this.anim.isFailed = isFailed
    this.anim.position = [...startPosition]
    this.anim.targetPosition = [...targetPosition]
  }

  animateFall() {
    // Accelerate and move
    this.anim.speed += GRAVITY
    this.anim.position[2] += this.anim.speed

    // Get smaller the closer we get to our target
    if (this.anim.isDelivered) {
      const dist = vec3.magnitude(vec3.subtract(this.anim.position, this.anim.targetPosition))
      this.anim.scale = u.map(dist, 0, 1.0, 0, 1.0, true)
    }

    // If we've hit the ground...
    if (this.anim.position[2] <= this.anim.targetPosition[2]) {
      // Play a sound effect
      if (!this.anim.isDelivered) {
        soundmanager.playSound("thump")
      }

      // End the animation
      this.endAnimation()
    }
  }

  startAnimateShrink(position) {
    this.anim.position = position
    this.anim.moveType = 'shrink'
  }

  animateShrink() {
    // Shrink
    this.anim.scale -= MOVE_SHRINK_RATE

    // If we've hit zero, end the animation
    if (this.anim.scale <= 0) {
      this.endAnimation()
    }
  }

  startAnimateRotate(position, rotation, targetRotation, shrinkHeight, shrinkWhenRotating) {
    this.anim.moveType = 'rotate'
    this.anim.position = position
    this.anim.targetPosition = position
    this.anim.rotation = rotation
    this.anim.targetRotation = targetRotation
    this.anim.shrinkHeight = shrinkHeight
    this.anim.shrinkWhenRotating = shrinkWhenRotating
  }

  animateRotate() {
    // If this is already really close, end the animation
    const dist = vec2.angleDistance(this.anim.rotation, this.anim.targetRotation)
    if (dist <= ROTATE_LINEAR_SPEED) {
      this.endAnimation()
    }
    // Otherwise, move toward it at a constant velocity
    else {
      this.anim.rotation = vec2.lerpAngles(this.anim.rotation, this.anim.targetRotation, ROTATE_LINEAR_SPEED/dist)

      // Object rotating
      // Scale element down so its rotation doesn't cause it to intersect with adjacent tiles
      const angleScale = Math.max(Math.abs(Math.cos(this.anim.rotation + Math.PI/4)), Math.abs(Math.sin(this.anim.rotation + Math.PI/4)))
      const scale = (1/angleScale) * 0.7071
      let heightAdjust = (2*this.anim.shrinkHeight)
      if (this.anim.shrinkWhenRotating) {
        this.anim.scale = scale
        heightAdjust ++
      }

      // Move the element downward to counteract rotateShrink shrinking
      this.anim.position = [...this.anim.targetPosition]
      this.anim.position[2] -= ((1-scale)/2) * heightAdjust
    }
  }

  startAnimateSpin(speed) {
    this.anim.spinSpeed = speed
  }

  startAnimateScroll() {
    this.anim.scrollTime = SCROLL_TIME
  }

  startAnimateLaser(laserLength) {
    this.anim.laserLength = laserLength
    this.anim.laserThickness = LASER_THICKNESS
  }

  // Reset animation data
  endAnimation() {
    this.anim = {
      position: undefined,
      targetPosition: [0, 0, 0],
      speed: 0,
      moveType: 'none',
      scale: 1.0,
      scrollTime: 0,
      moveFrictionTime: 0,
      rotation: undefined,
      targetRotation: 0,
      isDelivered: false,
      shrinkHeight: 0,
      shrinkWhenRotating: false,
    }
    this.anim.spinAngle = this.anim.spinAngle || 0
    this.anim.spinSpeed = this.anim.spinSpeed || 0
    this.anim.scrollPosition = this.anim.scrollPosition || 0
    this.anim.laserThickness = this.anim.laserThickness || 0
    this.anim.laserLength = this.anim.laserLength || 0
  }

  // Draws one game element
  draw () {
    // Don't render if destroyed
    if (this.elementReference.destroyed && this.anim.moveType === 'none') {
      return
    }

    // Mesh
    let rMesh = assets.meshes[this.elementReference.type] || assets.meshes.cube

    // Texture
    let rTexture = assets.textures['uv_' + this.elementReference.type] || assets.textures.square
    if (this.elementReference.type === 'crate' || this.elementReference.type === 'chute') {
      rTexture = assets.textures['uv_' + this.elementReference.type + "_" + (this.elementReference.letter)]
    }

    // Position
    let rPos = this.elementReference.position
    if (this.anim.position) {
      rPos = this.anim.position
    }

    // Rotation
    let angle = vec2.vectorToAngle(vec2.directionToVector(this.elementReference.direction))
    if (this.anim.rotation !== undefined) {
      angle = this.anim.rotation
    }
    let rRot = [Math.PI/2, 0, angle - Math.PI/2]

    // Scale
    let rScale = [this.anim.scale, this.anim.scale, this.anim.scale]
    if (this.elementReference.type === 'rotator' && this.elementReference.rotateDirection === 'ccw') {
      rScale[0] *= -1
    }

    // Color
    let rColor = COLOR_MAP[this.elementReference.color] || [1, 1, 1, 1]
    let rColorBase = [...rColor]
    if (this.elementReference.type === 'fan' || this.elementReference.type === 'rotator') {
      rColorBase = [0.4, 0.4, 0.4, 1]
    }

    // Draw the base model
    this.drawMesh({
      mesh: rMesh,
      texture: rTexture,
      position: rPos,
      rotation: rRot,
      scale: rScale,
      color: rColorBase,
    })

    // If this is a conveyor, render the belt as well
    if (this.elementReference.type === 'conveyor') {
      const scroll = -this.anim.scrollPosition

      this.drawMesh({
        mesh: assets.meshes.conveyorBelt,
        texture: assets.textures.uv_conveyorBelt,
        position: rPos,
        rotation: rRot,
        scale: rScale,
        color: [1, 1, 1, 1],
        scroll: scroll,
      })
    }

    // If this is a fan, render the blade as well
    if (this.elementReference.type === 'fan') {
      let offset = vec2.rotate([0, -0.1], rRot[2] + Math.PI)
      offset.push(0.1)
      const spin = this.anim.spinAngle

      this.drawMesh({
        mesh: assets.meshes.fanBlade,
        texture: assets.textures.square,
        position: vec3.add(rPos, offset),
        rotation: vec3.add(rRot, [0, spin, Math.PI]),
        scale: rScale,
        color: rColor,
      })
    }

    // If this is a rotator, render the arrows as well
    if (this.elementReference.type === 'rotator') {
      this.drawMesh({
        mesh: assets.meshes.rotatorArrows,
        texture: assets.textures.square,
        position: rPos,
        rotation: rRot,
        scale: rScale,
        color: rColor,
      })
    }

    // If this is a laser, render the beam as well
    if (this.elementReference.type === 'laser' && this.anim.laserThickness > 0) {
      let offset = vec2.rotate([0, this.anim.laserLength/2], rRot[2])
      offset.push(0)

      this.drawMesh({
        mesh: assets.meshes.cube,
        texture: assets.textures.square,
        position: vec3.add(rPos, offset),
        rotation: vec3.add(rRot, [0, 0, Math.PI/2]),
        scale: [this.anim.laserLength, this.anim.laserThickness, this.anim.laserThickness],
        color: rColor,
      })
    }

    // Built-in scaffolding
    if (this.elementReference.scaffold) {
      const rfTexture = assets.textures["uv_" + this.elementReference.type + "Scaffold"] || assets.textures.uv_scaffold
      const rfMesh = assets.meshes[this.elementReference.type + "Scaffold"] || assets.meshes.scaffold

      this.drawMesh({
        mesh: rfMesh,
        texture: rfTexture,
        position: rPos,
        rotation: rRot,
        scale: rScale,
        color: [1, 1, 1, 1],
      })
    }
  }

  drawMesh ({mesh, texture, position, rotation, scale, color, scroll=0}={}) {
    gfx.setShader(assets.shaders.shaded)
    game.getCamera3D().setUniforms()
    gfx.set('color', color)
    gfx.set('scroll', scroll)
    gfx.setTexture(texture)
    gfx.set('modelMatrix', mat.getTransformation({
      position: position,
      rotation: rotation,
      scale: scale
    }))
    gfx.drawMesh(mesh)
  }
}

