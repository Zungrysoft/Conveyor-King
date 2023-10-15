import * as game from 'game'
import * as u from 'utils'
import * as soundmanager from 'soundmanager'
import * as gfx from 'webgl'
import * as mat from 'matrices'
import * as vec2 from 'vector2'
import * as vec3 from 'vector3'
import Thing from 'thing'
import { assets } from 'game'


export default class AmbientOcclusion extends Thing {
  constructor () {
    super()
  }

  preDraw () {
    console.log("AO")
    super.preDraw()

    // Calculate screen-space ambient occlusion texture
    gfx.setShader(assets.shaders.ssao)
    gfx.drawScreen()
  }
}

