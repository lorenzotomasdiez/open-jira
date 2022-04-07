import { createContext } from "react";
interface ContextProps{
    sideMenuOpen:boolean,
    isAddingEntry: boolean
    isDraggin: boolean

    //Methods
    openSideMenu: () => void
    closeSideMenu: () => void
    setIsAddingEntry: (bool: boolean) => void
    startDraggin: () => void
    stopDraggin: () => void
}

export const UiContext = createContext({} as ContextProps);