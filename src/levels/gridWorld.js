export const data = {
    cratesRequired: 3,
    cameraDistance: 4.5,
    cameraPosition: [2.5, 1.5, -1],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(3/8)],
    floorHeight: -3,
    elements: [
        // Fan
        {
            type: 'fan',
            position: [0, 0, 1],
            color: 'green',
            direction: 'east',
        },

        // Helper Rotator
        {
            type: 'rotator',
            position: [-2, 1, 0],
            color: 'blue',
        },

        // Crate A
        {
            type: 'crate',
            position: [2, 2, 1],
            letter: 'a',
        },
        {
            type: 'block',
            position: [2, 2, 0],
        },
        {
            type: 'block',
            position: [2, 2, -1],
        },

        // Crate B
        {
            type: 'crate',
            position: [2, 3, 1],
            letter: 'b',
        },
        {
            type: 'block',
            position: [2, 3, 0],
        },
        {
            type: 'block',
            position: [2, 3, -1],
        },

        // Laser
        {
            type: 'laser',
            position: [3, 0, 1],
            color: 'red',
            direction: 'south',
        },
        {
            type: 'block',
            position: [3, 0, 0],
        },
        {
            type: 'block',
            position: [3, 0, -1],
        },
        {
            type: 'block',
            position: [3, 0, -2],
        },
        {
            type: 'block',
            position: [4, 0, -2],
        },

        // Lower Conveyors
        {
            type: 'conveyor',
            position: [3, 2, -1],
            color: 'red',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [4, 2, -1],
            color: 'red',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'chute',
            position: [5, 2, -1],
            letter: 'a',
        },

        {
            type: 'conveyor',
            position: [2, 4, -1],
            color: 'red',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [3, 4, -1],
            color: 'red',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [4, 4, -1],
            color: 'red',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'chute',
            position: [5, 4, -1],
            letter: 'b',
        },

        // C Crate
        {
            type: 'crate',
            position: [4, 3, 0],
            letter: 'c',
        },
        {
            type: 'block',
            position: [4, 3, -1],
        },
        {
            type: 'chute',
            position: [4, 3, -2],
            letter: 'c',
        },

        // Conveyors
        {
            type: 'conveyor',
            position: [0, 0, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [1, 0, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [2, 0, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },

        {
            type: 'conveyor',
            position: [0, 1, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [1, 1, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [2, 1, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },

        {
            type: 'conveyor',
            position: [0, 2, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },
        {
            type: 'conveyor',
            position: [1, 2, 0],
            color: 'green',
            direction: 'east',
			scaffold: true,
        },
        // {
        //     type: 'conveyor',
        //     position: [2, 2, 0],
        //     color: 'green',
        //     direction: 'east',
		// 	scaffold: true,
        // },

        // Rotators
        {
            type: 'rotator',
            position: [0, 0, -1],
            color: 'blue',
        },
        {
            type: 'rotator',
            position: [1, 0, -1],
            color: 'blue',
        },
        {
            type: 'rotator',
            position: [2, 0, -1],
            color: 'blue',
        },

        {
            type: 'rotator',
            position: [0, 1, -1],
            color: 'blue',
        },
        {
            type: 'rotator',
            position: [1, 1, -1],
            color: 'blue',
        },
        {
            type: 'rotator',
            position: [2, 1, -1],
            color: 'blue',
        },

        {
            type: 'rotator',
            position: [0, 2, -1],
            color: 'blue',
        },
        {
            type: 'rotator',
            position: [1, 2, -1],
            color: 'blue',
        },
        // {
        //     type: 'rotator',
        //     position: [2, 2, -1],
        //     color: 'blue',
        // },
    ],
}