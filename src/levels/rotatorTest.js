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
            position: [1, 0, 3],
            letter: 'a',
        },
        {
            type: 'fan',
            position: [1, 0, 1],
            color: 'orange',
            angle: 3,
        },
        {
            type: 'crate',
            position: [1, 0, 2],
            letter: 'd',
        },

        // Laser
        {
            type: 'rotator',
            position: [0, 3, 0],
            color: 'white',
            rotateDirection: 'cw',
        },
        {
            type: 'laser',
            position: [0, 3, 1],
            color: 'white',
            angle: 2,
        },
    ],
}