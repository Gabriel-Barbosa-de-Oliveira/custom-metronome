import { IPulseControllerControlObject } from "./IPulseControllerControlObject";

export interface IPulseControllerProps {
    pulses: Array<IPulseControllerControlObject>,
    changed: any
}