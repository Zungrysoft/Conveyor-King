import * as level1 from './levels/test1.js'
import * as fanIntro from './levels/fanIntro.js'
import * as fanPushesFan from './levels/fanPushesFan.js'
import * as stacking from './levels/stacking.js'
import * as intro from './levels/intro.js'
import * as shuffle from './levels/shuffle.js'
import * as sorting from './levels/sorting.js'
import * as plinko from './levels/plinko.js'
import * as zapYourProblems from './levels/zapYourProblems.js'
import * as fantastic from './levels/fantastic.js'
import * as laserIntro from './levels/laserIntro.js'
import * as simpleFans from './levels/simpleFans.js'
import * as twoTowers from './levels/twoTowers.js'
import * as rotatorTest from './levels/rotatorTest.js'
import * as doubleZap from './levels/doubleZap.js'
import * as fanTower from './levels/fanTower.js'
import * as bridge from './levels/bridge.js'
import * as paintIntro from './levels/paintIntro.js'
import * as gridWorld from './levels/gridWorld.js'
import * as paintMixing from './levels/paintMixing.js'

const LEVEL_LIST = [
  intro,
  fanIntro,
  stacking,
  fanPushesFan,
  simpleFans,
  shuffle,
  sorting,
  laserIntro,
  fantastic,
  twoTowers,
  plinko,
  zapYourProblems,
  doubleZap,
  paintIntro,
  paintMixing,
  gridWorld,
  fanTower,
]

export function getLevel(lvl) {
  // Retrieve level data
  let ret = JSON.parse(JSON.stringify(LEVEL_LIST[lvl-1].data))

  // Add some top-level keys
  ret.theme = ret.theme || 'sandy';

  // Clean up elements
  for (const element of ret.elements) {
    element.type = element.type || 'block'
    element.direction = element.direction || 'south'
    element.color = element.color || ''
    element.letter = element.letter || ''
  }

  // Make sure all elements have positions and that none overlap
  let positionMap = {}
  for (let i = ret.elements.length-1; i >= 0; i --) {
    const element = ret.elements[i]
    if (!element.position) {
      console.warn(`Element ${element.type} has no position`)
      ret.elements.splice(i, 1)
    }
    else if (positionMap[element.position]) {
      console.warn(`Element ${element.type} at position ${element.position} overlaps with another element.`)
      ret.elements.splice(i, 1)
    }
    else {
      positionMap[element.position] = true
    }
  }

  return ret
}

export function getLevelCount() {
  return LEVEL_LIST.length
}

