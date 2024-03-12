import * as u from 'utils'
import * as soundmanager from 'soundmanager'
import * as render from './renderer.js'
import * as vec2 from 'vector2'
import * as vec3 from 'vector3'
import * as game from 'game'
import Thing from 'thing'
import { assets } from 'game'
import PaintParticle from './particlepaint.js'

// Animation params
const MOVE_LINEAR_SPEED = 0.035
const GRAVITY = -0.01
const MOVE_FRICTION_TIME = 30
const MOVE_FRICTION_FRICTION = 0.0025
const SPIN_SPEED = 0.3
const SPIN_FRICTION = 0.02
const MOVE_SHRINK_RATE = 0.05
const LASER_THICKNESS = 0.04
const LASER_SHRINK_RATE = 0.002
const ROTATE_LINEAR_SPEED = 0.05
const SCROLL_TIME = 28

export const COLOR_MAP = {
  'red': [0.5, 0.0, 0.0, 1],
  'green': [0.0, 0.6, 0.0, 1],
  'blue': [0.0, 0.0, 0.4, 1],
  'yellow': [0.9, 0.9, 0.0, 1],
  'cyan': [0.0, 0.5, 0.5, 1],
  'purple': [0.6, 0.0, 0.8, 1],
  'orange': [1.0, 0.5, 0.0, 1],
  'white': [1.0, 1.0, 1.0, 1],
  'black': [0.15, 0.15, 0.15, 1],
  'grey': [0.6, 0.6, 0.6, 1],
  'brown': [0.6, 0.4, 0.1, 1],
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

  startAnimateFall(startPosition, targetPosition, isDestroyed = false, isFallen = false) {
    this.anim.moveType = 'fall'
    this.anim.isDestroyed = isDestroyed
    this.anim.isFallen = isFallen
    this.anim.position = [...startPosition]
    this.anim.targetPosition = [...targetPosition]
  }

  animateFall() {
    // Accelerate and move
    this.anim.speed += GRAVITY
    this.anim.position[2] += this.anim.speed

    // Get smaller the closer we get to our target
    if (this.anim.isDestroyed) {
      const dist = vec3.magnitude(vec3.subtract(this.anim.position, this.anim.targetPosition))
      this.anim.scale = u.map(dist, 0, 1.0, 0, 1.0, true)
    }

    // If we've hit the ground...
    if (this.anim.position[2] <= this.anim.targetPosition[2]) {
      // Play a sound effect
      if (this.anim.isFallen) {
        soundmanager.playSound("fall")
      }
      else if (!this.anim.isDestroyed) {
        soundmanager.playSound("thump")
      }

      // End the animation
      this.endAnimation()
    }
  }

  startAnimateChangeColor(color) {
    this.anim.color = color
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

  startAnimateSpin() {
    this.anim.spinSpeed = SPIN_SPEED
  }

  startAnimateScroll() {
    this.anim.scrollTime = SCROLL_TIME
  }

  startAnimateLaser(laserLength) {
    this.anim.laserLength = laserLength
    this.anim.laserThickness = LASER_THICKNESS
    this.anim.laserPosition = [...this.elementReference.position]
    this.anim.laserDirection = this.elementReference.direction
  }

  linkAnimation(element, action) {
    this.anim.linkedAnimations.push({
      element: element,
      action: action,
    })
  }

  executeLinkedAction(action) {
    if (action === 'paintSplash') {
      // End color change anim
      this.endAnimation()

      // Particle effect
      for (let i = 0; i < 20; i ++) {
        game.addThing(new PaintParticle(this.elementReference.position, this.elementReference.color))
      }

      // Sound effect
      soundmanager.playSound("change")
    }
  }

  // Reset animation data
  endAnimation() {
    // Cancel animations for linked things
    if (this.anim?.linkedAnimations) {
      const linkedAnimations = this.anim.linkedAnimations
      this.anim.linkedAnimations = []
      for (const linkedAnimation of linkedAnimations) {
        const thing = game.getThings().filter(x => x.elementReference === linkedAnimation.element)?.[0]
        if (thing) {
          thing.executeLinkedAction(linkedAnimation.action)
        }
      }
    }

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
      spinAngle: this.anim?.spinAngle || 0,
      spinSpeed: this.anim?.spinSpeed || 0,
      scrollPosition: this.anim?.scrollPosition || 0,
      laserThickness: this.anim?.laserThickness || 0,
      laserLength: this.anim?.laserLength || 0,
      laserPosition: this.anim?.laserPosition || [0, 0, 0],
      laserDirection: this.anim?.laserDirection || 'south',
      isDestroyed: false,
      isFallen: false,
      color: undefined,
      paintedObject: null,
      linkedAnimations: []
    }
  }

  // Draws one game element
  draw () {
    let board = game.getThing('board')

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
    let rRot = [0, 0, angle - Math.PI/2]

    // Scale
    let rScale = [this.anim.scale, this.anim.scale, this.anim.scale]
    if (this.elementReference.type === 'rotator' && this.elementReference.rotateDirection === 'ccw') {
      rScale[0] *= -1
    }

    // Color
    let colorType = this.elementReference.color
    if (this.anim.color) {
      colorType = this.anim.color
    }
    let rColor = COLOR_MAP[colorType] || [1, 1, 1, 1]
    let rColorBase = [...rColor]
    if (this.elementReference.type === 'fan' || this.elementReference.type === 'rotator') {
      rColorBase = [0.4, 0.4, 0.4, 1]
    }

    // Glow
    let rGlow = 0.0
    if (board.selectedColor !== '' && board.selectedColor === colorType) {
      if (['conveyor', 'fan', 'laser', 'rotator'].includes(this.elementReference.type)) {
        rGlow = u.map(Math.sin(board.time / 20), -1, 1, 0.2, 0.4)
      }
    }

    // Draw the base model
    render.drawMesh({
      mesh: rMesh,
      texture: rTexture,
      position: rPos,
      rotation: rRot,
      scale: rScale,
      color: rColorBase,
      glow: rGlow,
    })

    // If this is a conveyor, render the belt as well
    if (this.elementReference.type === 'conveyor') {
      const scroll = -this.anim.scrollPosition

      render.drawMesh({
        mesh: assets.meshes.conveyorBelt,
        texture: assets.textures.uv_conveyorBelt,
        position: rPos,
        rotation: rRot,
        scale: rScale,
        color: [1, 1, 1, 1],
        scroll: scroll,
        glow: rGlow,
      })
    }

    // If this is a fan, render the blade as well
    if (this.elementReference.type === 'fan') {
      let offset = [...vec2.rotate([0, -0.1], rRot[2] + Math.PI), 0.1]
      const spin = this.anim.spinAngle

      render.drawMesh({
        mesh: assets.meshes.fanBlade,
        texture: assets.textures.square,
        position: vec3.add(rPos, offset),
        rotation: vec3.add(rRot, [0, spin, Math.PI]),
        scale: rScale,
        color: rColor,
        glow: rGlow,
      })
    }

    // If this is a rotator, render the arrows as well
    if (this.elementReference.type === 'rotator') {
      render.drawMesh({
        mesh: assets.meshes.rotatorArrows,
        texture: assets.textures.square,
        position: rPos,
        rotation: rRot,
        scale: rScale,
        color: rColor,
        glow: rGlow,
      })
    }

    // If this is a laser, render the beam as well
    if (this.elementReference.type === 'laser' && this.anim.laserThickness > 0) {
      let lrAngle = vec2.vectorToAngle(vec2.directionToVector(this.anim.laserDirection))
      let offset = [...vec2.rotate([0, this.anim.laserLength/2], lrAngle - Math.PI/2), 0]
      let lrPos = vec3.add(this.anim.laserPosition, offset)

      let beamColor = [
        1.0 - ((1.0 - rColor[0]) * 0.8),
        1.0 - ((1.0 - rColor[1]) * 0.8),
        1.0 - ((1.0 - rColor[2]) * 0.8),
        rColor[3],
      ]

      render.drawMesh({
        mesh: assets.meshes.cube,
        texture: assets.textures.square,
        position: lrPos,
        rotation: [0, 0, lrAngle],
        scale: [this.anim.laserLength, this.anim.laserThickness, this.anim.laserThickness],
        color: beamColor,
        unshaded: true,
      })
    }

    // Built-in scaffolding
    if (this.elementReference.scaffold) {
      const rfTexture = assets.textures["uv_" + this.elementReference.type + "Scaffold"] || assets.textures.uv_scaffold
      const rfMesh = assets.meshes[this.elementReference.type + "Scaffold"] || assets.meshes.scaffold

      render.drawMesh({
        mesh: rfMesh,
        texture: rfTexture,
        position: rPos,
        rotation: rRot,
        scale: rScale,
        color: [1, 1, 1, 1],
        glow: rGlow,
      })
    }
  }
}

