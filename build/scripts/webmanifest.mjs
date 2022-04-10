import { fileRead, fileWrite, dirRead } from "../modules/content.mjs";

const utf8 = "utf8";

export const webmanifest = async(env, root, production)=>{
    let rawManifest = env["WEBMANIFEST"];

    if(rawManifest["start_url"] == "<AUTOGENERATE>"){
        rawManifest["start_url"] = "/app";        
    }
    if(rawManifest["display"] == "<AUTOGENERATE>"){
        rawManifest["display"] = "standalone";
    }
    if(rawManifest["scope"] == "<AUTOGENERATE>"){
        rawManifest["scope"] = "/";
    }
    if(rawManifest["icons"] == "<AUTOGENERATE>"){
        rawManifest["icons"] = [];
        //generate root icons dynamicly from dev folder
        const icons = await dirRead(root+"icons/",utf8);

        for(const icon of icons){
            let res = icon.match(/\d+/g);
            rawManifest["icons"].push({
                "src": "/icons/icon_"+res[0]+".png",
                "type": "image/png",
                "sizes": res[0]+'x'+res[0]
            });
        }
        fileWrite(production+"manifest.webmanifest", JSON.stringify(rawManifest));
    }

    return console.log("Webmanifest written!")
}