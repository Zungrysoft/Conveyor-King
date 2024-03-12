export const data = {
    cratesRequired: 1,
    cameraDistance: 4,
    cameraPosition: [0, 0, 0],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(2/8)],
    floorHeight: -3,
    elements: [
        // Main Conveyor
        {
            type: 'conveyor',
            position: [-3, 0, 0],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [-2, 0, 0],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [-1, 0, 0],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [0, 0, 0],
            color: 'red',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [1, 0, 0],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [2, 0, 0],
            color: 'green',
            direction: 'east',
        },


        // Upper Conveyor
        {
            type: 'conveyor',
            position: [-2, -1, 2],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [-1, -1, 2],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [0, -1, 2],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [1, -1, 2],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [2, -1, 2],
            color: 'white',
            direction: 'south',
        },

        // Fan & Pillars
        {
            type: 'fan',
            position: [3, -1, 3],
            color: 'blue',
            direction: 'west',
        },
        {
            type: 'block',
            position: [3, -1, 2],
        },
        {
            type: 'block',
            position: [3, -1, 1],
        },
        {
            type: 'block',
            position: [3, -1, 0],
        },
        {
            type: 'block',
            position: [-3, -1, 2],
        },
        {
            type: 'block',
            position: [-3, -1, 1],
        },
        {
            type: 'block',
            position: [-3, -1, 0],
        },

        // Paint
        {
            type: 'paint',
            position: [2, -1, 3],
            color: 'blue',
        },

        // Crate
        {
            type: 'crate',
            position: [-3, 0, 1],
            letter: 'a',
        },

        // Chute & Laser
        {
            type: 'chute',
            position: [3, 0, 0],
            letter: 'a',
        },
        {
            type: 'block',
            position: [3, 2, -1],
        },
        {
            type: 'laser',
            position: [3, 2, 0],
            color: 'red',
            direction: 'north',
        },
    ],
}