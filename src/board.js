import * as game from 'game'
import * as u from 'utils'
import * as soundmanager from 'soundmanager'
import * as mat from 'matrices'
import * as render from './renderer.js'
import * as vec2 from 'vector2'
import * as vec3 from 'vector3'
import * as themes from './themes.js'
import Thing from 'thing'
import Element from './element.js'
import { assets } from 'game'
import { getLevel, getLevelCount } from './levelloader.js'

export default class Board extends Thing {
  state = {}
  advancementData = {
    control: '',
    queue: ['fall'],
  }
  stateStack = []
  backgroundPattern = game.ctx.createPattern(game.assets.images.background, 'repeat')
  viewAngle = [Math.PI/2, Math.PI*(1/4)]
  viewAngleTarget = this.viewAngle
  viewDistance = 4
  viewPosition = [0, 0, 0]
  time = 0
  controlMap = {}
  lastControlTime = -1000
  selectedColor = ''

  constructor () {
    super()
    game.setThingName(this, 'board')

    // Build board state from level file
    if (game.globals.level === 0) {
      this.state = JSON.parse(game.globals.customLevelState)
    }
    else {
      this.state = getLevel(game.globals.level)
    }

    // Consistency
    this.state.level = game.globals.level
    this.state.cratesDelivered = 0

    // Set up camera based on level params
    this.setupCamera(this.state)

    // Initial setup of animations
    this.resetAnimations()

    // Choose controls
    this.setupControls()
  }

  setupCamera(state) {
    this.viewDistance = state.cameraDistance + 0.1
    this.viewPosition = state.cameraPosition
    this.viewAngle = state.cameraStartAngle
    this.viewAngleTarget = state.cameraStartAngle
  }

  setupControls() {
    const fullControlMap = {
      red: {keyCode: "KeyZ", name: "Z", buttonId: 1, buttonName: "B", priority: 0},
      green: {keyCode: "KeyX", name: "X", buttonId: 0, buttonName: "A", priority: 1},
      blue: {keyCode: "KeyC", name: "C", buttonId: 2, buttonName: "X", priority: 2},
      yellow: {keyCode: "KeyV", name: "V", buttonId: 3, buttonName: "Y", priority: 3},
      cyan: {keyCode: "KeyB", name: "B", buttonId: 9, buttonName: "Select", priority: 4},
      purple: {keyCode: "KeyN", name: "N", buttonId: 8, buttonName: "Start", priority: 5},
      orange: {keyCode: "KeyM", name: "M", buttonId: 11, buttonName: "RS", priority: 6},
      white: {keyCode: "Comma", name: ",", buttonId: 10, buttonName: "LS", priority: 7},
      brown: {keyCode: "Slash", name: "/", buttonId: 13, buttonName: "UNBOUND", priority: 9},
      black: {keyCode: "Semicolon", name: ";", buttonId: 14, buttonName: "UNBOUND", priority: 10},
    }
    this.controlMap = []

    for (const element of this.state.elements) {
      const c = element.color
      if (c && !(c in this.controlMap)) {
        this.controlMap[c] = fullControlMap[c]
      }
    }
  }

  update () {
    super.update()

    this.time ++
    this.errorTime --

    // Decide whether to show keyboard controls or gamepad controls based on which was used most recently
    // if (Object.keys(game.buttonsPressed).length) {
    //   game.globals.usingGamepad = true
    // }
    // if (Object.keys(game.keysPressed).length && !game.keysPressed.KeyL) {
    //   game.globals.usingGamepad = false
    // }

    // Level controls
    if (this.time > 5) {
      if (game.keysPressed.Backspace) {
        game.resetScene()
      }
      if (game.keysPressed.BracketLeft || game.keysPressed.Minus || game.keysPressed.NumpadSubtract) {
        if (game.globals.level > 1) {
          game.globals.level --
          game.resetScene()
        }
      }
      if (game.keysPressed.BracketRight || game.keysPressed.Equal || game.keysPressed.NumpadAdd) {
        if (game.globals.level < getLevelCount()) {
          game.globals.level ++
          game.resetScene()
        }
      }
    }

    // Debug control
    if (game.keysPressed.KeyJ) {
      console.log(
        this.state.elements.filter(x => x.type === 'crate')
      )
    }

    // Selection function
    this.selectedColor = this.selectColor()

    // Camera controls
    if (game.keysPressed.ArrowRight || game.keysPressed.KeyD) {
      this.viewAngleTarget[0] -= Math.PI/4
    }
    if (game.keysPressed.ArrowLeft || game.keysPressed.KeyA) {
      this.viewAngleTarget[0] += Math.PI/4
    }
    if (game.keysPressed.ArrowUp || game.keysPressed.KeyW) {
      this.viewAngleTarget[1] += Math.PI/8
    }
    if (game.keysPressed.ArrowDown || game.keysPressed.KeyS) {
      this.viewAngleTarget[1] -= Math.PI/8
    }
    this.viewAngleTarget[1] = u.clamp(this.viewAngleTarget[1], 0, Math.PI/2)
    this.viewAngle = vec2.lerp(this.viewAngle, this.viewAngleTarget, 0.2)
    this.updateCamera()

    // Undo function
    if (game.keysPressed.KeyU || game.keysPressed.Space) {
      // Make sure there are actually things to undo
      if (this.stateStack.length > 0) {
        let newState = this.stateStack.pop()
        let oldState = JSON.stringify(this.state)

        // If the new state matches the old state, that means one duplicate state got pushed
        // So go to the next state
        if (newState === oldState && this.stateStack.length > 0) {
          newState = this.stateStack.pop()
        }
        this.state = JSON.parse(newState)

        // Reset all animations
        this.resetAnimations()

        // Clear advancement queue
        this.advancementData.queue = []
      }
    }

    // =============
    // Game controls
    // =============

    // Determine if blocked
    let blocked = this.isAnimationBlocking()

    // If not blocked...
    if (!blocked && this.time - this.lastControlTime > 10) {
      // If advancement queue is empty, accept user input
      if (this.advancementData.queue.length === 0) {
        if (game.mouse.leftButton && this.selectedColor !== '') {
          this.controlInput(this.selectedColor)
        }
        else {
          for (const control in this.controlMap) {
            // If the user pressed a control key...
            if (game.keysDown[this.controlMap[control].keyCode]) {
              // Start advancement queue
              this.controlInput(control)

              // Done looking for controls
              break
            }
          }
        }
      }

      // If there are elements in advancement queue, execute them
      while (!blocked && this.advancementData.queue.length > 0) {
        const adv = this.advancementData.queue.shift()
        if (adv === 'conveyor') {
          this.advanceConveyor(this.advancementData.control)
        }
        else if (adv === 'rotator') {
          this.advanceRotator(this.advancementData.control)
        }
        else if (adv === 'fan0') {
          this.advanceFan(this.advancementData.control, "east")
        }
        else if (adv === 'fan1') {
          this.advanceFan(this.advancementData.control, "south")
        }
        else if (adv === 'fan2') {
          this.advanceFan(this.advancementData.control, "west")
        }
        else if (adv === 'fan3') {
          this.advanceFan(this.advancementData.control, "north")
        }
        else if (adv === 'laser') {
          this.advanceLaser(this.advancementData.control)
        }
        else if (adv === 'fall') {
          this.advanceFall()
        }

        blocked = this.isAnimationBlocking()
      }
    }

    // Check for win
    if (this.state.cratesDelivered >= this.state.cratesRequired && this.state.level > 0) {
      game.globals.levelCompletions[this.state.level-1] = true
    }

    // Spawn particles
    const radius = 10
    const particlePos = [
      (Math.random() * 2 * radius) - radius,
      (Math.random() * 2 * radius) - radius,
      (Math.random() * 2 * radius) - radius,
    ]
    themes.spawnParticle(this.state.theme, particlePos)
  }

  updateCamera() {
    // Set up 3D camera
    const cam = game.getCamera3D()

    // Set up clip plane
    cam.near = 0.1
    cam.far = 1000

    const offsetPosition = [
      Math.cos(this.viewAngle[0]) * Math.cos(this.viewAngle[1]) * this.viewDistance,
      Math.sin(this.viewAngle[0]) * Math.cos(this.viewAngle[1]) * this.viewDistance,
      Math.sin(this.viewAngle[1]) * this.viewDistance + 1,
    ]
    cam.position = vec3.add(offsetPosition, this.viewPosition)
    cam.lookVector = vec3.invert(vec3.anglesToVector(this.viewAngle[0], this.viewAngle[1]))
    cam.updateMatrices()
  }

  controlInput(control) {
    // Create action queue
    this.advancementData = {
      control: control,
      queue: [
        'conveyor',
        'fall',
        'rotator',
        'fan0',
        'fall',
        'fan1',
        'fall',
        'fan2',
        'fall',
        'fan3',
        'fall',
        'laser',
        'fall',
        'fall', // Hack for now
        'fall',
        'fall',
        'fall',
      ]
    }

    // Push current state to undo stack (but only if it's different from the previous state)
    const curState = JSON.stringify(this.state)
    if (this.stateStack[this.stateStack.length-1] !== curState) {
      this.stateStack.push(curState)
    }

    // Limit the player to one action every n frames
     this.lastControlTime = this.time
  }

  hitTestElement(element, position) {
    // Don't do collision checks for crates (and some other objects) since they are annoying to click around on conveyors
    if (this.isUnselectable(element)) {
      return false
    }
    // Conveyor
    else if (element.type === 'conveyor' && !element.scaffold) {
      if (
        (Math.abs(element.position[0] - position[0]) < 0.5) &&
        (Math.abs(element.position[1] - position[1]) < 0.5) &&
        (Math.abs((element.position[2] + 0.41) - position[2]) < 0.09)
      ) {
        return true
      }
    }
    // Smaller objects
    else if ((element.type === 'fan' || element.type === 'laser') && !element.scaffold) {
      if (
        (Math.abs(element.position[0] - position[0]) < 0.2) &&
        (Math.abs(element.position[1] - position[1]) < 0.2) &&
        (Math.abs(element.position[2] - position[2]) < 0.5)
      ) {
        return true
      }
    }
    // Default box shape
    else {
      if (
        (Math.abs(element.position[0] - position[0]) < 0.5) &&
        (Math.abs(element.position[1] - position[1]) < 0.5) &&
        (Math.abs(element.position[2] - position[2]) < 0.5)
      ) {
        return true
      }
    }

    return false
  }

  selectColor() {
    // Create the ray from mouse position and camera data
    const ray = game.getCamera3D().getMouseRay()

    // Do the line trace
    let traceDistance = 0
    let maxTraceDistance = 20
    let traceStep = 0.05
    let curPos = [...game.getCamera3D().position]
    let rayStep = vec3.scale(ray, traceStep)

    while (traceDistance < maxTraceDistance) {
      curPos = vec3.add(curPos, rayStep)

      // Iterate over elements and check whether we've hit it
      for (const element of this.state.elements) {
        if (this.hitTestElement(element, curPos)) {
          return element.color || ''
        }
      }

      // Advance
      traceDistance += traceStep
    }

    return ''
  }

  resetAnimations() {
    // Kill all existing visual representations
    for (const thing of game.getThings()) {
      if (thing instanceof Element) {
        thing.isDead = true
      }
    }

    // Create visual representations for each thing
    this.state.elements.forEach(element => {
      game.addThing(new Element(element))
    })
  }

  isAnimationBlocking() {
    return game.getThings().filter(x => x.anim && x.anim.moveType !== 'none').length > 0
  }

  isCarryable(element) {
    if (element.destroyed) {
      return false
    }
    if (['crate', 'fan', 'laser', 'paint'].includes(element.type)) {
      return true
    }
    return false
  }

  isPushable(element) {
    if (element.destroyed) {
      return false
    }
    if (['crate', 'fan', 'laser', 'paint'].includes(element.type)) {
      return true
    }
    return false
  }

  isUnselectable(element) {
    if (['crate', 'paint'].includes(element.type)) {
      return true
    }
    return false
  }

  isConsumable(element) {
    if (['paint'].includes(element.type)) {
      return true
    }
    return false
  }

  isPartial(element) {
    if (element.scaffold) {
      return false
    }
    if (['fan', 'laser', 'paint'].includes(element.type)) {
      return true
    }
    return false
  }

  isPaintable(element) {
    if (['conveyor', 'fan', 'laser', 'rotator', 'paint'].includes(element.type)) {
      return true
    }
    return false
  }

  mustShrinkWhenRotating(element) {
    if (['rotator', 'fan', 'laser'].includes(element.type) && !element.scaffold) {
      return false
    }
    return true
  }

  getElementAt(pos) {
    for (let i = 0; i < this.state.elements.length; i ++) {
      if (vec3.equals(this.state.elements[i].position, pos)) {
        return i
      }
    }
    return -1
  }

  getElementDownward(position) {
    // Loop over positions below crate
    let pos = [...position]
    while (pos[2] > this.state.floorHeight) {
      pos[2] --

      // Loop over elements that could be there
      const index = this.getElementAt(pos)
      if (index >= 0) {
        const elem = this.state.elements[index]
        if (vec3.equals(elem.position, pos)) {
          return index
        }
      }
    }

    // Didn't find anything, return -1 for falling into the void
    return -1
  }

  // Return the new state of the element
  tryToMoveInto(pos, moveDir, eState, dState) {
    // Loop over elements
    for (let i = 0; i < eState.length; i ++) {
      const es = eState[i]
      const ds = dState[i]

      // Check if that element is in that space
      if (vec3.equals(pos, es.position)) {
        // If the element in that space is blocked, this element is blocked too
        if (ds.decision === 'blocked') {
          // console.log("Blocked by blocked element " + es.letter)
          return 'blocked'
        }

        // If the element in that space is undecided, this element is undecided too
        if (ds.decision === 'undecided') {
          return 'undecided'
        }

        // If the element in that space is moving out of this space, this element is moving if it's in the same direction
        // If it's moving in a different direction, it is blocked since it would hit the corner
        if (ds.decision === 'moving') {
          if (moveDir === ds.moveDirection) {
            return 'moving'
          }
          else {
            // console.log("Blocked by element " + es.letter + " moving out of space in wrong direction")
            return 'blocked'
          }
        }
      }

      // Check if that element is moving into this space
      if (ds.decision === 'moving') {
        if (vec3.equals(pos, ds.movePosition)) {
          // console.log(es.letter + " was blocked by element moving into space")
          return 'blocked'
        }
      }
    }
    return 'moving'
  }

  advanceConveyor(color) {
    // Track which elements are blocked and which ones have moved
    const states = this.state.elements.map((e) => {return{
      decision: 'blocked',
      moveDirection: -1,
      movePosition: [...e.position]
    }})

    // Mark carryable elements as undecided
    for (const i in this.state.elements) {
      const element = this.state.elements[i]
      if (this.isCarryable(element)) {
        states[i].decision = 'undecided'
      }
    }

    // Iterate until all elements have decided how to move
    let maxIter = 50
    while (states.filter(e => e.decision === 'undecided').length > 0 && maxIter > 0) {
      // Limit the number of iterations so that if we have a cyclical state, it won't cause an infinite loop
      maxIter --

      // Loop over undecided elements
      for (const i in this.state.elements) {
        const element = this.state.elements[i]
        if (states[i].decision === 'undecided') {
          // Check what this element is sitting on top of
          const below = this.getElementAt(vec3.add(element.position, [0, 0, -1]))
          if (below !== -1) {
            // If on top of an active conveyor
            if (this.state.elements[below].type === 'conveyor' && this.state.elements[below].color === color && !this.state.elements[below].destroyed) {
              // Set move direction
              const moveDir = this.state.elements[below].direction
              states[i].moveDirection = moveDir

              // Get position it wants to move into
              const moveSpace = vec3.add(element.position, vec3.directionToVector(moveDir))
              states[i].movePosition = moveSpace
              // console.log(element.letter + " is moving into " + moveSpace)

              // Check if the space to move into is (or has been claimed as) occupied
              states[i].decision = this.tryToMoveInto(moveSpace, moveDir, this.state.elements, states)
            }

            // If on top of a moving element
            else if (states[below].decision === 'moving') {
              // Set move direction
              const moveDir = states[below].moveDirection || 0
              states[i].moveDirection = moveDir

              // Get position it wants to move into
              const moveSpace = vec3.add(element.position, vec3.directionToVector(moveDir))
              states[i].movePosition = moveSpace

              // Check if the space to move into is (or has been claimed as) occupied
              states[i].decision = this.tryToMoveInto(moveSpace, moveDir, this.state.elements, states)
            }

            // If on top of blocked element, set it as blocked
            else if (states[below].decision === 'blocked') {
              // console.log(element.letter + " was blocked by sitting on top of non-moving element")
              states[i].decision = 'blocked'
              continue
            }

            // If on top of undecided element, wait for that element to decide
            else if (states[below].decision === 'undecided') {
              continue
            }
          }
          else {
            // Sitting on air. Don't move it until the fall step
            // console.log(this.state.elements[i].letter + " was blocked by sitting on top of air")
            states[i].decision = 'blocked'
            continue
          }
        }
      }
    }

    // Sound
    let didMoveSomething = false

    // Advance state based on decisions
    for (let i = 0; i < this.state.elements.length; i ++) {
      if (states[i].decision === 'moving') {
        // Start animation
        this.getElementThing(this.state.elements[i]).startAnimateLinear(this.state.elements[i].position, states[i].movePosition)

        // Move the element's position
        this.state.elements[i].position = [...states[i].movePosition]

        didMoveSomething = true
      }

      // Conveyor Belt Scroll Animation
      if (this.state.elements[i].type === 'conveyor' && this.state.elements[i].color === color) {
        this.getElementThing(this.state.elements[i]).startAnimateScroll()
      }
    }

    if (didMoveSomething) {
      soundmanager.playSound("shift", 0.3)
    }
  }

  fanPushElement(position, direction) {
    const index = this.getElementAt(position)

    // Base case: this is air
    if (index === -1) {
      return true
    }
    // Base case: element is not pushable
    if (!this.isPushable(this.state.elements[index])) {
      return false
    }

    // Recursion case: Check the next element behind
    const canPush = this.fanPushElement(vec3.add(position, direction), direction)

    // If the result is that we can push this element, do it
    if (canPush) {
      // Start animation
      this.getElementThing(this.state.elements[index]).startAnimateFriction(this.state.elements[index].position, vec3.add(position, direction))

      // Move
      this.state.elements[index].position = vec3.add(position, direction)
    }

    // Return result to previous element
    return canPush
  }

  advanceFan(color, direction) {
    // To simplify logic, we do each fan direction separately

    // Sound
    let didPushSomething = false
    let didSpin = false

    // Iterate over fans...
    for (const i in this.state.elements) {
      const element = this.state.elements[i]
      // If this is a fan of the right color and direction...
      if (element.type === 'fan' && element.direction === direction && element.color === color && !element.destroyed) {
        // Find elements in this fan's line
        let pos = [...element.position]
        while (vec2.magnitude(pos) < 50) {
          pos = vec3.add(pos, vec3.directionToVector(direction))
          const index = this.getElementAt(pos)

          // If this is a moveable element, try to push it
          if (index !== -1) {
            let result = this.fanPushElement(pos, vec3.directionToVector(direction))
            if (result === true) {
              didPushSomething = true
            }
            break
          }
        }

        // Fan spinning animation
        this.getElementThing(this.state.elements[i]).startAnimateSpin()
        didSpin = true
      }
    }

    if (didPushSomething) {
      soundmanager.playSound("wind", 0.3)
    }
    if (didSpin) {
      soundmanager.playSound("whoosh", 0.3)
    }
  }

  rotatorRotateElement(position, rotateDirection, shrinkHeight) {
    const index = this.getElementAt(position)

    // Don't rotate air
    if (index === -1) {
      return
    }

    // Rotate it
    let direction = this.state.elements[index].direction
    let newDirection = direction
    if (rotateDirection === 'ccw') {
      // State
      const mapping = {
        north: 'west',
        west: 'south',
        south: 'east',
        east: 'north',
      }
      newDirection = mapping[direction]
      this.state.elements[index].direction = newDirection
    }
    else {
      // State
      const mapping = {
        north: 'east',
        west: 'north',
        south: 'west',
        east: 'south',
      }
      newDirection = mapping[direction]
      this.state.elements[index].direction = newDirection
    }

    // Animation
    const shrink = this.mustShrinkWhenRotating(this.state.elements[index])
    this.getElementThing(this.state.elements[index]).startAnimateRotate(
      this.state.elements[index].position,
      vec2.vectorToAngle(vec2.directionToVector(direction)),
      vec2.vectorToAngle(vec2.directionToVector(newDirection)),
      shrinkHeight,
      shrink,
    )
  }

  rotatorRotate(position, rotateDirection, shrinkHeight, height) {
    const index = this.getElementAt(position)

    // Base case: this is air
    if (index === -1) {
      return false
    }
    // Base case: element is not carryable
    // Ignore this base case if height <= 1 since the rotator can always rotate itself and the element on top of it
    if (!this.isCarryable(this.state.elements[index]) && height > 1) {
      return false
    }

    // Perform the rotation and animation
    this.rotatorRotateElement(position, rotateDirection, shrinkHeight)

    // Track stack height
    const shrink = this.mustShrinkWhenRotating(this.state.elements[index])
    if (shrink) {
      shrinkHeight ++
    }

    // Since this element was rotated, try to rotate the element on top of it
    this.rotatorRotate(vec3.add(position, [0, 0, 1]), rotateDirection, shrinkHeight, height + 1)

    // Return result to previous element
    return true
  }

  advanceRotator(color) {
    // Sound
    let didRotateSomething = false

    // Iterate over rotators...
    for (const i in this.state.elements) {
      const element = this.state.elements[i]
      // If this is a fan of the right color and angle...
      if (element.type === 'rotator' && element.color === color && !element.destroyed) {
        let pos = [...element.position]

        // Rotate everything
        let result = this.rotatorRotate(pos, element.rotateDirection, 0, 0)
        if (result === true) {
          didRotateSomething = true
        }
      }
    }

    if (didRotateSomething) {
      soundmanager.playSound("shift", 0.3)
    }
  }

  advanceFall() {
    // Track which elements are blocked and which ones have moved
    const states = this.state.elements.map((e) => {return{
      decision: 'blocked',
      movePosition: [...e.position],
      fellInChute: false,
    }})

    // Mark carryable elements as undecided
    for (const i in this.state.elements) {
      const element = this.state.elements[i]
      if (this.isCarryable(element)) {
        states[i].decision = 'undecided'
      }
    }

    // Iterate until all elements have decided how to move
    let maxIter = 50
    while (states.filter(e => e.decision === 'undecided').length > 0 && maxIter > 0) {
      // Limit the number of iterations so that if we have a cyclical state, it won't cause an infinite loop
      maxIter --

      // Loop over undecided elements
      for (const i in this.state.elements) {
        const element = this.state.elements[i]
        if (states[i].decision === 'undecided') {
          // Check what this element is sitting on top of
          const below = this.getElementDownward([...element.position])
          if (below !== -1) {
            // How far below the below element is
            const belowDistance = element.position[2] - this.state.elements[below].position[2]

            // Consumable items can fall into certain elements even when one tile above them
            let belowDistanceOffset = 0
            if (this.isConsumable(element) && this.isPartial(this.state.elements[below])) {
              belowDistanceOffset = 1
            }

            // If on top of a chute, destroy self
            if (this.state.elements[below].type === 'chute') {
              states[i].decision = 'moving'
              states[i].movePosition = [...states[below].movePosition]
              states[i].fellInChute = this.state.elements[below].letter
            }
            // If on top of a decided element, move down to it
            else if ((states[below].decision === 'blocked' && (belowDistance+belowDistanceOffset) > 1) || states[below].decision === 'moving') {
              states[i].decision = 'moving'
              states[i].movePosition = vec3.add(states[below].movePosition, [0, 0, 1 - belowDistanceOffset])
              if (states[below].movePosition[2] <= this.state.floorHeight) {
                states[i].movePosition[2] = this.state.floorHeight
              }
              continue
            }
            // If on top of undecided element, wait for that element to decide
            else if (states[below].decision === 'undecided') {
              continue
            }
            // Else, this element is blocked
            else {
              states[i].decision = 'blocked'
            }
          }
          else {
            // Sitting on the void. Fall into it.
            // console.log(element.letter + " fell into the void")
            states[i].decision = 'moving'
            states[i].movePosition[2] = this.state.floorHeight
            continue
          }
        }
      }
    }

    // Advance state based on decisions
    for (let i = 0; i < this.state.elements.length; i ++) {
      if (states[i].decision === 'moving') {
        // If it fell in a chute, special rules apply
        if (states[i].fellInChute) {
          // Animation
          this.getElementThing(this.state.elements[i]).startAnimateFall(
            [...this.state.elements[i].position],
            [...states[i].movePosition],
            true,
            false,
          )

          // Move
          this.state.elements[i].destroyed = true
          this.state.elements[i].position = [0, 0, this.state.floorHeight]
          if (this.state.elements[i].letter === states[i].fellInChute) {
            this.state.cratesDelivered ++
            soundmanager.playSound("collect", 0.3)
          }
          else {
            soundmanager.playSound("fail", 0.3)
          }
        }
        // Otherwise, just move it where it's headed
        else {
          // If fell into the void, make it disappear
          if (states[i].movePosition[2] <= this.state.floorHeight && !this.state.elements[i].destroyed) {
            this.state.elements[i].destroyed = true
          }

          // Animation
          this.getElementThing(this.state.elements[i]).startAnimateFall(
            [...this.state.elements[i].position],
            [...states[i].movePosition],
            this.state.elements[i].destroyed,
            this.state.elements[i].destroyed,
          )

          // Consumables effect
          if (this.isConsumable(this.state.elements[i])) {
            if (this.state.elements[i].type === 'paint') {
              const didPaint = this.executePaint(this.state.elements[i])
              if (!didPaint) {
                this.state.elements[i].position = states[i].movePosition
              }
            }
          }
          // Move into position
          else {
            this.state.elements[i].position = states[i].movePosition
          }
        }
      }
    }
  }

  executePaint(element) {
    // Get the element we're painting
    let below = this.state.elements[this.getElementDownward(element.position)]

    // Determine if it is paintable
    if (below && this.isPaintable(below)) {
      // Animation for painted object (Prevents object from changing color too soon)
      this.getElementThing(below).startAnimateChangeColor(below.color)

      // Animation for paint
      this.getElementThing(element).linkAnimation(below, 'paintSplash')

      // Paint the element
      if (below.type === 'paint') {
        // Special case: If paint lands on paint, blend the colors!
        below.color = this.mixColors(element.color, below.color)
      }
      else {
        below.color = element.color
      }

      // Destroy the paint
      element.destroyed = true
      element.position = [0, 0, this.state.floorHeight]

      return true
    }

    return false
  }

  mixColors(c1, c2) {
    let colors = [c1, c2]

    // Black plus anything is still black
    if (colors.includes('black')) { return 'black' }

    // Brown plus anything is still brown
    if (colors.includes('brown')) { return 'brown' }

    // Mixing primary colors to make secondary colors
    if (colors.includes('blue') && colors.includes('red')) { return 'purple' }
    if (colors.includes('blue') && colors.includes('yellow')) { return 'green' }
    if (colors.includes('red') && colors.includes('yellow')) { return 'orange' }

    // Cyan is a bit of an odd one out
    if (colors.includes('blue') && colors.includes('green')) { return 'cyan' }
    if (colors.includes('cyan') && colors.includes('orange')) { return 'brown' }
    if (colors.includes('cyan') && colors.includes('red')) { return 'brown' }
    if (colors.includes('cyan') && colors.includes('yellow')) { return 'green' }
    if (colors.includes('cyan') && colors.includes('purple')) { return 'blue' }

    // Mixing opposite colors makes brown
    if (colors.includes('red') && colors.includes('green')) { return 'brown' }
    if (colors.includes('yellow') && colors.includes('purple')) { return 'brown' }
    if (colors.includes('orange') && colors.includes('blue')) { return 'brown' }

    // Mixing secondary colors makes brown
    if (colors.includes('purple') && colors.includes('green')) { return 'brown' }
    if (colors.includes('purple') && colors.includes('orange')) { return 'brown' }
    if (colors.includes('green') && colors.includes('orange')) { return 'brown' }

    // If no combinations exist, just use the first provided color
    return c1
  }

  advanceLaser(color) {
    // Track which elements are destroyed
    const destroyed = this.state.elements.map(_ => false)

    // Iterate over elements...
    for (const i in this.state.elements) {
      const element = this.state.elements[i]
      // If this is a laser of the right color...
      if (element.type === 'laser' && element.color === color && !element.destroyed) {
        // Laser animation
        this.getElementThing(element).startAnimateLaser(50)

        // Sound effect
        soundmanager.playSound("laser", 0.2)

        // Find elements in this laser's line
        let pos = [...element.position]
        while (vec2.magnitude(pos) < 50) {
          pos = vec3.add(pos, vec3.directionToVector(element.direction))
          const index = this.getElementAt(pos)

          // If this is a carryable element, mark it for destruction
          if (index !== -1) {
            destroyed[index] = true

            // Animation
            this.getElementThing(element).startAnimateLaser(vec2.magnitude(vec3.subtract(pos, element.position)))

            // Sound effect
            soundmanager.playSound("laserHit", 0.8)

            break
          }
        }
      }
    }

    for (const i in this.state.elements) {
      if (destroyed[i]) {
        // Start animation
        this.getElementThing(this.state.elements[i]).startAnimateShrink(this.state.elements[i].position)

        // State update
        this.state.elements[i].destroyed = true
        this.state.elements[i].position = [0, 0, this.state.floorHeight]
      }
    }
  }

  getElementThing(element) {
    return game.getThings().filter(x => x.elementReference === element)?.[0]
  }

  draw () {
    const { ctx } = game

    // Skybox
    const fogDistance = themes.getTheme(this.state.theme).fogDistance
    render.drawMesh({
      mesh: assets.meshes.skybox,
      texture: assets.textures.square,
      position: game.getCamera3D().position,
      scale: [
        fogDistance * -3,
        fogDistance * -3,
        fogDistance * -3,
      ],
    })

    // Theme props
    for (const prop of themes.getTheme(this.state.theme).props) {
      render.drawMesh({
        mesh: assets.meshes[prop.mesh],
        texture: assets.textures[prop.texture],
        position: [0, 0, 0],
        color: prop.textureColor || [1, 1, 1, 1]
      })
    }

    const drawText = (text, fontSize=40, position=[0, 0], align=[0, 0]) => {
      // Hud scale and text size
      const hs = 0.5

      // Align horizontal
      let textAlign = 'left'
      let finalPosition = [0, 0]
      if (align[0] < 0) {
        finalPosition[0] = Math.round(position[0]*hs)
        textAlign = 'left'
      }
      else if (align[0] > 0) {
        finalPosition[0] = game.config.width - Math.round(position[0]*hs)
        textAlign = 'right'
      }
      else {
        finalPosition[0] = game.config.width/2 + Math.round(position[0]*hs)
        textAlign = 'center'
      }

      // Align vertical
      if (align[1] < 0) {
        finalPosition[1] = Math.round(position[1]*hs)
      }
      else if (align[1] > 0) {
        finalPosition[1] = game.config.height - Math.round(position[1]*hs)
      }
      else {
        finalPosition[1] = game.config.height/2 + Math.round(position[1]*hs)
      }

      // Font size
      const adjustedFontSize = Math.round(fontSize * hs)

      // Shadow offset
      const shadowOffset = Math.round((fontSize * hs) / 10)

      // Render
      ctx.save()
      ctx.translate(...finalPosition)
      ctx.font = `italic ${adjustedFontSize}px Times New Roman`
      const str = text
      ctx.textAlign = textAlign
      ctx.fillStyle = 'black'
      ctx.fillText(str, 0, 0)
      ctx.fillStyle = 'white'
      ctx.fillText(str, shadowOffset, -shadowOffset)
      ctx.restore()
    }

    // Crates Delivered
    drawText(
      this.state.cratesDelivered + "/" + this.state.cratesRequired + " crates correctly sorted",
      40, [32, 72], [-1, -1]
    )

    // Controls
    {
      const controls = Object.keys(this.controlMap).sort((a, b) => {return this.controlMap[a].priority < this.controlMap[b].priority ? 1 : -1})
      let controlIndex = 1
      for (const key of controls) {
        const control = this.controlMap[key]
        const keyName = game.globals.usingGamepad ? control.buttonName : control.name
        drawText(
          keyName + ': ' + key,
          40, [32, 48 * controlIndex], [-1, 1]
        )
        controlIndex ++
      }
    }

    // Aux controls
    {
      const auxControls = [
        "Arrow Keys: Camera",
        "Space / U: Undo",
        "Backspace: Restart",
      ].reverse()
      const auxControlsGamepad = [
        "DPad: Camera",
        "RB: Undo",
        "LB: Restart",
      ].reverse()
      let controlIndex = 1
      for (const control of (game.globals.usingGamepad ? auxControlsGamepad : auxControls)) {
        drawText(
          control,
          40, [32, 48 * controlIndex], [1, 1]
        )
        controlIndex ++
      }
    }

    // Draw the victory text
    const victory = this.state.cratesDelivered >= this.state.cratesRequired
    if (victory) {
      // You win message
      drawText(
        this.state.level === 0 ? "Level Complete!" : "Level " + this.state.level + " Complete!",
        130, [0, -100], [0, 0]
      )

      // Level change guide
      drawText(
        game.globals.usingGamepad ? "Use LT and RT to change levels" : "Use - and + to change levels",
        50, [0, 100], [0, 0]
      )
    }
    if (!victory || this.state.level === 0) {
      // Draw the level Name
      drawText(
        this.state.level === 0 ? this.state.levelTitle : "Level " + this.state.level,
        80, [0, 112], [0, -1]
      )

      // Draw completion text
      if (game.globals.levelCompletions[this.state.level-1] === true) {
        drawText(
          "Complete!",
          40, [0, 180], [0, -1]
        )
      }
    }

    // Error text
    if (this.errorTime > 0) {
      ctx.save()
      ctx.translate(game.config.width/2, game.config.height - 30)
      ctx.font = 'italic 50px Times New Roman'
      ctx.textAlign = 'center'
      const str = "Error: " + this.errorMessage
      ctx.fillStyle = u.colorToString([0.4, 0, 0, u.map(this.errorTime, 0, 60, 0, 1, true)])
      ctx.fillText(str, 0, 0)
      ctx.fillStyle = u.colorToString([1, 1, 1, u.map(this.errorTime, 0, 60, 0, 1, true)])
      ctx.fillText(str, 4, -4)
      ctx.restore()
    }
  }
}
