import { fileRead, fileWrite, dirRead } from "../modules/content.mjs";

const utf8 = "utf8";

export const icons = async(root, production)=>{
    //scan icons folder
    const icons = await dirRead(root+"icons/",utf8);

    for(const icon of icons){
        //Read evry icon
        const temp = await fileRead(root+"icons/"+icon);

        //Write every icon
        fileWrite(production+icon, temp);
    }
    return console.log("Icons tasks done!!");
}