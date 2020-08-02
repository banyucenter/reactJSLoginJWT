import React, { useContext } from 'react';
import { AuthContext } from '../App';
import MenuPublik from './Menu/MenuPublik';
import MenuMember from './Menu/MenuMember';
import MenuAdmin from './Menu/MenuAdmin';
import MenuStaff from './Menu/MenuStaff'

function MenuComp() {
    const { state } = useContext(AuthContext)

    if (!state.isAuthenticated) {
        return (
            <MenuPublik/>
        )
    }
    if (state.role === 1){
        return (
            <MenuAdmin/>
        )
    }
    else if (state.role === 2){
        return (
            <MenuStaff/>
        )
    }
    return (
        <MenuMember/>
    )
}

export default MenuComp
