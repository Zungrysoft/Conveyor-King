export const data = {
    cratesRequired: 4,
    cameraDistance: 8,
    cameraPosition: [6, 2, 3],
    cameraStartAngle: [Math.PI*(3/4), Math.PI*(1/8)],
    floorHeight: -8,
    elements: [
        // Main Conveyor
        {
            type: 'conveyor',
            position: [0, 0, 3],
            direction: "east",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [1, 0, 3],
            direction: "east",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [2, 0, 3],
            direction: "east",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [3, 0, 3],
            direction: "east",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'block',
            position: [4, 0, 4],
        },

        // Lower Conveyor
        {
            type: 'conveyor',
            position: [3, 0, 0],
            direction: "east",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [4, 0, 0],
            direction: "east",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [5, 0, 0],
            direction: "east",
            color: 'green',
        },

        // Path to sort
        {
            type: 'conveyor',
            position: [6, 0, 0],
            direction: "east",
            color: 'green',
        },
        {
            type: 'conveyor',
            position: [7, 0, -1],
            direction: "east",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [8, 0, -1],
            direction: "east",
            color: 'red',
        },

        // Laser Tower
        {
            type: 'crate',
            position: [9, 0, 2],
        },
        {
            type: 'crate',
            position: [9, 0, 3],
        },
        {
            type: 'crate',
            position: [9, 0, 4],
        },
        {
            type: 'laser',
            position: [9, 0, 5],
            direction: "west",
            color: 'green',
        },

        // Shortener Laser
        {
            type: 'laser',
            position: [9, 5, 2],
            direction: "north",
            color: 'blue',
        },

        // Sort
        {
            type: 'block',
            position: [9, 0, 1],
        },
        {
            type: 'conveyor',
            position: [9, 0, -1],
            direction: "south",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [9, 1, -1],
            direction: "south",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [9, 2, -1],
            direction: "south",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [9, 3, -1],
            direction: "south",
            color: 'red',
        },
        {
            type: 'conveyor',
            position: [9, 4, -1],
            direction: "south",
            color: 'red',
        },
        {
            type: 'block',
            position: [9, 5, 0],
        },
        {
            type: 'block',
            position: [9, 5, 1],
        },

        // Chutes
        {
            type: 'chute',
            position: [9, 1, -2],
            direction: "west",
            letter: 'a',
        },
        {
            type: 'chute',
            position: [9, 2, -2],
            direction: "west",
            letter: 'b',
        },
        {
            type: 'chute',
            position: [9, 3, -2],
            direction: "west",
            letter: 'c',
        },
        {
            type: 'chute',
            position: [9, 4, -2],
            direction: "west",
            letter: 'd',
        },

        // Laser Platforms
        {
            type: 'block',
            position: [6, 1, -2],
        },
        {
            type: 'block',
            position: [6, 2, -2],
        },
        {
            type: 'block',
            position: [6, 3, -2],
        },
        {
            type: 'block',
            position: [6, 4, -2],
        },

        // Lasers
        {
            type: 'laser',
            position: [6, 1, -1],
            direction: "east",
            color: 'yellow',
        },
        {
            type: 'laser',
            position: [6, 2, -1],
            direction: "east",
            color: 'yellow',
        },
        {
            type: 'laser',
            position: [6, 3, -1],
            direction: "east",
            color: 'yellow',
        },
        {
            type: 'laser',
            position: [6, 4, -1],
            direction: "east",
            color: 'yellow',
        },

        // Crates
        {
            type: 'crate',
            position: [0, 0, 4],
            letter: 'd',
        },
        {
            type: 'crate',
            position: [0, 0, 5],
            letter: 'b',
        },
        {
            type: 'crate',
            position: [0, 0, 6],
            letter: 'c',
        },
        {
            type: 'crate',
            position: [0, 0, 7],
            letter: 'a',
        },

        // Leftmost Fan
        {
            type: 'block',
            position: [8, 0, 1],
        },
        {
            type: 'fan',
            position: [8, 0, 2],
            direction: "west",
            color: 'green',
        },

        // Deco scaffolding
        {
            type: 'scaffold',
            position: [0, 0, 2],
            direction: "east",
        },
        {
            type: 'scaffold',
            position: [1, 0, 2],
            direction: "east",
        },
        {
            type: 'scaffold',
            position: [1, 0, 1],
            direction: "east",
        },
        {
            type: 'scaffold',
            position: [1, 0, 0],
            direction: "east",
        },
    ],
}