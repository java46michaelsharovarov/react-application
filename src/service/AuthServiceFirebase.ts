import AuthService from './AuthService';
import { collection, getFirestore, doc, getDoc} from "firebase/firestore";
import { AuthProvider, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, TwitterAuthProvider, UserCredential} from "firebase/auth";
import { ClientData } from '../models/ClientData';
import { LoginData } from '../models/LoginData';
import appFirebase from "../config/firebase-config";
import google from "../icons/google.svg";
import facebook from "../icons/facebook.svg";
import twitter from "../icons/twitter.svg";
import github from "../icons/github.svg";

const ADMINISTRATORS_COLLECTION_NAME = "administrators"

export default class AuthServiceFirebase implements AuthService {
    authFirebase = getAuth(appFirebase);
    administratorsCollection = collection(getFirestore(appFirebase), ADMINISTRATORS_COLLECTION_NAME);
    login(loginData: LoginData): Promise<boolean | ClientData> {
        return !loginData.email ? this.authPopupProvider(loginData.password) : this.authPassword(loginData);
    }
    async logout(): Promise<boolean> {
        try {
            await signOut(this.authFirebase);
            return true;
        } catch (err) {
            return false;
        }
    }      
    providers(): {name: string, icon: string}[] {
        return [{name: "Google", icon: google}, {name: "Facebook", icon: facebook},
                {name: "Twitter", icon: twitter},{name: "Github", icon: github}];
    }  
    private async authPopupProvider(providerName: string): Promise<boolean | ClientData> {        
        try {
            const userDetails = await signInWithPopup(this.authFirebase, this.getProvider(providerName));
            return this.getClientData(userDetails);
        } catch (err) {
            return false;
        }
    }
    private async authPassword(loginData: LoginData): Promise<boolean | ClientData> {
        try {
            const userDetails = await signInWithEmailAndPassword(this.authFirebase, loginData.email, loginData.password);
            return this.getClientData(userDetails);
        } catch (err) {
            return false;
        }
    }       
    private async getClientData(userDetails: UserCredential) {
        const { uid, email, displayName } = userDetails.user;
        return { displayName: displayName || email, email, isAdmin: await this.isAdmin(uid) } as ClientData;
    } 
    private async isAdmin(uid: string): Promise<boolean> {
        return (await getDoc(doc(this.administratorsCollection, uid))).exists();
    }    

    private getProvider(providerName: string): AuthProvider {
        let provider: AuthProvider;
        switch(providerName) {
                case "Facebook":
                    provider = new FacebookAuthProvider();
                  break;
                case "Twitter":
                    provider = new TwitterAuthProvider();
                  break;
                case "Github":
                    provider = new GithubAuthProvider();
                  break;
                default:
                    provider = new GoogleAuthProvider();
              }
        return provider; 
    }
}