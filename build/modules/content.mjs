import {default as fsWithCallbacks} from 'fs'
const fs = fsWithCallbacks.promises;

export const fileRead = async (path, encoding)=>{
    try {
        const data = await fs.readFile(path, encoding); // need to be in an async function
        return data;
        // the contents of file1.js
      } catch (error) {
        console.error("FILE READ ::",error);
      }
};
export const dirRead = async (path, encoding)=>{
    try {
        const data = await fs.readdir(path, encoding); // need to be in an async function
        return data;
        // the contents of file1.js
      } catch (error) {
        console.error("DIR READ ::",error);
      }
};

export const fileWrite = async (path, data)=>{
  try {
    await fs.writeFile(path, data);  
  } catch (error) {
    console.error("FILE WRITE ::",error);
  }
}
export const dirWrite = async (path)=>{
  try {
    await fs.mkdir(path);  
  } catch (error) {
    console.error("DIR WRITE ::",error);
  }
}