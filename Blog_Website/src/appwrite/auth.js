//^ ---- This way of creating authentication is platform(like appwrite,firebase) independent
//^ -- by creating class and creating objects you are not exposing how everything works in behind
//? -- refer this article (it is built using this article ) LINK:(  https://appwrite.io/docs/references/cloud/client-web/account  )


import config from "../config/config.js";
import { ID, Client, Account } from 'appwrite';


//^ ------------------------------------------Creating a new Class-----------------------------------------

export class AuthService {
    client = new Client();
    account;

    //^ --this is a essential step while creating Auth serices using appwrite

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client)
    }

    //* -----------------------------------------------------------------------------

    //* --method to create new account

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                //^ here after signUp we can directly login the user instead of telling them login again
                return this.login({ email, password });
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite Auth :: createAccount :: Error ", error);
        }
    }
    //* -----------------------------------------------------------------------------

    //* -----------------------------------------------------------------------------

    //* --method to login into existing account

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Appwrite Auth :: login :: Error ", error);
        }
    }
    //* -----------------------------------------------------------------------------

    //* -----------------------------------------------------------------------------

    //* --method to check if the account exist if user is in home page of website

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite Auth :: getCurrentUser :: Error ", error);
        }
        return null;
    }
    //* -----------------------------------------------------------------------------

    //* -----------------------------------------------------------------------------

    //* --method to logout of existing account

    async logout({ }) {
        try {
            //^ for logout of just current device use [ this.account.deleteSession('current'); ]
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Auth :: logout :: Error ", error);
        }
    }
};
//^ ----------------------------------------------------------------------------


//^ --Creating an object where all authentication happens :-
const authService = new AuthService();


//^ --Exporting object :-
export default authService;