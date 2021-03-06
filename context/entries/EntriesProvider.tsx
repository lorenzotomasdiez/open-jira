import { FC, useEffect, useReducer } from "react";
import { Entry } from "../../interfaces";
import { EntriesContext, entriesReducer } from "./";
import { entriesApi } from "../../apis";
import { IEntry } from "../../models";
import { useSnackbar } from "notistack";

export interface EntriesState {
    entries:Entry[]
}

const Entries_INITIAL_STATE:EntriesState = {
    entries:[]
}

export const EntriesProvider:FC = ({children}) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const {enqueueSnackbar} = useSnackbar()
    const addNewEntry = async(description: string) => {
        const {data} = await entriesApi.post<IEntry>('/entries', {description})
        dispatch({type:'[Entry] - Add-Entry', payload:data})
    }
    
    const updateEntry = async(entry: Entry) => {
        try {
            const {data} = await entriesApi.put<IEntry>(`/entries/${entry._id}`, {description: entry.description, status: entry.status})
            dispatch({type:'[Entry] - Update-Entry', payload:data})
            enqueueSnackbar('Entrada actualizada',{
                variant:'success',
                autoHideDuration:1500,
                anchorOrigin:{
                    vertical:'top',
                    horizontal:'right'
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({type:'[Entry] - Refresh-Data', payload:data})    
    }
    
    useEffect(() => {
      refreshEntries()
    }, [])
    
    return (
        <EntriesContext.Provider value={{
            ...state,

            //Methods
            addNewEntry,
            updateEntry
        }}
        >
            {children}
        </EntriesContext.Provider>
    )
}