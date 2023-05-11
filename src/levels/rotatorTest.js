export const data = {
    cratesRequired: 1,
    cratesDelivered: 0,
    cameraDistance: 5,
    cameraPosition: [0, 0, 0],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(2/8)],
    floorHeight: -3,
    elements: [
        // Rotator
        {
            type: 'rotator',
            position: [0, 0, 0],
            color: 'blue',
            rotateDirection: 'cw',
        },

        // Crate
        {
            type: 'crate',
            position: [0, 0, 1],
            letter: 'a',
        },

        // Rotator
        {
            type: 'rotator',
            position: [1, 0, 0],
            color: 'blue',
            rotateDirection: 'ccw',
        },

        // Crate
        {
            type: 'crate',
            position: [1, 0, 2],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [1, 0, 1],
            letter: 'd',
        },
    ],
}