import {default as fsWithCallbacks} from 'fs'
const fs = fsWithCallbacks.promises;
import {rootDirectory} from './scripts/root.dir.mjs'
import {fonts} from './scripts/fonts.mjs'
import { fileRead, dirRead, dirWrite } from "./modules/content.mjs";
import { icons } from "./scripts/icons.mjs"
import { webmanifest } from "./scripts/webmanifest.mjs"
import { htaccess } from "./scripts/htaccess.mjs"
import { compressCSS } from './modules/css.compressor.mjs';
import { fileWrite } from './modules/content.mjs';
import { minifyCss } from './modules/css.minifier.mjs';
import { cssCompiler } from './modules/css.compiler.mjs';
import { staticIndexHTML } from './scripts/static-index.mjs';
//wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwimport { publicPWA } from "./scripts/publicPWA.mjs"


//*Critical paths:: 

const utf8 = "utf8";
const root = "../";
const local_root = "./";
const _temp = local_root+"temp/";
const _log = local_root+"log/";
const _production = "../production/";

//*Welcome message
console.log(`
|------------------|
|Welcome to buildy!|
|------------------|

`);
console.log("Starting.....");

(async() => {
    const rootMap = await rootDirectory(root);
    if(rootMap == null) {return console.log("--!!No files in root directory!!--");}
    
    //make temp and production folder
    dirWrite(_production);
    dirWrite(_temp);
    dirWrite(_log);
    //check env
    for(const i of rootMap[0]){
        if(i.includes("env.json")){
            const env = await fileRead(root+'env.json',utf8);
            if(JSON.parse(env)["APP_TYPE"] === "static-html"){
                //run static site routine
                console.log("static-html");
                _init_static(rootMap, JSON.parse(env));
                break;
            }
        }else{
            continue;
        }
    }

})();

//*get arr of items, and types map
//*enviroment file
async function _init_static([root_map, root_dir], env){
    console.log("RootDir :: ",root_map, root_dir);
    console.log("ENV :: ",env);

    //*make necessary folders inside production
    if(env["ENVIROMENT"] === "production"){
        //production == deployment ready app compiled
        console.log("Production version")
        
        //? Version controle
        if(env["version-controle"] == "owerride"){
            //Overide the current version
            //don't create new or sub versions
            const version = env["version"];
            console.log(version);

            dirWrite(_production+version);
            //*Create files
            //!Overide
            const main = _production+version+"/";
            const _legal = _production+"legal/";
            const _lang = _production;
            
            if(env["static-structure"]){

                for(const i of root_map){
                    console.log(i);
                    if(i.includes('build' || '.git'||"dump"||"README.md")){
                        console.log("skippid ::", i); 
                        continue;
                    };
                    // if(i.includes("asset"||"assets")){console.log("Assets folder found!")}
                    if(i.includes("fonts")){
                        //TAke and rewrite fonts
                        console.log("Fonts folder found!"); 
                        fonts(root, i, main, _temp);
                    };
                    // if(i.includes("icon"||"icons")){console.log("Icons for PWA folder found!"); icons(root, _icons);}
            
                    // //break from rutine, create webmanifest
                    // if(env["WEBMANIFEST"]){console.log("webmanifest found!"); webmanifest(env, root, _production);}
                    // //break from rutine, create .htaccesss
                    if(env["HTACCESS"]){
                        console.log("HTACCESS found!"); 
                        htaccess(env, main);
                    };
                    if(i.includes("styles")){
                        console.log("STYLES found!");

                        //conppress and map index.css
                        const index = await fileRead(root+"styles/index.css",utf8);
                        console.log(index);
                        const [index_css, index_map] = await compressCSS(index, env);
                        console.log("CSS ::", index_css,"MAP ::", index_map);
                        
                        //Minify index
                        const min_index_css = await minifyCss(index_css);
                        
                        //Write file in temp
                        fileWrite(_temp+"min.index.css",min_index_css);
                        
                        //Write map in temp folder
                        fileWrite(_temp+"temp.index.map.json",JSON.stringify(index_map));
                    
                        //*NEXT compile and minify light and dark css

                        const light_css = await fileRead(root+"styles/light.css",utf8);
                        const dark_css = await fileRead(root+"styles/dark.css",utf8);

                        console.log("LIGHT ::", light_css, "DARK ::" ,dark_css);

                        const compiled_light_css = await cssCompiler(light_css, index_map);
                        const compiled_dark_css = await cssCompiler(dark_css, index_map);

                        //Minify

                        const min_light_css = await minifyCss(compiled_light_css);
                        const min_dark_css = await minifyCss(compiled_dark_css);

                        //Write file
                        fileWrite(main+"min.light.css",min_light_css);
                        fileWrite(main+"min.dark.css",min_dark_css);

                        console.log("CSS DONE!!")
                    }

                    //! first css
                    if(i.includes("index")){
                        //*Do index YAY
                        setTimeout(() => {
                            staticIndexHTML(root, main, _temp, env, "en")
                        }, 5000);
                    };
            
                }

            }else{
                //TODO:: write default behaviour
            }


        }else{
            //create new version or sub version if neccesary
        }
    }
}