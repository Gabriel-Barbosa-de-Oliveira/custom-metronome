import React, { Component } from 'react'
import Branding from '../../partials/Branding/Branding'
import Footer from '../../partials/Footer/Footer'
import UseItEverywhere from '../../partials/UseItEverywhere/UseItEverywhere'
import HeaderMenu from '../../shared/partials/HeaderMenu/HeaderMenu'
import "./Landing.scss"
export default class Landing extends Component {
    render() {
        return (
            <>
                <HeaderMenu />
                <div className='landing-container'>
                    <Branding />
                    <UseItEverywhere />
                    <Footer />
                </div>
            </>
        )
    }
}
