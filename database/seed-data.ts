
interface SeedData{
    entries: SeedEntry[]
}

interface SeedEntry{
    description: string;
    status: string;
    createdAt: number;
}


export const seedData: SeedData = {
    entries:[
        {
            description: 'PENDIENTE- Lorem ipsum dolor sit a in amet magnam obcaecati?',
            status:'pending',
            createdAt: Date.now()
        },
        {
            description: 'IN-PROGRESS- Lorem ipsum dolor sit a in amet magnam obcaecati?',
            status:'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'FINISHED- Lorem ipsum dolor sit a in amet magnam obcaecati?',
            status:'finished',
            createdAt: Date.now() - 1000
        }
    ]
}