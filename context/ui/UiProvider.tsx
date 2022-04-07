import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";
export interface UIState{
    sideMenuOpen:boolean;
    isAddingEntry: boolean
    isDraggin: boolean
}

const UI_INITIAL_STATE:UIState = {
    sideMenuOpen:false,
    isAddingEntry: false,
    isDraggin: false
}

export const UiProvider:FC = ({children}) => {
    const [{sideMenuOpen, isAddingEntry, isDraggin}, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)
    
    const openSideMenu = () => {
        dispatch({type:'UI - Open Sidebar'})
    }
    const closeSideMenu = () => {
        dispatch({type:'UI - Close Sidebar'})
    }
    const setIsAddingEntry = (bool:boolean) => {
        dispatch({type:'UI - Set Adding-Entry', payload:bool})
    }

    const startDraggin = () => {
        dispatch({type:'UI - Start Draggin'})
    }

    const stopDraggin = () => {
        dispatch({type:'UI - Stop Draggin'})
    }

    return(
        <UiContext.Provider value={{
            sideMenuOpen:sideMenuOpen,
            isAddingEntry,
            isDraggin,

            //Methods
            openSideMenu,
            closeSideMenu,
            setIsAddingEntry,
            
            startDraggin,
            stopDraggin
        }}>
            {children}
        </UiContext.Provider>
    )
}