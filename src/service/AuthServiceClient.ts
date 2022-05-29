import { ClientData } from "../models/ClientData";
import { LoginData } from "../models/LoginData";
import AuthService from "./AuthService";
const accounts: any[] = [
    {email: "1", password: "1", role: "USER"},
    {email: "2", password: "2", role: "ADMIN"}
]

export default class AuthServiceClient implements AuthService {
    async login(loginData: LoginData): Promise<boolean | ClientData> {
        const account = accounts.find(a => loginData.email === a.email 
            && loginData.password === a.password)
        return !!account ? {email: loginData.email, displayName: loginData.email, 
            isAdmin: account.role === "ADMIN"} : false;
    }
    async logout(): Promise<boolean> {
        return true;
    }

}