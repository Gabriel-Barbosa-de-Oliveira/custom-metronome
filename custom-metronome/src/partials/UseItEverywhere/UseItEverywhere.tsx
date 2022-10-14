import React, { Component } from 'react'

import "./UseItEverywhere.scss"

export default class UseItEverywhere extends Component {
    render() {
        return (
            <section className='use-it-everywhere-container'>
                <header>
                    <h2>Use onde quiser</h2>
                    <h3>Tenha liberdade e portabilidade para seus estudos</h3>
                </header>
                <section className='devices-container'>
                    <div>
                        <img src={require("../../assets/img/phone.png")} alt="Phone web App picture" />
                        <h3>Celular</h3>
                    </div>
                    <div>
                        <img src={require("../../assets/img/computer.png")} alt="Computer Web App picture" />
                        <h3>Computador</h3>
                    </div>
                    <div>
                        <img src={require("../../assets/img/tablet.png")} alt="Tablet Web App picture" />
                        <h3>Tablet</h3>
                    </div>
                </section>
            </section>
        )
    }
}
