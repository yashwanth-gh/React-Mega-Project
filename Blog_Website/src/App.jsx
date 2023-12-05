import { useState } from 'react'
import config from './config/config'
import './App.css'

function App() {
    console.log(config.appwriteUrl)
    console.log(config.appwriteProjectId)
    console.log(config.appwriteDatabaseId)
    console.log(config.appwriteCollectionId)
    console.log(config.appwriteBucketId)
   
  return (
    <>
    <h1>Blog with AppWrite!</h1>
    {

    }
    </>
  )
}

export default App
