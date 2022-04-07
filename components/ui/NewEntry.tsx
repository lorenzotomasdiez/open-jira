import { AddCircle, SaveOutlined } from '@mui/icons-material'
import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import { EntriesContext } from '../../context/entries'
import { UiContext } from '../../context/ui/UiContext'

export const NewEntry = () => {
    const {addNewEntry} = useContext(EntriesContext)
    const {isAddingEntry, setIsAddingEntry} = useContext(UiContext)
    const [inputValue, setInputValue] = useState('')
    const [touch, setTouch] = useState(false)

    const handleInputValue = (event:ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    
    const handleSave = () => {
        if(inputValue.length === 0) return
        addNewEntry(inputValue)
        setInputValue('')
        setTouch(false)
        setIsAddingEntry(false)
    }
    
  return (
    <Box sx={{marginBottom:2, padding: 1}}>
        {
            isAddingEntry
            ?
                (
                    <>
                        <TextField  
                        fullWidth
                        sx={{
                            marginTop: 2,
                            marginBottom: 1
                        }}
                        placeholder='New Entry'
                        autoFocus
                        multiline
                        label='New Entry'
                        helperText='Enter a value'
                        value={inputValue}
                        error={inputValue.length <= 0 && touch}
                        onChange={handleInputValue}
                        onBlur={()=>setTouch(true)}
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                color='secondary'
                                onClick={()=>{
                                    setIsAddingEntry(false)
                                    setTouch(false)
                                }}
                                >
                                Cancel
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveOutlined />}
                                onClick={handleSave}
                                >
                                Save
                            </Button>
                        </Box>
                    </>
                )
            :
                (
                    <Button
                    startIcon={<AddCircle />}
                    fullWidth
                    variant="outlined"
                    onClick={() => setIsAddingEntry(true)}
                    >
                        Add Task
                    </Button>
                )
        }
    </Box>
  )
}
