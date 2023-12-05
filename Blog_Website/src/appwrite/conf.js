//^ ---- This way of creating authentication is platform(like appwrite,firebase) independent
//^ -- by creating class and creating objects you are not exposing how everything works in behind
//? -- refer this article (it is built using this article ) LINK:(  https://appwrite.io/docs/references/cloud/client-web/databases#createDocument  )

import config from "../config/config";
import {ID,Client,Databases,Storage,Query} from 'appwrite';

//^ -------------------------------Creating a new Class--------------------------------

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }

    //^ -- create a new Document : 
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            ) 
        } catch (error) {
            console.log("Appwrite service :: createPost :: Error ", error);
        }
    }

    //^ -- update Document : 
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: Error ", error);
        }

    }

    //^ -- delete Document : 
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true;    
        } catch (error) {
            console.log("Appwrite service :: deletePost :: Error ", error);
            return false;
        }
    }

    //^ -- get Document :
    async getPost({slug}){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: Error ", error);
        }
    }
    
    //^ -- get Documents with Querying :
    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts (with query) :: Error ", error);
            return false;
        }
    }

    //^ -- Upload file :
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: Error ", error);
            return false;
        }
    }

    //^ -- delete file :
    async deleteFile(fileId){
        try {
             await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: Error ", error);
            return false;
        }
    }

        //^ -- preview file :
        getFilePreview(fileId){
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        }

}

//^ ------------------------------------------------------------------------------------

const service = new Service();
export default service;