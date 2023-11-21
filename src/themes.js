const themes = {
  sandy: {
    props: [],
    fogDistance: 30,
    fogColor: [1.0, 0.95, 0.8],
    particles: [],
    music: "",
  },
}

export function getTheme(theme) {
  return themes[theme]
}
