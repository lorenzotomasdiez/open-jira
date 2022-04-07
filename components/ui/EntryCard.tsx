import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { DragEvent, FC, useContext } from "react"
import { Entry } from "../../interfaces"
import { UiContext } from "../../context/ui/UiContext"

interface Prop{
    entry:Entry
}

export const EntryCard:FC<Prop> = ({entry}) => {
    const {startDraggin, stopDraggin} = useContext(UiContext)
  const onDragStart = (event:DragEvent) => {
      event.dataTransfer.setData('text', entry._id)
      //modificar el estado para inidicar que estoy haciendo drag
      startDraggin()
  }

  const onDragEnd = () => {
      stopDraggin()
  }
  return (
    <Card
        sx={{marginBottom:1}}
        draggable
        onDragStart={onDragStart}
        onDragEnd = {onDragEnd}
    >
        <CardActionArea>
            <CardContent>
                <Typography sx={{whiteSpace:'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight:2}}>
                <Typography variant="body2">{entry.createdAt}</Typography>
            </CardActions>
        </CardActionArea>
        
    </Card>
  )
}
