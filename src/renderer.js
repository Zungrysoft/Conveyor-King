import * as game from 'game'
import * as gfx from 'webgl'
import * as mat from 'matrices'
import Thing from 'thing'
import { assets } from 'game'

export function drawMesh ({mesh, texture, position, rotation=[0.0, 0.0, 0.0], scale=1.0, color=[1, 1, 1, 1], scroll=0.0}={}) {
  gfx.setFramebuffer(game.globals.framebuffer.framebuffer)
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
  gfx.set('rotationMatrix', mat.getRotation(rotation))
  gfx.drawMesh(mesh)
}

export default class Renderer extends Thing {
  // Depth is set to an extremely high value so that it will render last
  depth = 10000000

  constructor () {
    super()
  }

  postDraw () {
    super.postDraw()

    // We are now drawing to the screen instead of to the buffer
    gfx.setFramebuffer(null)

    // Draw the framebuffer to the screen using the screen shader
    gfx.setShader(assets.shaders.screen)
    gfx.set('colorTexture', 0, 'int')
    gfx.setTexture(game.globals.framebuffer.texture, 0)
    gfx.set('depthTexture', 1, 'int')
    gfx.setTexture(game.globals.framebuffer.depthTexture, 1)
    game.getCamera3D().setUniforms()
    gfx.drawScreen()

    // Clear frame buffers
    gfx.setFramebuffer(game.globals.framebuffer.framebuffer)
    gfx.clearFramebuffer()
  }
}

