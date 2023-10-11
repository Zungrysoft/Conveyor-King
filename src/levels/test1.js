export const data = {
    cratesRequired: 1,
    cameraDistance: 5,
    cameraPosition: [1, 1, 0],
    cameraStartAngle: [Math.PI*(2/4), Math.PI*(2/8)],
    floorHeight: -5,
    elements: [
        {
            type: 'crate',
            position: [2, 1, 0],
            letter: 'a',
            direction: "south",
        },
        {
            type: 'crate',
            position: [2, 1, 1],
            letter: 'd',
            direction: "south",
        },
        {
            type: 'crate',
            position: [2, 1, 2],
            letter: 'e',
            direction: "south",
        },
        {
            type: 'crate',
            position: [0, 3, 0],
            letter: 'b',
            direction: "south",
        },
        {
            type: 'crate',
            position: [0, 4, 0],
            letter: 'c',
            direction: "south",
        },
        {
            type: 'conveyor',
            position: [0, -1, -1],
            color: 'blue',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [1, -1, -1],
            color: 'blue',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [2, -1, -1],
            color: 'blue',
            direction: "east",
        },
        {
            type: 'conveyor',
            position: [3, -1, -1],
            color: 'blue',
            direction: "east",
        },
        {
            type: 'chute',
            position: [4, -1, -1],
            letter: 'c',
        },
        {
            type: 'block',
            position: [3, -1, 1],
        },
        {
            type: 'conveyor',
            position: [0, 0, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 1, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 2, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 3, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [0, 4, -1],
            color: 'blue',
            direction: "north",
        },
        {
            type: 'conveyor',
            position: [1, 1, -1],
            color: 'blue',
            direction: "west",
        },
        {
            type: 'conveyor',
            position: [2, 1, -1],
            color: 'blue',
            direction: "west",
        },
        {
            type: 'conveyor',
            position: [3, 1, -1],
            color: 'blue',
            direction: "west",
        },
        {
            type: 'block',
            position: [-3, 1, 0],
        },
        {
            type: 'fan',
            position: [-3, 1, 1],
            direction: "east",
            color: 'yellow',
        },
        {
            type: 'block',
            position: [4, 1, 0],
        },
    ],
}