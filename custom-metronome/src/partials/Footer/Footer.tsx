import React, { Component } from 'react'

import "./Footer.scss";

export default class Footer extends Component {
    render() {
        return (
            <footer className='footer-container'>
                <hr />
                <div className='footer-copyright'>
                    <span>© Copyright 2022. Todos os direitos reservados.</span>
                </div>
            </footer>
        )
    }
}
