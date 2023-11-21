import * as game from 'game'
import * as gfx from 'webgl'
import * as mat from 'matrices'
import * as theme from './themes.js'
import Thing from 'thing'
import { assets } from 'game'

export function drawMesh ({
  mesh, 
  texture, 
  position, 
  rotation=[0.0, 0.0, 0.0], 
  scale=1.0, 
  color=[1, 1, 1, 1], 
  scroll=0.0, 
  glow=0.0}={}, 
  fogDistance=-1,
  fogColor=[1.0, 1.0, 1.0],
) {
  let glowColor = [
    color[0] * (1.0 + glow/2) + glow/2,
    color[1] * (1.0 + glow/2) + glow/2,
    color[2] * (1.0 + glow/2) + glow/2,
    color[3],
  ]
  gfx.setFramebuffer(game.globals.framebuffer.framebuffer)
  gfx.setShader(assets.shaders.shaded)
  game.getCamera3D().setUniforms()
  gfx.set('color', glowColor)
  gfx.set('scroll', scroll)
  gfx.set('fogDistance', fogDistance)
  gfx.set('fogColor', fogColor)
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

    let board = game.getThing('board')
    let fogDistance = theme.getTheme(board.state.theme).fogDistance
    let fogColor = theme.getTheme(board.state.theme).fogColor

    // We are now drawing to the screen instead of to the buffer
    gfx.setFramebuffer(null)

    // Draw the framebuffer to the screen using the screen shader
    gfx.setShader(assets.shaders.screen)
    gfx.set('fogDistance', fogDistance)
    gfx.set('fogColor', fogColor)
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

