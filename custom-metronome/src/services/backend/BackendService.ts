import axios from "axios";
export class BackendService {

    private BASE_URL: string = "http://localhost:3001";

    private axiosInstance = axios.create({ baseURL: this.BASE_URL, timeout: 10000 });

    constructor() {

    }

    async read(url: string) {
        const { data } = await this.axiosInstance.get(url);
        return data;
    }

    async create(url: string, body: any){
        const { data } = await this.axiosInstance.post(url, body);
        return data;
    }

}