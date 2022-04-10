export const minifyCss = (data)=>{
    return new Promise((resolve, reject)=>{
        if(data != null && data !=''){
            data = data.replace(/([^0-9a-zA-Z\.#])\s+/g, "$1");
            data = data.replace(/\s([^0-9a-zA-Z\.#]+)/g, "$1");
            data = data.replace(/;}/g, "}");
            data = data.replace(/\/\*.*?\*\//g, "");
            const result = data;
            resolve(result);
        }else{
            reject();
        }
    })

}