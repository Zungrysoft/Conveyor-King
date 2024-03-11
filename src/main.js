import * as game from 'game'
import * as gfx from 'webgl'
import Board from './board.js'
import Renderer from './renderer.js'

game.config.width = 900
game.config.height = 540
//game.config.isWebglEnabled = false
document.title = 'Conveyor King'

await game.loadAssets({
  images: {
    background: 'images/bg1.png',
    square: 'images/square.png',
    uv_crate_a: 'images/uv_crate_a.png',
    uv_crate_b: 'images/uv_crate_b.png',
    uv_crate_c: 'images/uv_crate_c.png',
    uv_crate_d: 'images/uv_crate_d.png',
    uv_crate_e: 'images/uv_crate_e.png',
    uv_crate_: 'images/uv_crate.png',
    uv_chute_a: 'images/uv_chute_a.png',
    uv_chute_b: 'images/uv_chute_b.png',
    uv_chute_c: 'images/uv_chute_c.png',
    uv_chute_d: 'images/uv_chute_d.png',
    uv_chute_e: 'images/uv_chute_e.png',
    uv_chute_: 'images/uv_chute.png',
    uv_conveyorBelt: 'images/uv_conveyor_belt.png',
    uv_conveyorScaffold: 'images/uv_scaffold_conveyor.png',
    uv_scaffold: 'images/uv_scaffold.png',
    uv_block: 'images/uv_block.png',
    uv_laser: 'images/uv_laser.png',
    uv_rotator: 'images/uv_rotator.png',

    uv_deco_sand: 'images/uv_deco_sand.png',
    uv_deco_dumptruck: 'images/uv_deco_dumptruck.png',
  },

  models: {
    cube: 'models/cube.obj',
    skybox: 'models/skybox.obj',
    crate: 'models/crate.obj',
    chute: 'models/chute.obj',
    fan: 'models/fan.obj',
    fanBlade: 'models/fan_blade.obj',
    conveyor: 'models/conveyor.obj',
    conveyorBelt: 'models/conveyor_belt.obj',
    conveyorScaffold: 'models/conveyor_scaffold.obj',
    scaffold: 'models/scaffold.obj',
    laser: 'models/laser.obj',
    laserScaffold: 'models/laser_scaffold.obj',
    rotator: 'models/rotator.obj',
    rotatorArrows: 'models/rotator_arrows.obj',
    paint: 'models/paint.obj',

    deco_sand: 'models/deco_sand.obj',
    deco_dumptruck: 'models/deco_dumptruck.obj',
    deco_dumptruck_sand: 'models/deco_dumptruck_sand.obj',
    deco_scrap_beams: 'models/deco_scrap_beams.obj',
  },

  sounds: {
    collect: 'sounds/collect.wav',
    laser: 'sounds/laser2.wav',
    laserHit: 'sounds/laser.wav',
    shift: 'sounds/shift2.wav',
    thump: 'sounds/thump.wav',
    wind: 'sounds/wind.wav',
    fail: 'sounds/fail.wav',
    whoosh: 'sounds/whoosh.wav',
    change: 'sounds/change.wav',
    fall: 'sounds/fall.wav',
  },

  shaderSources: {
    shadedVert: 'shaders/shaded.vert',
    shadedFrag: 'shaders/shaded.frag',

    unshadedFrag: 'shaders/unshaded.frag',

    billboardVert: 'shaders/billboard.vert',

    screenVert: 'shaders/screen.vert',
    screenFrag: 'shaders/screen.frag',
  },
})

const { assets } = game
assets.shaders = {
  shaded: gfx.createShader(
    assets.shaderSources.shadedVert,
    assets.shaderSources.shadedFrag
  ),
  unshaded: gfx.createShader(
    assets.shaderSources.shadedVert,
    assets.shaderSources.unshadedFrag
  ),
  billboard: gfx.createShader(
    assets.shaderSources.billboardVert,
    assets.shaderSources.unshadedFrag
  ),
  screen: gfx.createShader(
    assets.shaderSources.screenVert,
    assets.shaderSources.screenFrag
  ),
}

assets.textures = Object.fromEntries(
  Object.entries(assets.images).map(([name, image]) => [
    name, gfx.createTexture(image)
  ])
)

assets.meshes = Object.fromEntries(
  Object.entries(assets.models).map(([name, model]) => [
    name, gfx.createMesh(model)
  ])
)

game.globals.usingGamepad = false
game.globals.levelCompletions = {}
game.globals.level = 1
game.globals.framebuffer = gfx.createFramebufferWithDepth()
game.globals.framebufferUnshaded = gfx.createFramebufferWithDepth()

game.setScene(() => {
  game.addThing(new Renderer())
  game.addThing(new Board())
})
