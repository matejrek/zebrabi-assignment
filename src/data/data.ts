
export interface NodeItem {
    id: string;
    name: string;
    value?: number;
    children?: NodeItem[];
    sumValue?: number;
    skip?: boolean;
    inverted?: boolean;
    depth?: number;
}

export const data: NodeItem[] = [
    {
        id: '1',
        name: 'Q3',
        children: [
            {
                id: '2',
                name: 'Jul',
                value: 113.4
            },
            {
                id: '3',
                name: 'Aug',
                value: 46.4
            },
            {
                id: '4',
                name: 'Sep',
                value: 42.7
            }
        ]
    },
    {
        id: '5',
        name: 'Q4',
        children: [
            {
                id: '6',
                name: 'Oct',
                value: 115.5
            },
            {
                id: '7',
                name: 'Nov',
                value: 24.8
            },
            {
                id: '8',
                name: 'Dec',
                value: 97.2
            }
        ]
    }
];