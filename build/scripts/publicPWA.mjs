import { compressCSS } from "../modules/css.compressor.mjs";
import { fileRead, fileWrite, dirRead } from "../modules/content.mjs";
import { minifyCss } from "../modules/css.minifier.mjs";
import { cssFolderNames } from "../modules/fileNaimes.mjs";
import { cssCompiler } from "../modules/css.compiler.mjs";
import { compileHTML } from "../html.compiler.mjs";


const utf8 = "utf8";
const matchButton = /(<button>)([A-Za-z0-9_\-"'()% \s\n<>/]+)(<\/button>)/g;
const matchJavascript = /(<script>)([A-Za-z0-9_\-"'()% \s\n<>/\[\]?*!,.;:]+)(<\/script>)/g
const matchCss = /(<style>)([A-Za-z0-9_\-"'()% \s\n<>/\[\]?*!,.;:]+)(<\/style>)/g

export const publicPWA = async(root, temp, production)=>{
    //read public folder
    const publicDir = await dirRead(root+"public/",utf8);
    console.log("publicdir ::", publicDir)
    //TODO compile css first
    try {
        //read css and parse css throu compressor && minifier
        for(const folder of publicDir){
            if(folder.includes("styles"||"style"||"markup"||"css")){
                //read css folder
                const cssFolder = await dirRead(root+"public/"+folder);
                console.log(cssFolder);
                //loop over css folder
                for(const sheet of cssFolder){
                    console.log(sheet)
                    if(sheet.includes("index.css")||sheet.includes("main.css")||sheet.includes("app.css")){
                        //found main stylesheet
                        //read it and compress
                        console.log("running:: ",sheet);
                        const index = await fileRead(root+"public/"+folder+'/'+sheet, utf8);
                        const data = await compressCSS(index);
                        //minify index
                        const minCss = await minifyCss(data[0]);
                        //write index to temp folder
                        fileWrite(temp+"min.index.css",minCss);
                        console.log(data[1]); 
                        fileWrite(temp+"css.map.json",JSON.stringify(data[1]));
                        console.log("Done");
                    }
                    //TODO add other
                }
    
            }
        }
    } catch (error) {
        console.log(error);
    }finally{
        for(const folder of publicDir){
            if(folder.includes("styles"||"style"||"markup"||"css")){
                //read and update light && dark .css and move them to app folder
                //read css folder
                const cssFolder = await dirRead(root+"public/"+folder);
                console.log(cssFolder);
                //loop over css folder
                for(const sheet of cssFolder){
                    console.log(sheet);
                    const map = await fileRead(temp+"css.map.json", utf8);
                    if(sheet.includes("light.css")||sheet.includes("dark.css")){
                        //read and compile
                        console.log("running:: ",sheet);
                        const ligthCss = await fileRead(root+"public/"+folder+'/'+sheet, utf8);
                        
                        //compile
                        const minCss = await cssCompiler(ligthCss, JSON.parse(map));
                        //write index to temp folder
                        fileWrite(production+sheet, minCss);
                        console.log("Done");
                    }
                    // // //TODO handle public html
                    const publicHTML = await fileRead(root+"public/public.html",utf8);

                    const downloadButton = publicHTML.match(matchButton);

                    const javascript = public.match(matchJavascript);
                    
                    //get css
                    const css = public.match(matchCss);

                    //compile css
                    const compCss = await cssCompiler(css, JSON.parse(map));
                    //minify css
                    const minCss = await minifyCss(compCss);

                    //compile html
                    const compHTML = compileHTML(publicHTML);
                    const fileTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <script>if(window.matchMedia('(prefers-color-scheme: dark)').media==='not all'){document.documentElement.style.display='none';document.head.insertAdjacentHTML('beforeend','<link rel="stylesheet" href="app/light.css" onload="document.documentElement.style.display = \'\'">');}</script>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Download Nitor activity tracker</title>
                        <link rel="stylesheet" href="app/dark.css" media="(prefers-color-scheme: dark)">
                        <link rel="stylesheet" href="app/light.css" media="(prefers-color-scheme: light)">
                        <style></style>
                        <link rel="manifest" href="manifest.webmanifest">
                        <script src="sw.js" type="module"></script>
                    </head>
                    <body>
                        <button></button>
                        <script></script>
                    </body>
                    </html>
                    `;
                    let temp = fileTemplate;

                    temp = temp.replace("<style></style>",minCss);

                    temp = temp.replace("<button></button>",compHTML);

                    temp = temp.replace("<script></script>", javascript);

                    const result = temp;
                    //DONE download button
                    fileWrite(production+"index.html", result);
                    
                    //TODO:: handle app .html && package

                    //index.html (app file)
                    
                    //?Add router generator / manager
                }
            }
        }
    }
    
}