import { fileRead, fileWrite, dirRead } from "../modules/content.mjs";
import { minifyCss } from "../modules/css.minifier.mjs";

const utf8 = "utf8";

export const fonts = async (rootPath, local, production, temp)=>{
    //Read fonts folder
    const map = await dirRead(rootPath+'/'+local, utf8);

    for(const i of map){
        if(i.includes(".woff"||"woff2")){
            //Parse data to folder
            const typeFontFile = await fileRead(rootPath+local+'/'+i, utf8);
            fileWrite(production+i, typeFontFile);
        }
        if(i.includes("stylesheet.css"||"bundle.css"||"fonts.css")){
            //read the fonts bundle
            const bundle = await fileRead(rootPath+local+'/'+i, utf8);

            //minify the bundle, remove comments
            const minBundle = await minifyCss(bundle);

            //store in temp
            fileWrite(temp+'min.bundle.css', minBundle);
        }
    }
    console.log(map);
    return console.log("Font tasks done!!");
}