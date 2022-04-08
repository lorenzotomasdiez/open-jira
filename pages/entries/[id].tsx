import { Delete, Save } from '@mui/icons-material'
import { Button, capitalize,Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material'
import { GetServerSideProps } from 'next'
import { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { Layout } from '../../components/layouts'
import { EntriesContext } from '../../context/entries'
import { dbEntries } from '../../database'
import { Entry, EntryStatus } from '../../interfaces'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'] 


interface Props {
    entry: Entry
}

const EntryPage:FC<Props> = ({entry}) => {
  const {updateEntry} = useContext(EntriesContext)
  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)
  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])
  const onTextFieldChanged = (event:ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }
  const onStatusChanged = (event:ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value as EntryStatus);
  }
  const onSave = () => {
      if(inputValue.trim().length === 0)return;
      const updatedEntry:Entry = {
          ...entry,
          status,
          description:inputValue
      }
      updateEntry(updatedEntry)
  }
  return (
    <Layout title={`Card - ${entry.description}`}>
        <Grid
            container
            justifyContent="center"
            sx={{marginTop:2}}
        >
            <Grid item xs={12} sm={8} md={6}>
                <Card>
                    <CardHeader
                        title={`Entrada: ${inputValue}`}
                        subheader={`Creada hace: ... minutos`}
                    />
                    <CardContent>
                        <TextField 
                            sx={{marginTop:2, marginBottom:1}} 
                            fullWidth
                            placeholder="New Entry"
                            autoFocus
                            multiline
                            label="New Entry"
                            value={inputValue}
                            onChange={onTextFieldChanged}
                            helperText={isNotValid && 'Ingrese un valor'}
                            onBlur={()=> setTouched(true)}
                            error = { isNotValid}
                            onFocus={()=> setTouched(false)}
                        />
                        <FormControl>
                            <FormLabel>Status: </FormLabel>
                            <RadioGroup
                                row
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {
                                    validStatus.map(option => (
                                        <FormControlLabel 
                                            key={option} 
                                            value={option} 
                                            control={<Radio />} 
                                            label={capitalize(option)} 
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button
                            startIcon={<Save />}
                            variant="contained"
                            fullWidth
                            onClick={onSave}
                            disabled = {inputValue.length <= 0}
                        >
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        <IconButton 
            sx={{
                position:'fixed',
                bottom:30,
                right:30,
                backgroundColor:'text.secondary'
            }}
        >
            <Delete />
        </IconButton>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const {id} = ctx.params as {id: string}

    const entry = await dbEntries.getEntryById(id)

    if(!entry){
        return {
            redirect:{
                destination:'/',
                permanent: false
            }
        }
    }
    
    return {
        props: {
            entry
        }
    }
}


export default EntryPage