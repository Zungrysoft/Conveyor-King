export const data = {
    cratesRequired: 2,
    cameraDistance: 5,
    cameraPosition: [0, 1, 1],
    cameraStartAngle: [Math.PI*(3/4), Math.PI*(1/8)],
    floorHeight: -3,
    elements: [
        // Rotator
        {
            type: 'rotator',
            position: [0, 0, -1],
            color: 'blue',
            rotateDirection: 'cw',
        },
        {
            type: 'conveyor',
            position: [0, 0, 0],
            direction: 'south',
            color: 'red',
            scaffold: true,
        },

        // Left Conveyor
        {
            type: 'conveyor',
            position: [-1, 0, 0],
            direction: 'east',
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [-2, 0, 0],
            direction: 'east',
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [-2, -1, 2],
            direction: 'south',
            color: 'cyan',
        },
        {
            type: 'conveyor',
            position: [-2, -2, 2],
            direction: 'south',
            color: 'cyan',
        },
        {
            type: 'conveyor',
            position: [-2, -3, 2],
            direction: 'south',
            color: 'cyan',
        },
        {
            type: 'crate',
            position: [-2, -1, 3],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [-2, -2, 3],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [-2, -3, 3],
            letter: 'a',
        },

        // Right Conveyor
        {
            type: 'conveyor',
            position: [1, 0, 0],
            direction: 'west',
            color: 'blue',
        },
        {
            type: 'conveyor',
            position: [1, -1, 2],
            direction: 'south',
            color: 'cyan',
        },
        {
            type: 'conveyor',
            position: [1, -2, 2],
            direction: 'south',
            color: 'cyan',
        },
        {
            type: 'conveyor',
            position: [1, -3, 2],
            direction: 'south',
            color: 'cyan',
        },
        {
            type: 'fan',
            position: [1, -3, 3],
            direction: 'west',
            color: 'green',
        },
        {
            type: 'crate',
            position: [1, -1, 3],
            letter: 'b',
        },

        // Path
        {
            type: 'conveyor',
            position: [0, 1, 0],
            direction: 'south',
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [0, 2, 0],
            direction: 'west',
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [-1, 2, 0],
            direction: 'north',
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [-1, 1, -1],
            direction: 'west',
            color: 'blue',
        },

        // Chutes
        {
            type: 'chute',
            position: [-2, 1, -1],
            letter: 'a',
        },
        {
            type: 'chute',
            position: [-1, -1, 1],
            letter: 'b',
        },
    ],
}