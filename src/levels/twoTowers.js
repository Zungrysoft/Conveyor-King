export const data = {
    cratesRequired: 9,
    cameraDistance: 5,
    cameraPosition: [0, 0, 2],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(0/8)],
    floorHeight: -3,
    elements: [
        // Conveyor
        {
            type: 'conveyor',
            position: [-3, 0, 0],
            color: 'cyan',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [-2, 0, 0],
            color: 'cyan',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [-1, 0, 0],
            color: 'cyan',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [0, 0, 0],
            color: 'cyan',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [1, 0, 0],
            color: 'cyan',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [2, 0, 0],
            color: 'cyan',
            direction: "east",
        },

        // Side fan
        {
            type: 'fan',
            position: [3, 0, 2],
            color: 'yellow',
            direction: "west",
        },
        {
            type: 'block',
            position: [3, 0, 1],
        },

        // Back Fans
        {
            type: 'block',
            position: [-2, -1, 0],
        },
        {
            type: 'fan',
            position: [-2, -1, 1],
            color: 'red',
            direction: "south",
        },
        {
            type: 'block',
            position: [2, -1, 0],
        },
        {
            type: 'fan',
            position: [2, -1, 1],
            color: 'green',
            direction: "south",
        },

        // Chutes
        {
            type: 'chute',
            position: [-2, 1, 0],
            letter: 'a',
        },
        {
            type: 'chute',
            position: [2, 1, 0],
            letter: 'b',
        },

        // Left Stack
        {
            type: 'crate',
            position: [-2, 0, 1],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [-2, 0, 2],
            letter: 'b',
        },
        {
            type: 'crate',
            position: [-2, 0, 3],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [-2, 0, 4],
            letter: 'b',
        },

        // Right Stack
        {
            type: 'crate',
            position: [2, 0, 1],
            letter: 'b',
        },
        {
            type: 'crate',
            position: [2, 0, 2],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [2, 0, 3],
            letter: 'b',
        },
        {
            type: 'fan',
            position: [2, 0, 4],
            color: 'blue',
            direction: "west",
            scaffold: true,
        },
        {
            type: 'crate',
            position: [2, 0, 5],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [2, 0, 6],
            letter: 'b',
        },
    ],
}