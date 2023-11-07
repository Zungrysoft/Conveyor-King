export const data = {
    cratesRequired: 1,
    cameraDistance: 6,
    cameraPosition: [0, 2, 0],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(3/8)],
    floorHeight: -8,
    elements: [
        // Rear Conveyor
        {
            type: 'conveyor',
            position: [-1, 0, 0],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-2, 0, 0],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-3, 0, 0],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'block',
            position: [-1, 0, -1],
        },
        {
            type: 'block',
            position: [-2, 0, -1],
        },
        {
            type: 'block',
            position: [-3, 0, -1],
        },
        {
            type: 'block',
            position: [-4, 0, -1],
        },

        // Front Conveyor
        {
            type: 'conveyor',
            position: [-1, 4, 0],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-2, 4, 0],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-3, 4, 0],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-4, 4, 0],
            direction: "west",
            color: 'red',
            scaffold: true,
        },
        {
            type: 'block',
            position: [-1, 4, -1],
        },
        {
            type: 'block',
            position: [-2, 4, -1],
        },
        {
            type: 'block',
            position: [-3, 4, -1],
        },
        {
            type: 'block',
            position: [-4, 4, -1],
        },
        {
            type: 'block',
            position: [-5, 4, -1],
        },

        // Middle Conveyor
        {
            type: 'conveyor',
            position: [0, 2, 0],
            direction: "west",
            color: 'blue',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-1, 2, 0],
            direction: "west",
            color: 'blue',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-2, 2, 0],
            direction: "west",
            color: 'blue',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-3, 2, 0],
            direction: "west",
            color: 'blue',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-4, 2, 0],
            direction: "west",
            color: 'blue',
            scaffold: true,
        },
        {
            type: 'conveyor',
            position: [-5, 2, 0],
            direction: "west",
            color: 'blue',
            scaffold: true,
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
            type: 'block',
            position: [-2, 2, -1],
        },
        {
            type: 'block',
            position: [-3, 2, -1],
        },
        {
            type: 'block',
            position: [-4, 2, -1],
        },
        {
            type: 'block',
            position: [-5, 2, -1],
        },
        {
            type: 'block',
            position: [-6, 2, -1],
        },
        {
            type: 'chute',
            position: [-6, 2, 0],
            letter: 'a',
        },
        {
            type: 'block',
            position: [-2, 2, 1],
        },

        // Platform
        {
            type: 'block',
            position: [0, 0, 1],
        },
        {
            type: 'block',
            position: [1, 0, 1],
        },
        {
            type: 'block',
            position: [2, 0, 1],
        },
        {
            type: 'block',
            position: [3, 0, 1],
        },
        {
            type: 'block',
            position: [4, 0, 1],
        },

        {
            type: 'block',
            position: [0, 1, 1],
        },
        {
            type: 'block',
            position: [1, 1, 1],
        },
        {
            type: 'block',
            position: [2, 1, 1],
        },
        {
            type: 'block',
            position: [3, 1, 1],
        },
        {
            type: 'block',
            position: [4, 1, 1],
        },

        {
            type: 'block',
            position: [1, 2, 1],
        },
        {
            type: 'block',
            position: [2, 2, 1],
        },
        {
            type: 'block',
            position: [3, 2, 1],
        },
        {
            type: 'block',
            position: [4, 2, 1],
        },

        {
            type: 'block',
            position: [0, 3, 1],
        },
        {
            type: 'block',
            position: [1, 3, 1],
        },
        {
            type: 'block',
            position: [2, 3, 1],
        },
        {
            type: 'block',
            position: [3, 3, 1],
        },
        {
            type: 'block',
            position: [4, 3, 1],
        },

        {
            type: 'block',
            position: [0, 4, 1],
        },
        {
            type: 'block',
            position: [1, 4, 1],
        },
        {
            type: 'block',
            position: [2, 4, 1],
        },
        {
            type: 'block',
            position: [3, 4, 1],
        },
        {
            type: 'block',
            position: [4, 4, 1],
        },

        // Back fans
        {
            type: 'block',
            position: [5, 0, 1],
        },
        {
            type: 'block',
            position: [5, 4, 1],
        },
        {
            type: 'fan',
            position: [5, 0, 2],
            color: 'red',
            direction: 'west',
        },
        {
            type: 'fan',
            position: [5, 4, 2],
            color: 'red',
            direction: 'west',
        },
        {
            type: 'block',
            position: [5, 1, 2],
        },
        {
            type: 'block',
            position: [5, 2, 2],
        },
        {
            type: 'block',
            position: [5, 3, 2],
        },

        // Side fans
        {
            type: 'fan',
            position: [5, -1, 2],
            color: 'yellow',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [0, -1, 1],
            color: 'green',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [1, -1, 1],
            color: 'green',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [2, -1, 1],
            color: 'green',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [3, -1, 1],
            color: 'green',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [4, -1, 1],
            color: 'green',
            direction: 'west',
        },
        {
            type: 'conveyor',
            position: [5, -1, 1],
            color: 'green',
            direction: 'west',
        },

        {
            type: 'fan',
            position: [0, 5, 2],
            color: 'yellow',
            direction: 'north',
        },
        {
            type: 'conveyor',
            position: [0, 5, 1],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [1, 5, 1],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [2, 5, 1],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [3, 5, 1],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [4, 5, 1],
            color: 'green',
            direction: 'east',
        },
        {
            type: 'conveyor',
            position: [5, 5, 1],
            color: 'green',
            direction: 'east',
        },

        // Cargo
        {
            type: 'crate',
            position: [3, 2, 2],
            letter: 'a',
        },
        {
            type: 'laser',
            position: [3, 1, 2],
            color: 'blue',
            direction: 'south',
        },
        {
            type: 'laser',
            position: [2, 3, 2],
            color: 'blue',
            direction: 'north',
        },
        {
            type: 'fan',
            position: [2, 2, 2],
            color: 'cyan',
            direction: 'east',
        },
    ],
}