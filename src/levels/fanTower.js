export const data = {
    cratesRequired: 2,
    cameraDistance: 4.5,
    cameraPosition: [0, -1, 1],
    cameraStartAngle: [Math.PI*(5/4), Math.PI*(1/8)],
    floorHeight: -3,
    elements: [
        // Rotator
        {
            type: 'rotator',
            position: [0, 0, 0],
            color: 'green',
            rotateDirection: 'cw',
        },
        {
            type: 'conveyor',
            position: [0, 0, 1],
            direction: 'east',
            color: 'yellow',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [0, -1, 1],
            direction: 'south',
            color: 'yellow',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [0, -2, 1],
            direction: 'south',
            color: 'yellow',
            scaffold: true,
        },
        {
            type: 'fan',
            position: [0, -2, 2],
            direction: 'south',
            color: 'blue',
            scaffold: true,
        },
        {
            type: 'fan',
            position: [0, -2, 3],
            direction: 'south',
            color: 'blue',
            scaffold: true,
        },
        {
            type: 'fan',
            position: [0, -2, 4],
            direction: 'south',
            color: 'blue',
            scaffold: true,
        },

        // Laser
        {
            type: 'rotator',
            position: [-3, 0, 0],
            color: 'green',
            rotateDirection: 'ccw',
        },
        {
            type: 'block',
            position: [-4, 0, 0],
        },
        {
            type: 'rotator',
            position: [-5, 0, 0],
            color: 'green',
            rotateDirection: 'ccw',
        },
        {
            type: 'laser',
            position: [-3, 0, 1],
            color: 'green',
            direction: 'north',
        },

        // Blockers
        {
            type: 'block',
            position: [-1, 0, 3],
        },
        {
            type: 'block',
            position: [1, 0, 3],
        },

        // Landings
        {
            type: 'block',
            position: [-1, 0, 0],
        },
        {
            type: 'block',
            position: [1, 0, 0],
        },
        {
            type: 'block',
            position: [-1, 0, -1],
        },
        {
            type: 'block',
            position: [0, 0, -1],
        },
        {
            type: 'block',
            position: [1, 0, -1],
        },
        {
            type: 'block',
            position: [0, -1, 0],
        },
        {
            type: 'block',
            position: [0, -2, 0],
        },

        // Chutes
        {
            type: 'block',
            position: [0, -3, 0],
        },
        {
            type: 'block',
            position: [1, -3, 0],
        },
        {
            type: 'block',
            position: [-1, -3, 0],
        },
        {
            type: 'chute',
            position: [-1, -4, 0],
            letter: 'a',
        },
        {
            type: 'chute',
            position: [1, -4, 0],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [-1, -3, 1],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [1, -3, 1],
            letter: 'a',
        },
    ],
}