import * as game from 'game'
import SandParticle from './particlesand.js'

const themes = {
  sandy: {
    props: [
      {mesh: "deco_sand", texture: "uv_deco_sand"},
      {mesh: "deco_dumptruck", texture: "uv_deco_dumptruck"},
      {mesh: "deco_dumptruck_sand", texture: "uv_deco_sand"},
      {mesh: "deco_scrap_beams", texture: "square", textureColor: [0.4, 0.35, 0.3, 1.0]},
    ],
    particle: "sand",
    particleRate: 0.1,
    fogDistance: 33,
    fogColor: [0.8, 0.8, 0.71],
    particles: [],
    music: "",
  },
}

export function getTheme(theme) {
  return themes[theme]
}

export function spawnParticle(theme, position) {
  const themeData = getTheme(theme)
  if (Math.random() < themeData.particleRate) {
    if (themeData.particle === "sand") {
      game.addThing(new SandParticle(position))
    }
  }
}
