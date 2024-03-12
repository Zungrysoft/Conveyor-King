export const data = {
    cratesRequired: 2,
    cameraDistance: 4,
    cameraPosition: [2.5, 1, 1],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(2/8)],
    floorHeight: -5,
    elements: [
        // Right fan
        {
            type: 'block',
            position: [6, -1, 1],
        },
        {
            type: 'fan',
            position: [6, -1, 2],
            color: 'brown',
            direction: 'south',
        },

        // Chute
        {
            type: 'fan',
            position: [6, 2, 1],
            color: 'brown',
            direction: 'west',
        },
        {
            type: 'fan',
            position: [5, 2, 0],
            color: 'cyan',
            direction: 'west',
        },
        {
            type: 'block',
            position: [6, 2, 0],
        },
        {
            type: 'block',
            position: [6, 2, -1],
        },
        {
            type: 'block',
            position: [5, 2, -1],
        },
        {
            type: 'block',
            position: [4, 2, -1],
        },
        {
            type: 'block',
            position: [3, 2, -1],
        },
        {
            type: 'block',
            position: [2, 2, -1],
        },
        {
            type: 'block',
            position: [1, 2, -1],
        },
        {
            type: 'block',
            position: [0, 2, -1],
        },
        {
            type: 'block',
            position: [-1, 2, -1],
        },
        {
            type: 'chute',
            position: [-2, 2, -1],
            letter: 'a',
        },
        {
            type: 'chute',
            position: [-1, 3, -1],
            letter: 'b',
        },
        {
            type: 'block',
            position: [-1, 1, -1],
        },
        {
            type: 'block',
            position: [-1, 1, 0],
        },
        {
            type: 'fan',
            position: [-1, 1, 1],
            color: 'brown',
            direction: 'south',
        },

        // Crates
        {
            type: 'crate',
            position: [2, 2, 0],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [2, 2, 1],
            letter: 'b',
        },

        // Carrier crate
        {
            type: 'crate',
            position: [0, 0, 1],
            letter: '',
        },

        // Main loop
        {
            type: 'conveyor',
            position: [0, 0, 0],
            color: 'white',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [1, 0, 0],
            color: 'white',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [2, 0, 0],
            color: 'white',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [3, 0, 0],
            color: 'white',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [4, 0, 0],
            color: 'white',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [5, 0, 0],
            color: 'white',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [6, 0, 0],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [6, 1, 0],
            color: 'white',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [5, 1, 0],
            color: 'white',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [4, 1, 0],
            color: 'white',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [3, 1, 0],
            color: 'white',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [2, 1, 0],
            color: 'white',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [1, 1, 0],
            color: 'white',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [0, 1, 0],
            color: 'white',
            direction: 'north',
        },

        // Red Paint
        {
            type: 'conveyor',
            position: [1, -1, 2],
            color: 'red',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [1, -2, 2],
            color: 'red',
            direction: 'south',
        },
        {
            type: 'paint',
            position: [1, -1, 3],
            color: 'red',
        },
        {
            type: 'paint',
            position: [1, -2, 3],
            color: 'red',
        },

        // Yellow Paint
        {
            type: 'conveyor',
            position: [2, -1, 2],
            color: 'yellow',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [2, -2, 2],
            color: 'yellow',
            direction: 'south',
        },
        {
            type: 'paint',
            position: [2, -1, 3],
            color: 'yellow',
        },
        {
            type: 'paint',
            position: [2, -2, 3],
            color: 'yellow',
        },

        // Blue Paint
        {
            type: 'conveyor',
            position: [3, -1, 2],
            color: 'blue',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [3, -2, 2],
            color: 'blue',
            direction: 'south',
        },
        {
            type: 'paint',
            position: [3, -1, 3],
            color: 'blue',
        },
        {
            type: 'paint',
            position: [3, -2, 3],
            color: 'blue',
        },
    ],
}