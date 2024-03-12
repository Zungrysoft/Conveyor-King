export const data = {
    cratesRequired: 2,
    cameraDistance: 4,
    cameraPosition: [0, 1, -0.4],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(1/8)],
    floorHeight: -5,
    elements: [
        // Layer -3
        {
            type: 'block',
            position: [-5, 0, -3],
        },
        {
            type: 'block',
            position: [-4, 0, -3],
        },
        {
            type: 'block',
            position: [-3, 0, -3],
        },
        {
            type: 'block',
            position: [-2, 0, -3],
        },
        {
            type: 'block',
            position: [-1, 0, -3],
        },
        {
            type: 'block',
            position: [0, 0, -3],
        },
        {
            type: 'block',
            position: [1, 0, -3],
        },
        {
            type: 'block',
            position: [2, 0, -3],
        },
        {
            type: 'block',
            position: [3, 0, -3],
        },
        {
            type: 'block',
            position: [4, 0, -3],
        },
        {
            type: 'block',
            position: [5, 0, -3],
        },

        // Layer -2
        {
            type: 'block',
            position: [-5, 0, -2],
        },
        {
            type: 'block',
            position: [-4, 0, -2],
        },
        {
            type: 'block',
            position: [-3, 0, -2],
        },
        {
            type: 'block',
            position: [-2, 0, -2],
        },
        {
            type: 'block',
            position: [-1, 0, -2],
        },
        {
            type: 'block',
            position: [0, 0, -2],
        },
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

        // Layer -1
        {
            type: 'block',
            position: [-5, 0, -1],
        },
        {
            type: 'block',
            position: [-4, 0, -1],
        },
        {
            type: 'block',
            position: [-3, 0, -1],
        },
        {
            type: 'block',
            position: [-2, 0, -1],
        },
        // {
        //     type: 'block',
        //     position: [-1, 0, -1],
        // },
        {
            type: 'block',
            position: [0, 0, -1],
        },
        {
            type: 'block',
            position: [1, 0, -1],
        },
        {
            type: 'block',
            position: [2, 0, -1],
        },
        {
            type: 'block',
            position: [3, 0, -1],
        },
        {
            type: 'block',
            position: [4, 0, -1],
        },
        {
            type: 'block',
            position: [5, 0, -1],
        },

        // Layer 0
        {
            type: 'block',
            position: [-5, 0, 0],
        },
        {
            type: 'block',
            position: [-4, 0, 0],
        },
        {
            type: 'block',
            position: [-2, 0, 0],
        },
        {
            type: 'block',
            position: [-1, 0, 0],
        },
        {
            type: 'block',
            position: [0, 0, 0],
        },
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
            position: [4, 0, 0],
        },
        {
            type: 'block',
            position: [5, 0, 0],
        },

        // Layer 1
        {
            type: 'block',
            position: [-5, 0, 1],
        },
        {
            type: 'block',
            position: [5, 0, 1],
        },

        // Mixing fans
        {
            type: 'fan',
            position: [-4, 0, 1],
            color: 'blue',
            direction: 'east',
        },
        {
            type: 'fan',
            position: [4, 0, 1],
            color: 'red',
            direction: 'west',
        },

        // Deployer fans
        {
            type: 'block',
            position: [3, -1, -1],
        },
        {
            type: 'block',
            position: [-3, -1, -1],
        },
        {
            type: 'fan',
            position: [3, -1, 0],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'fan',
            position: [-3, -1, 0],
            color: 'white',
            direction: 'south',
        },

        // Paint conveyors
        {
            type: 'conveyor',
            position: [-1, -1, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [-1, -2, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [-1, -3, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [0, -1, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [0, -2, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [0, -3, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [1, -1, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [1, -2, 1],
            color: 'white',
            direction: 'south',
        },
        {
            type: 'conveyor',
            position: [1, -3, 1],
            color: 'white',
            direction: 'south',
        },

        // Paints
        {
            type: 'paint',
            position: [0, -1, 2],
            color: 'blue',
        },
        {
            type: 'paint',
            position: [1, -2, 2],
            color: 'red',
        },
        {
            type: 'paint',
            position: [-1, -3, 2],
            color: 'yellow',
        },

        // Crate track
        {
            type: 'fan',
            position: [3, 1, -1],
            color: 'cyan',
            direction: 'west',
        },
        {
            type: 'fan',
            position: [2, 1, -2],
            color: 'green',
            direction: 'west',
        },
        {
            type: 'crate',
            position: [0, 1, -2],
            letter: 'a',
        },
        {
            type: 'crate',
            position: [0, 1, -1],
            letter: 'b',
        },
        {
            type: 'block',
            position: [3, 1, -2],
        },
        {
            type: 'block',
            position: [3, 1, -3],
        },
        {
            type: 'block',
            position: [2, 1, -3],
        },
        {
            type: 'block',
            position: [1, 1, -3],
        },
        {
            type: 'block',
            position: [0, 1, -3],
        },
        {
            type: 'block',
            position: [-1, 1, -3],
        },
        {
            type: 'chute',
            position: [-2, 1, -3],
            letter: 'a',
        },
        {
            type: 'block',
            position: [-3, 1, -3],
        },
        {
            type: 'laser',
            position: [-3, 1, -2],
            color: 'green',
            direction: 'east',
        },

        // Finale fan
        {
            type: 'fan',
            position: [-1, 0, -1],
            color: 'blue',
            direction: 'south',
        },
        {
            type: 'chute',
            position: [-1, 2, -3],
            letter: 'b',
        },
    ],
}