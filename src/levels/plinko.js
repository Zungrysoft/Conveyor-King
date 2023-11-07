export const data = {
    cratesRequired: 5,
    cameraDistance: 8,
    cameraPosition: [1.5, 2, 6],
    cameraStartAngle: [Math.PI*(4/4), Math.PI*(1/8)],
    floorHeight: -3,
    elements: [
        // Crate Queue
        {
            type: 'conveyor',
            position: [4, 4, 10],
            direction: "north",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [4, 3, 10],
            direction: "north",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [4, 2, 10],
            direction: "north",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [4, 1, 10],
            direction: "north",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [4, 0, 10],
            direction: "west",
            color: 'red',
        },

        // Crates
        {
            type: 'crate',
            position: [4, 4, 11],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [4, 3, 11],
            letter: 'b',
        },
        {
            type: 'crate',
            position: [4, 2, 11],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [4, 1, 11],
            letter: 'b',
        },
        {
            type: 'crate',
            position: [4, 0, 11],
            letter: 'a',
        },

        // Crate Board
        {
            type: 'conveyor',
            position: [0, 0, 10],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [1, 0, 10],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [2, 0, 10],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [3, 0, 10],
            direction: "west",
            color: 'red',
            scaffold: true,
        },

        {
            type: 'conveyor',
            position: [0, 0, 8],
            direction: "east",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [1, 0, 8],
            direction: "east",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [2, 0, 8],
            direction: "east",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [3, 0, 8],
            direction: "east",
            color: 'red',
            scaffold: true,
        },

        {
            type: 'conveyor',
            position: [0, 0, 6],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [1, 0, 6],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [2, 0, 6],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [3, 0, 6],
            direction: "west",
            color: 'red',
            scaffold: true,
        },

        {
            type: 'conveyor',
            position: [0, 0, 4],
            direction: "east",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [1, 0, 4],
            direction: "east",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [2, 0, 4],
            direction: "east",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [3, 0, 4],
            direction: "east",
            color: 'red',
        },

        // Chutes
        {
            type: 'chute',
            position: [-1, 0, 4],
            direction: "south",
            letter: 'a',
        },
        {
            type: 'chute',
            position: [4, 0, 4],
            direction: "south",
            letter: 'b',
        },

        // Laser Board
        {
            type: 'conveyor',
            position: [0, 4, 9],
            direction: "west",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [1, 4, 9],
            direction: "west",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [2, 4, 9],
            direction: "west",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [3, 4, 9],
            direction: "west",
            color: 'green',
        },

        {
            type: 'conveyor',
            position: [-1, 4, 7],
            direction: "east",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [0, 4, 7],
            direction: "east",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [1, 4, 7],
            direction: "east",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [2, 4, 7],
            direction: "east",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [3, 4, 7],
            direction: "east",
            color: 'green',
        },

        {
            type: 'conveyor',
            position: [0, 4, 5],
            direction: "west",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [1, 4, 5],
            direction: "west",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [2, 4, 5],
            direction: "west",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [3, 4, 5],
            direction: "west",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [4, 4, 5],
            direction: "west",
            color: 'green',
        },

        // Laser
        {
            type: 'laser',
            position: [3, 4, 10],
            direction: "north",
            color: 'blue',
        },
    ],
}