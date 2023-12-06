import * as game from 'game'
import * as u from 'utils'
import * as vec3 from 'vector3'
import * as gfx from 'webgl'
import Thing from 'thing'
import { assets } from 'game'
import * as render from './renderer.js'

export default class SandParticle extends Thing {
  speed = 0.06
  wobble = 0.6
  wobbleScale = 6
  position = [0, 0, 0]
  velocity = [-this.speed, 0, 0]
  constantVelocity = [-0.06, -0.006, 0.015]
  time = 0

  constructor (position) {
    super()
    this.position = position
  }

  update () {
    this.time ++

    // Make velocity wobble from noise
    const noiseSample = vec3.normalize(vec3.add([
      u.noise(...vec3.scale(this.position, 0.8 * this.wobbleScale)),
      u.noise(...vec3.scale(this.position, 1.6 * this.wobbleScale)),
      u.noise(...vec3.scale(this.position, 3.7 * this.wobbleScale)),
    ], [200, 300, 400]))
    this.velocity = vec3.add(this.velocity, vec3.scale(noiseSample, this.wobble))

    // Rescale velocity to match speed
    this.velocity = vec3.scale(vec3.normalize(this.velocity), this.speed)

    // Move
    this.position = vec3.add(this.position, this.velocity)
    this.position = vec3.add(this.position, this.constantVelocity)

    // Kill if too far away or too old
    if (vec3.magnitude(this.position) > 30 || this.time > 600) {
      this.dead = true
    }
  }

  draw () {
    render.drawBillboard({
      texture: assets.textures.square,
      position: this.position,
      color: [0.7, 0.7, 0.6, 1.0],
      scale: 0.04,
      unshaded: true,
    })
  }
}
