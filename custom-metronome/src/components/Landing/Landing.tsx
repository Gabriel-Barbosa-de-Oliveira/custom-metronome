import React, { Component } from 'react'
import Branding from '../../partials/Branding/Branding'
import HeaderMenu from '../../shared/partials/HeaderMenu/HeaderMenu'

export default class Landing extends Component {
    render() {
        return (
            <>
                <HeaderMenu />
                <Branding />
            </>
        )
    }
}
