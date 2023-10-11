export const data = {
    cratesRequired: 2,
    cameraDistance: 8,
    cameraPosition: [0, 0, 1],
    cameraStartAngle: [Math.PI*(6/4), Math.PI*(3/8)],
    floorHeight: -3,
    elements: [
        // Right Laser
        {
            type: 'block',
            position: [2, -3, 0],
        },
        {
            type: 'block',
            position: [2, -4, 0],
        },
        {
            type: 'block',
            position: [2, -5, 0],
        },
        {
            type: 'block',
            position: [2, -6, -1],
        },
        {
            type: 'laser',
            position: [2, -6, 0],
            direction: "south",
            color: 'red',
        },

        // Left Laser
        {
            type: 'block',
            position: [-2, -3, 0],
        },
        {
            type: 'block',
            position: [-2, -4, 0],
        },
        {
            type: 'block',
            position: [-2, -5, 0],
        },
        {
            type: 'block',
            position: [-2, -6, -1],
        },
        {
            type: 'laser',
            position: [-2, -6, 0],
            direction: "south",
            color: 'yellow',
        },

        // Right Chute
        {
            type: 'chute',
            position: [2, -2, 0],
            direction: "north",
            letter: 'a',
        },
        {
            type: 'conveyor',
            position: [1, -2, 0],
            direction: "east",
            color: 'blue',
        },
        {
            type: 'conveyor',
            position: [3, -2, 0],
            direction: "west",
            color: 'blue',
        },
        {
            type: 'block',
            position: [1, -1, 0],
        },
        {
            type: 'block',
            position: [3, -1, 0],
        },

        // Left Chute
        {
            type: 'conveyor',
            position: [-3, -2, 0],
            direction: "east",
            color: 'blue',
        },
        {
            type: 'block',
            position: [-2, -1, 0],
        },

        // Right Platform
        {
            type: 'block',
            position: [1, 0, 0],
        },
        {
            type: 'block',
            position: [2, 0, 0],
        },
        {
            type: 'block',
            position: [3, 0, 0],
        },

        {
            type: 'block',
            position: [1, 1, 0],
        },
        // {
        //     type: 'block',
        //     position: [2, 1, 0],
        // },
        {
            type: 'block',
            position: [3, 1, 0],
        },

        {
            type: 'block',
            position: [0, 2, 0],
        },
        {
            type: 'block',
            position: [1, 2, 0],
        },
        {
            type: 'block',
            position: [2, 2, 0],
        },
        {
            type: 'block',
            position: [3, 2, 0],
        },

        {
            type: 'block',
            position: [0, 3, 0],
        },
        // {
        //     type: 'block',
        //     position: [1, 3, 0],
        // },
        // {
        //     type: 'block',
        //     position: [2, 3, 0],
        // },
        {
            type: 'block',
            position: [3, 3, 0],
        },

        {
            type: 'block',
            position: [0, 4, 0],
        },
        {
            type: 'block',
            position: [1, 4, 0],
        },
        {
            type: 'block',
            position: [2, 4, 0],
        },
        {
            type: 'block',
            position: [3, 4, 0],
        },

        // Left Platform
        {
            type: 'block',
            position: [-1, 0, 0],
        },
        {
            type: 'block',
            position: [-2, 0, 0],
        },
        {
            type: 'block',
            position: [-3, 0, 0],
        },

        {
            type: 'block',
            position: [-1, 1, 0],
        },
        {
            type: 'block',
            position: [-2, 1, 0],
        },
        {
            type: 'block',
            position: [-3, 1, 0],
        },

        {
            type: 'block',
            position: [-1, 2, 0],
        },
        {
            type: 'block',
            position: [-2, 2, 0],
        },
        {
            type: 'block',
            position: [-3, 2, 0],
        },

        {
            type: 'block',
            position: [-1, 3, 0],
        },
        {
            type: 'block',
            position: [-2, 3, 0],
        },
        {
            type: 'block',
            position: [-3, 3, 0],
        },

        {
            type: 'block',
            position: [-1, 4, 0],
        },
        {
            type: 'block',
            position: [-2, 4, 0],
        },
        {
            type: 'block',
            position: [-3, 4, 0],
        },

        {
            type: 'block',
            position: [-1, 5, 0],
        },
        {
            type: 'block',
            position: [-2, 5, 0],
        },
        {
            type: 'block',
            position: [-3, 5, 0],
        },

        // Right Fans
        {
            type: 'fan',
            position: [5, 0, 1],
            direction: "west",
            color: 'yellow',
        },
        {
            type: 'block',
            position: [5, 0, 0],
        },
        {
            type: 'block',
            position: [6, 0, 1],
        },
        {
            type: 'block',
            position: [6, 0, 0],
        },

        {
            type: 'fan',
            position: [5, 2, 1],
            direction: "west",
            color: 'yellow',
        },
        {
            type: 'block',
            position: [5, 2, 0],
        },
        {
            type: 'block',
            position: [6, 2, 1],
        },
        {
            type: 'block',
            position: [6, 2, 0],
        },

        {
            type: 'fan',
            position: [5, 4, 1],
            direction: "west",
            color: 'yellow',
        },
        {
            type: 'block',
            position: [5, 4, 0],
        },
        {
            type: 'block',
            position: [6, 4, 1],
        },
        {
            type: 'block',
            position: [6, 4, 0],
        },

        // Left Fans
        {
            type: 'fan',
            position: [-5, 0, 1],
            direction: "east",
            color: 'red',
        },
        {
            type: 'block',
            position: [-5, 0, 0],
        },
        {
            type: 'block',
            position: [-6, 0, 1],
        },
        {
            type: 'block',
            position: [-6, 0, 0],
        },

        {
            type: 'fan',
            position: [-5, 2, 1],
            direction: "east",
            color: 'red',
        },
        {
            type: 'block',
            position: [-5, 2, 0],
        },
        {
            type: 'block',
            position: [-6, 2, 1],
        },
        {
            type: 'block',
            position: [-6, 2, 0],
        },

        {
            type: 'fan',
            position: [-5, 4, 1],
            direction: "east",
            color: 'red',
        },
        {
            type: 'block',
            position: [-5, 4, 0],
        },
        {
            type: 'block',
            position: [-6, 4, 1],
        },
        {
            type: 'block',
            position: [-6, 4, 0],
        },

        // Rear Fans Left

        {
            type: 'fan',
            position: [0, 7, 1],
            direction: "north",
            color: 'green',
        },
        {
            type: 'block',
            position: [0, 7, 0],
        },

        {
            type: 'fan',
            position: [1, 7, 1],
            direction: "north",
            color: 'green',
        },
        {
            type: 'block',
            position: [1, 7, 0],
        },

        {
            type: 'fan',
            position: [2, 7, 1],
            direction: "north",
            color: 'green',
        },
        {
            type: 'block',
            position: [2, 7, 0],
        },

        {
            type: 'fan',
            position: [3, 7, 1],
            direction: "north",
            color: 'green',
        },
        {
            type: 'block',
            position: [3, 7, 0],
        },

        // Rear Fans Right

        {
            type: 'fan',
            position: [-1, 7, 1],
            direction: "north",
            color: 'blue',
        },
        {
            type: 'block',
            position: [-1, 7, 0],
        },

        {
            type: 'fan',
            position: [-2, 7, 1],
            direction: "north",
            color: 'blue',
        },
        {
            type: 'block',
            position: [-2, 7, 0],
        },

        {
            type: 'fan',
            position: [-3, 7, 1],
            direction: "north",
            color: 'blue',
        },
        {
            type: 'block',
            position: [-3, 7, 0],
        },

        // Crates
        {
            type: 'crate',
            position: [-2, 5, 1],
            direction: "north",
            letter: 'b',
        },
        {
            type: 'crate',
            position: [1, 4, 1],
            direction: "north",
            letter: 'a',
        },
    ],
}