import { ConverteHexToRGBA } from "./hexToRGBA.mjs";
import { ConverteHexToHls } from "./hexToHls.mjs";
import { ConverteRGBAToHLS } from "./RGBAToHSL.mjs";
import { generateVariableName } from "./varNameGenerator.mjs";

export function compressCSS(css, env){

    return new Promise((resolve, reject)=>{
        if(css != null && css !='' ){
            const findAllClasses = /\.[A-Za-z_\-]+/g;
            const findAllIds = /#[A-Za-z]+/g;
            const findAllSolidColors = /([: ]#)([A-Za-z0-9]{6})(;)/g;
            const findAllTrapsperentColors = /([: ]#)([A-Za-z0-9]{8})(;)/g;
            const findAllRGBA = /(?<=rgba\()[0-9,. ]+/g;
            const findAllVars = /--[a-zA-Z]+/g;
        
        
            let temp = css;
        
            //? NO map necessary for changing css colors
            //Match all colors
            const solidColors = temp.match(findAllSolidColors);
            console.log(solidColors);
        
            //Converte hex to hls
            if(solidColors != null){
                for(let i = 0; solidColors.length>i;i++){
                    let filteredColor = solidColors[i].replace(findAllSolidColors, "$2");
                    console.log(filteredColor)
                    ConverteHexToHls(filteredColor, (hsl)=>{
                        console.log(hsl);
                        for(let j =0; 100>j;j++){
                            if(temp.match(new RegExp('([: ]#)('+filteredColor+')(;)','g'))){
                                temp = temp.replace(new RegExp('([: ])#('+filteredColor+')(;)','g'), "$1"+hsl+"$3");
                            }else{
                                break;
                            }
                        }
                    });
                }
            }
        
            //Match all colors
            const transperentColors = temp.match(findAllTrapsperentColors);
            console.log(transperentColors);
        
            //Converte 8-hex to RGBA
            if(transperentColors != null){
                for(let i = 0; transperentColors.length>i;i++){
                    let filteredColor = transperentColors[i].replace(findAllTrapsperentColors, "$2");
                    console.log(filteredColor)
                    ConverteHexToRGBA(filteredColor, (rgba)=>{
                        console.log(rgba);
                        for(let j =0; 100>j;j++){
                            if(temp.match(new RegExp('([: ]#)('+filteredColor+')(;)','g'))){
                                temp = temp.replace(new RegExp('([: ])#('+filteredColor+')(;)','g'), "$1"+rgba+"$3");
                            }else{
                                break;
                            }
                        }
                    });
                }
            }
            
            //Match all colors
            const RGBAColors = temp.match(findAllRGBA);
            console.log(RGBAColors);
        
            //Converte RGBA to hlsa
            if(RGBAColors != null){
                for(let i = 0; RGBAColors.length>i;i++){
                    ConverteRGBAToHLS(RGBAColors[i], (hlsa)=>{
                        console.log('hlsa',hlsa);
                        for(let j =0; 100>j;j++){
                            if(temp.includes('rgba('+RGBAColors[i]+')')){
                                temp = temp.replace('rgba('+RGBAColors[i]+')', hlsa);
                            }else{
                                break;
                            }
                        }
                    });
                }
            }
        
            ///TODO add for other colors conversations
        
            //? MAP necessary for css variables
            //Create arry with all css vars
            const vars = temp.match(findAllVars);
            const filteredVars = [...new Set(vars.sort())];
            console.log(filteredVars);
            let mapVars = [];
        
            //Find and replace all vars
            if(filteredVars  != null){
                for(let i=0; filteredVars.length >i;i++){
                    mapVars.push('--'+generateVariableName('css-var',i));
                    for(let j=0;5000>j;j++){
                        if(temp.match(new RegExp(`['" :\(\)]`+filteredVars[i]+`[:'" \(\)]`))){
                            temp = temp.replace(new RegExp(`(['" :\(\)])`+filteredVars[i]+`([:'" \(\)])`,'g'),'$1--'+generateVariableName('css-var',i)+'$2');
                        }else{
                            break;
                        }     
                    }
                }
            }
            console.log(filteredVars);
            console.log(mapVars);
            
            //Create arry with all css classes
            const classes = temp.match(findAllClasses);
            console.log(classes);
            let mapClasses = [];
            //Delete duplicats
            let filteredClasses = [...new Set(classes.sort())];
            console.log(filteredClasses);

            //Remove excluded
            if(env){
                for(let i=0; env["exclude"].length > i; i++){

                    filteredClasses = filteredClasses.filter(value => value !== env["exclude"][i] )
                }
            }
            //Replace all ids && create a map
            for(let i = 0; filteredClasses.length > i; i++){
                mapClasses.push(generateVariableName('css-class',i));
                console.log(filteredClasses[i]);
                console.log(i);
                for(let j = 0; j<1000;j++){
                    if(temp.includes(filteredClasses[i])){
                        temp = temp.replace(filteredClasses[i], '.'+generateVariableName('css-class',i));
                    }else{
                        break;
                    }
                }
            }  
            console.log(mapClasses);
        
            //Create a array with all css id's
            const ids = temp.match(findAllIds);
            let mapIds = [];
            let filteredIds = [];
            //Delete duplicats
            //*Fix no id's bug
            if(ids !== null){
                let filteredIds = [...new Set(ids.sort())];
                console.log(filteredIds);
        
                //Replace all ids && create a map
                for(let i = 0; filteredIds.length > i; i++){
                    mapIds.push(generateVariableName('css-id',i));
                    console.log(filteredIds[i]);
                    console.log(i);
                    for(let j = 0; j<1000;j++){
                        if(temp.includes(filteredIds[i])){
                            temp = temp.replace(filteredIds[i], '#'+generateVariableName('css-id',i));
                        }else{
                            break;
                        }
                    }
                }  
                console.log(mapIds);

            }
        
        
            const Map = {
                "variableMap":{
                    "development" : filteredVars,
                    "production" : mapVars
                },
                "idsMap":{
                    "developmentIds" : filteredIds,
                    "productionIds" : mapIds
                },
                "classesMap":{
                    "development" :filteredClasses,
                    "production" : mapClasses
                }
            };
            const result = temp;
            resolve([result, Map]);
        }else{
            reject(console.log("No css provided!"));
        }
    });
}