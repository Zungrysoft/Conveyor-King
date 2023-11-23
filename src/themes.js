import * as game from 'game'
import SandParticle from './particlesand.js'

const themes = {
  sandy: {
    props: [
      {mesh: "sand", texture: "uv_sand"},
    ],
    particle: "sand",
    particleRate: 0.1,
    fogDistance: 30,
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
