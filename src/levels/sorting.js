export const data = {
    cratesRequired: 5,
    cameraDistance: 5,
    cameraPosition: [1, 0, 0],
    cameraStartAngle: [Math.PI*(6/4), Math.PI*(2/8)],
    floorHeight: -5,
    elements: [
        // Main Conveyor
        {
            type: 'conveyor',
            position: [0, 0, -1],
            color: 'red',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 1, -1],
            color: 'red',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 2, -1],
            color: 'green',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 3, -1],
            color: 'green',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 4, -1],
            color: 'green',
            direction: "north",
        },

        // Side Conveyor
        {
            type: 'conveyor',
            position: [1, 1, -1],
            color: 'red',
            direction: "west",
        },
        {
            type: 'conveyor',
            position: [2, 1, -1],
            color: 'red',
            direction: "west",
        },
        {
            type: 'conveyor',
            position: [3, 1, -1],
            color: 'red',
            direction: "west",
        },

        // Side Fan
        // {
        //     type: 'block',
        //     position: [-3, 1, 0],
        // },
        {
            type: 'fan',
            position: [4, 1, 1],
            direction: "west",
            color: 'green',
        },

        // End Conveyor
        {
            type: 'conveyor',
            position: [0, -1, -2],
            color: 'red',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [1, -1, -2],
            color: 'red',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [2, -1, -2],
            color: 'red',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [3, -1, -2],
            color: 'red',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [4, -1, -2],
            color: 'red',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [5, -1, -2],
            color: 'red',
            direction: "east",
        },

        // End Platforms
        {
            type: 'block',
            position: [1, 0, -2],
        },
        {
            type: 'block',
            position: [2, 0, -2],
        },
        {
            type: 'block',
            position: [3, 0, -2],
        },
        {
            type: 'block',
            position: [4, 0, -2],
        },
        {
            type: 'block',
            position: [5, 0, -2],
        },

        // End Fans
        {
            type: 'fan',
            position: [1, 0, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'fan',
            position: [2, 0, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'fan',
            position: [3, 0, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'fan',
            position: [4, 0, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'fan',
            position: [5, 0, -1],
            color: 'blue',
            direction: "north",
        },

        // End Chutes
        {
            type: 'chute',
            position: [1, -2, -2],
            letter: 'e',
            direction: "north",
        },
        {
            type: 'chute',
            position: [2, -2, -2],
            letter: 'd',
            direction: "north",
        },
        {
            type: 'chute',
            position: [3, -2, -2],
            letter: 'c',
            direction: "north",
        },
        {
            type: 'chute',
            position: [4, -2, -2],
            letter: 'b',
            direction: "north",
        },
        {
            type: 'chute',
            position: [5, -2, -2],
            letter: 'a',
            direction: "north",
        },

        // Crates
        {
            type: 'crate',
            position: [0, 3, 0],
            letter: 'b',
            direction: "north",
        },
        {
            type: 'crate',
            position: [0, 4, 0],
            letter: 'c',
            direction: "north",
        },
        {
            type: 'crate',
            position: [3, 1, 0],
            letter: 'e',
            direction: "north",
        },
        {
            type: 'crate',
            position: [3, 1, 1],
            letter: 'a',
            direction: "north",
        },
        {
            type: 'crate',
            position: [3, 1, 2],
            letter: 'd',
            direction: "north",
        },

        // Misc blocks
        {
            type: 'block',
            position: [4, 1, 0],
        },
        {
            type: 'block',
            position: [6, -1, -1],
        },
        {
            type: 'block',
            position: [0, -1, 1],
        },
    ],
}