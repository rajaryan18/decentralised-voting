// const ipfsClient = require('ipfs-http-client');

import { create } from "ipfs-http-client";
// const fs=require("fs");
import fs from "fs";

async function ipfsClient() {                                              //function to invoke ipfs operations
  const projectId = "2OMeEze005jZ0wwPPjbBoZOgJb3";                         //save in env variables
  const projectSecret = "93d12466ddd31fed6ab66a9d6b2e2395";                // ""
  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const client = await create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
      authorization: auth,
    },
  });

  return client;
}

// client.add("Hello World").then((res) => {
//   console.log(res);
// });

// async function saveText() {
//   let ipfs = await ipfsClient()
//   let result=await ipfs.add("Hello Test 1");
//   console.log(result);
// }

async function saveFile() {                                   //function to upload files to ipfs server
  let ipfs = await ipfsClient();
  let data=fs.readFileSync("./fate.png")                      //enter file path here
  let result = await ipfs.add({content:data})  //enter name which you want to store it under here
  console.log(result)                                         //returns an object....use path value for cid(unique id)
} 

// async function saveJSON() {
//   let ipfs = await ipfsClient();
//   let data={
//     name:"Aayush",
//     age:"20",
//     sex:"M"
//   }
//   let result = await ipfs.add({path:"abc.json",content:JSON.stringify(data)})
//   console.log(result)
// } 

// async function getData(hash){
//   let ipfs= await ipfsClient();
//   let asyncitr=await ipfs.cat(hash);
//   // console.log(asyncitr)
//   for await (const itr of asyncitr){
//     // console.log(itr);
//     let data=Buffer.from(itr).toString()
//     console.log(data);
//   }

// }
// async function retrievePNGFromIPFS(cid) {
//   const ipfs = await ipfsClient(); // create IPFS instance
//   const fileData = await ipfs.cat(cid); // retrieve file data using CID
//   const blob = new Blob([fileData], { type: "image/png" }); // create a blob from file data
//   const url = URL.createObjectURL(blob); // create object URL for the blob
//   // return url; // return object URL
//   console.log(url)
// }

async function displayIPFSImage(cid) {
  const url = "https://ipfs.io/ipfs/" + cid;                  // construct the IPFS URL using the CID
  const response = await fetch(url);                      // fetch the image data from IPFS
  const blob = await response.blob();                    // convert the response to a Blob object
  const objectURL = URL.createObjectURL(blob);          // create an object URL for the Blob
  const img = document.getElementById("ipfs-image");    // get the <img> element
  img.src = objectURL;                                 // set the source of the <img> element to the object URL
}

saveFile();
// getData("QmTd5hLjzr4YiNt8cuPsFeZaySXSTaghVUZYBWV4eXPZmS");
// displayIPFSImage("QmTd5hLjzr4YiNt8cuPsFeZaySXSTaghVUZYBWV4eXPZmS")


