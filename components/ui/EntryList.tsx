import { List, Paper } from "@mui/material"
import { DragEvent, FC, useContext, useMemo } from "react"
import { EntryStatus } from "../../interfaces"
import { EntriesContext } from "../../context/entries"
import { EntryCard } from "./"
import { UiContext } from "../../context/ui/UiContext"
import styles from './EntryList.module.css'
interface Props{
  status: EntryStatus
}


export const EntryList:FC<Props> = ({status}) => {
  const {entries, updateEntry} = useContext(EntriesContext)
  const {isDraggin, stopDraggin} = useContext(UiContext)
  const entriesByStatus = useMemo(()=>entries.filter(entry => entry.status === status), [entries])
  
  const allowDrop = (event:DragEvent) => {
    event.preventDefault()
  }

  const onDrop = (event:DragEvent) => {
    const id = event.dataTransfer.getData('text')
    const entry = entries.find(entry => entry._id === id)!
    updateEntry({
      ...entry,
      status     
    })
    stopDraggin()
  }
  
  return (
    <div onDrop={onDrop} onDragOver={allowDrop} className={isDraggin ? styles.dragging : ''}>
        <Paper 
          sx={{
            height:'calc(100vh - 250px)', 
            backgroundColor:'transparent',
            padding: '1px 5px'
          }}
          >
            <List sx={{opacity: isDraggin ? 0.2 : 1, transition: 'all .4s'}}>
                {
                  entriesByStatus.map(entry =>(
                    <EntryCard key={entry._id} entry={entry} />
                  ))
                }
            </List>
        </Paper>
    </div>
  )
}
