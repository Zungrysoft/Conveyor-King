export const data = {
    cratesRequired: 2,
    cameraDistance: 4.4,
    cameraPosition: [2, 1, 2],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(2/8)],
    floorHeight: -3,
    elements: [
        // Main track
        {
            type: 'conveyor',
            position: [4, 0, 0],
            color: 'purple',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [4, 1, 0],
            color: 'purple',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [3, 1, 0],
            color: 'purple',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [2, 1, 0],
            color: 'purple',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [1, 1, 0],
            color: 'purple',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [0, 1, 0],
            color: 'purple',
            direction: 'north',
        },
        {
            type: 'conveyor',
            position: [0, 0, 0],
            color: 'purple',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [1, 0, 0],
            color: 'purple',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [2, 0, 0],
            color: 'purple',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [3, 0, 0],
            color: 'purple',
            direction: 'east',
        },

        // Crate path
        {
            type: 'crate',
            position: [5, 1, 4],
            letter: '',
        },
        {
            type: 'crate',
            position: [5, 0, 4],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [5, -1, 4],
            letter: '',
        },
        {
            type: 'crate',
            position: [5, -2, 4],
            letter: '',
        },
        {
            type: 'crate',
            position: [5, -3, 4],
            letter: 'a',
        },
        {
            type: 'conveyor',
            position: [5, 1, 3],
            color: 'cyan',
            direction: 'west',
            scaffold: true,
        },
        {
            type: 'scaffold',
            position: [5, 1, 2],
            direction: 'west',
        },
        {
            type: 'scaffold',
            position: [5, 1, 1],
            direction: 'west',
        },
        {
            type: 'scaffold',
            position: [5, 1, 0],
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [5, 0, 3],
            color: 'cyan',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [5, -1, 3],
            color: 'cyan',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [5, -2, 3],
            color: 'cyan',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [5, -3, 3],
            color: 'cyan',
            direction: 'south',
        },

        // Side fans
        {
            type: 'block',
            position: [-1, 0, 0],
        },
        {
            type: 'fan',
            position: [-1, 0, 1],
            direction: 'east',
            color: 'yellow',
            scaffold: true,
        },
        {
            type: 'fan',
            position: [-1, 0, 2],
            direction: 'east',
            color: 'yellow',
            scaffold: true,
        },
        {
            type: 'fan',
            position: [-1, 0, 3],
            direction: 'east',
            color: 'yellow',
            scaffold: true,
        },

        // Rear fan
        {
            type: 'block',
            position: [2, -1, 0],
        },
        {
            type: 'block',
            position: [2, -1, 1],
        },
        {
            type: 'fan',
            position: [2, -1, 2],
            direction: 'south',
            color: 'green',
        },

        // Paints
        {
            type: 'conveyor',
            position: [0, -1, 2],
            direction: 'south',
            color: 'white',
        },
        {
            type: 'conveyor',
            position: [4, -1, 2],
            direction: 'south',
            color: 'white',
        },
        {
            type: 'paint',
            position: [0, -1, 3],
            color: 'red',
        },
        {
            type: 'paint',
            position: [4, -1, 3],
            color: 'blue',
        },

        // Chute
        {
            type: 'conveyor',
            position: [2, 2, 0],
            direction: 'east',
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [3, 2, 0],
            direction: 'east',
            color: 'purple',
        },
        {
            type: 'chute',
            position: [4, 2, 0],
            letter: 'a',
        },

        // Red blocker laser
        {
            type: 'block',
            position: [5, 2, -1],
        },
        {
            type: 'laser',
            position: [5, 2, 0],
            direction: 'west',
            color: 'red',
        },

        // Blue blocker laser
        {
            type: 'block',
            position: [4, 3, -1],
        },
        {
            type: 'laser',
            position: [4, 3, 0],
            direction: 'north',
            color: 'blue',
        },
    ],
}