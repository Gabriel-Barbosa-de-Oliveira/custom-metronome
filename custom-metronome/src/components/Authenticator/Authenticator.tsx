import React, { Component } from 'react'
import { IAuthenticator } from '../../shared/interfaces/props/IAuthenticator'
import AuthenticationCard from '../../shared/partials/Card/AuthenticationCard'
import "./Authenticator.scss";
export default class Authenticator extends Component<IAuthenticator, any> {
  render() {
    return (
        <section className='authenticator-container'>
            <AuthenticationCard cardState={this.props.cardState}  onSignIn={this.props.onSignIn} />
        </section>
        
    )
  }
}
