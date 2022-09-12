import React from 'react'
import { INumberController } from '../interfaces/INumberController';


export default function NumberController(props: INumberController) {
  return (
    <div>{props.component}</div>
  )
}
