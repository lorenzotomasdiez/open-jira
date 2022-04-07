import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database'
import { EntryModel, IEntry } from '../../../../models'

type Data = 
| {message: string}
| IEntry
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    /* const {id} = req.query
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).json({message: 'El id no es valido ' + id})
    } */

    switch(req.method){
        case 'GET':
            return getEntry(req, res)
        case 'PUT':
            return updateEntry(req, res)
        default:
            return res.status(400).json({message: 'El id no es valido '})
    }
}


const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query
    await db.connect()

    const entryToUpdate = await EntryModel.findById(id)

    if(!entryToUpdate){
        await db.disconnect()
        return res.status(400).json({message: 'El id no es valido'})
    }

    const {description = entryToUpdate.description, status = entryToUpdate.status} = req.body

    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(id, {description, status}, {runValidators:true, new:true})
        await db.disconnect()
        res.status(200).json(updatedEntry!) 
        
    } catch (error: any) {
        await db.disconnect()
        res.status(400).json({
            message: error.errors.status.message
        })
        
    }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query
    await db.connect()
    const entry = await EntryModel.findById(id)
    if(!entry){
        await db.disconnect()
        return res.status(400).json({message:'El id no es valido'})
    }

    db.disconnect()
    return res.status(200).json(entry)
}