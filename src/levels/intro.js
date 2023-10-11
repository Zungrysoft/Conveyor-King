export const data = {
    cratesRequired: 2,
    cameraDistance: 3,
    cameraPosition: [0, 0, 0],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(2/8)],
    floorHeight: -3,
    elements: [
        // Red Conveyors
        {
            type: 'conveyor',
            position: [-1, 0, 0],
            color: 'red',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [-2, 0, 0],
            color: 'red',
            direction: 'east',
        },

        // Green Conveyors
        {
            type: 'conveyor',
            position: [1, 0, 0],
            color: 'green',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [2, 0, 0],
            color: 'green',
            direction: 'west',
        },

        // Chute
        {
            type: 'chute',
            position: [0, 0, 0],
            letter: 'a',
        },

        // Crates
        {
            type: 'crate',
            position: [2, 0, 1],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [-2, 0, 1],
            letter: 'a',
        },
    ],
}