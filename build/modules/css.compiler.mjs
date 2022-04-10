export const cssCompiler = (data, map)=>{
    return new Promise((resolve, reject)=>{
        if(data != null && data != ''){
            let temp = data;

            //Replace alll vars
            for(let i=0; map["variableMap"]["development"].length >i;i++){
                for(let j=0;5000>j;j++){
                    if(temp.match(new RegExp(`['" :\(\)]`+map["variableMap"]["development"][i]+`[:'" \(\)]`))){
                        temp = temp.replace(new RegExp(`(['" :\(\)])`+map["variableMap"]["development"][i]+`([:'" \(\)])`,'g'),'$1'+map["variableMap"]["production"][i]+'$2');
                    }else{
                        break;
                    }     
                }
            }

            //Replace alll classes
            for(let i = 0; map["classesMap"]["development"].length > i; i++){
                for(let j = 0; j<1000;j++){
                    if(temp.includes(map["classesMap"]["development"][i])){
                        temp = temp.replace(map["classesMap"]["development"][i], '.'+map["classesMap"]["production"]);
                    }else{
                        break;
                    }
                }
            
            }
            
            //Replace alll classes
            for(let i = 0; map["classesMap"]["development"].length > i; i++){
                for(let j = 0; j<1000;j++){
                    if(temp.match(map["classesMap"]["development"][i].replace(".",""))){
                        console.log(map["classesMap"]["development"][i].replace(".",""));
                        const Class = map["classesMap"]["development"][i].replace(".","");
                        temp = temp.replace('class="'+Class+'"', 'class="'+map["classesMap"]["production"][i]+'"');
                    }else{
                        break;
                    }
                }
            }
            const result = temp;
            resolve(result);
        }else{
            reject(console.log("no valid css data provided"));
        }
    });
}