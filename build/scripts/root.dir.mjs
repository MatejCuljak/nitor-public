import { fileRead, dirRead } from "../modules/content.mjs";

const utf8 = "utf8";
const dotExtension = /(?<=\.)[a-z]+/g;
const dotPrefix = /[a-zA-Z_0-9]+(?=\.)/g
export const rootDirectory = async (rootPath)=>{
    /*
    ?GOAL :: READ ROOT DIR AND RETURN AN OBJECT { map }
    *@params root dir path
    */
    try {

        //fetch root directory
        const root_dir = await dirRead(rootPath, utf8);
        
        //map whole scope
        if(root_dir !=null){
            let map = [];
            for(const i of root_dir){
                if(i.includes('.')){
                    map.push({
                        [i.match(dotPrefix)] : {
                            "path" : `${rootPath}${i}`,
                            "type" : i.match(dotExtension)[0],
                            "children" : false 
                        }
                    });
                }else{
                    map.push({
                        [i] : {
                            "path" : `${rootPath}${i}`,
                            "type" : 'folder',
                            "children" : [] 
                        }
                    });
                }
            }
            //Take all folders and map them
            return [root_dir,map];

            
            
        }else{
            return null;
        }

    } catch (error) {
        
    }
}