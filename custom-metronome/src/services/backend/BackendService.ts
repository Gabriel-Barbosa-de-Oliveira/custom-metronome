import axios from "axios";
export class BackendService {

    private BASE_URL: string = "http://localhost:3001";

    private axiosInstance = axios.create({ baseURL: this.BASE_URL, timeout: 10000, withCredentials: true});

    constructor() {

    }

    async read(url: string, body?: any) {
        const { data } = await this.axiosInstance.get(url, body);
        return data;
    }

    async create(url: string, body: any) {
        const { data } = await this.axiosInstance.post(url, body);
        return data;
    }

    // async signInEndpoint(
    //     email: string,
    //     password: string
    // ) {
    //     const { data } = await this.axiosInstance.post(`/session/create-session`,
    //         { email, senha: password },
    //         {
    //             withCredentials: "include"
    //         });
    //     return data;
    // }

    //   export function signOutEndpoint(): Promise<IUser> {
    //     return fetch(`http://localhost:3001/sessao/finalizar`, {
    //       credentials: "include",
    //       method: "POST",
    //     }).then(handleResponse);
    //   }

}