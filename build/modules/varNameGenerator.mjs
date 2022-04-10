export function generateVariableName(key, value, aditional){

    const varNamePoolOne = ["q","w","e","r","t","z","u","i","o","p","a","s","d","f","g","h","j","k","l","y","x","c","v","b","n","m"];
    const varNamePoolOneLength = varNamePoolOne.length; //?26
    const varNamePoolTwo = ["Q","W","E","R","T","Z","U","I","O","P","A","S","D","F","G","H","J","K","L","Y","X","C","V","B","N","M"];
    const varNamePoolTwoLength = varNamePoolTwo.length; //?27
    const varNumPool = ["1","2","3","4","5","6","7","8","9","0"];
    const varNumPoolLength = varNumPool.length; //?10
    const specialPool = ['_',"$","ˇ","-"]

    let tempCounter = 0;
    //*SHEMA
    //CSS VARS a ab
    //CSS id A AB
    //CSS class a- ab-
    //Functions aA aB
    //JS constant A AB
    //JS let _a _aa
    //JS param a1 b1
    //JS multi param a1 a2

    switch (key) {
        case "css-var":
            if(varNamePoolOne[value] == undefined){
                //Need to "extend the index"
                // 27       26
                if(value < 2*varNamePoolOneLength){
                    return varNamePoolOne[0] + varNamePoolOne[value-varNamePoolOneLength];
                }
                if(value < 3*varNamePoolOneLength){
                    return varNamePoolOne[1] + varNamePoolOne[value-(2*varNamePoolOneLength)];
                }
                if(value < 4*varNamePoolOneLength){
                    return varNamePoolOne[2] + varNamePoolOne[value-(3*varNamePoolOneLength)];
                }
                if(value < 5*varNamePoolOneLength){
                    return varNamePoolOne[3] + varNamePoolOne[value-(4*varNamePoolOneLength)];
                }
                if(value < 6*varNamePoolOneLength){
                    return varNamePoolOne[4] + varNamePoolOne[value-(5*varNamePoolOneLength)];
                }
                if(value < 7*varNamePoolOneLength){
                    return varNamePoolOne[5] + varNamePoolOne[value-(6*varNamePoolOneLength)];
                }
            }
            return varNamePoolOne[value];
            break;
        case "functions":
            if(varNamePoolOne[value] == undefined || varNamePoolTwo[value] == undefined){
                //Need to "extend the index"
                // 27       26
                if(value < 2*varNamePoolOneLength){
                    return varNamePoolOne[1] + varNamePoolTwo[value-varNamePoolTwoLength];
                }
                if(value < 3*varNamePoolOneLength){
                    return varNamePoolOne[2] + varNamePoolTwo[value-(2*varNamePoolTwoLength)];
                }
                if(value < 4*varNamePoolOneLength){
                    return varNamePoolOne[3] + varNamePoolTwo[value-(3*varNamePoolTwoLength)];
                }
                if(value < 5*varNamePoolOneLength){
                    return varNamePoolOne[4] + varNamePoolTwo[value-(4*varNamePoolTwoLength)];
                }
                if(value < 6*varNamePoolOneLength){
                    return varNamePoolOne[5] + varNamePoolTwo[value-(5*varNamePoolTwoLength)];
                }
                if(value < 7*varNamePoolOneLength){
                    return varNamePoolOne[6] + varNamePoolTwo[value-(6*varNamePoolTwoLength)];
                }
            }
            return varNamePoolOne[0]+varNamePoolTwo[value];
            break;
        case "js-constant":
                if(varNamePoolTwo[value] == undefined){
                    //Need to "extend the index"
                    // 27       26
                    if(value < 2*varNamePoolTwoLength){
                        return varNamePoolTwo[0] + varNamePoolTwo[value-varNamePoolTwoLength];
                    }
                    if(value < 3*varNamePoolOneLength){
                        return varNamePoolTwo[1] + varNamePoolTwo[value-(2*varNamePoolTwoLength)];
                    }
                    if(value < 4*varNamePoolOneLength){
                        return varNamePoolTwo[2] + varNamePoolTwo[value-(3*varNamePoolTwoLength)];
                    }
                    if(value < 5*varNamePoolOneLength){
                        return varNamePoolTwo[3] + varNamePoolTwo[value-(4*varNamePoolTwoLength)];
                    }
                    if(value < 6*varNamePoolOneLength){
                        return varNamePoolTwo[4] + varNamePoolTwo[value-(5*varNamePoolTwoLength)];
                    }
                    if(value < 7*varNamePoolOneLength){
                        return varNamePoolTwo[5] + varNamePoolTwo[value-(6*varNamePoolTwoLength)];
                    }
                }
                return varNamePoolTwo[value];
                break;
        case "css-id":
                if(varNamePoolTwo[value] == undefined){
                    //Need to "extend the index"
                    // 27       26
                    if(value < 2*varNamePoolTwoLength){
                        return varNamePoolTwo[0] + varNamePoolTwo[value-varNamePoolTwoLength];
                    }
                    if(value < 3*varNamePoolOneLength){
                        return varNamePoolTwo[1] + varNamePoolTwo[value-(2*varNamePoolTwoLength)];
                    }
                    if(value < 4*varNamePoolOneLength){
                        return varNamePoolTwo[2] + varNamePoolTwo[value-(3*varNamePoolTwoLength)];
                    }
                    if(value < 5*varNamePoolOneLength){
                        return varNamePoolTwo[3] + varNamePoolTwo[value-(4*varNamePoolTwoLength)];
                    }
                    if(value < 6*varNamePoolOneLength){
                        return varNamePoolTwo[4] + varNamePoolTwo[value-(5*varNamePoolTwoLength)];
                    }
                    if(value < 7*varNamePoolOneLength){
                        return varNamePoolTwo[5] + varNamePoolTwo[value-(6*varNamePoolTwoLength)];
                    }
                }
                return varNamePoolTwo[value];
                break;
        case "js-let":
                if(varNamePoolOne[value] == undefined){
                    //Need to "extend the index"
                    // 27       26
                    if(value < 2*varNamePoolOneLength){
                        return specialPool[0] + varNamePoolOne[value-varNamePoolOneLength]+varNamePoolOne[value-varNamePoolOneLength];
                    }
                    if(value < 3*varNamePoolOneLength){
                        return specialPool[0] + varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)];
                    }
                }
                return specialPool[0]+varNamePoolOne[value];
                break;
        case "css-class":
                if(varNamePoolOne[value] == undefined){
                    //Need to "extend the index"
                    // 27       26
                    if(value < 2*varNamePoolOneLength){
                        return varNamePoolOne[value-varNamePoolOneLength]+varNamePoolOne[value-varNamePoolOneLength]+specialPool[3];
                    }
                    if(value < 3*varNamePoolOneLength){
                        return varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)]+specialPool[3];
                    }
                }
                return varNamePoolOne[value]+specialPool[3];
                break;
        case "js-param":
                if(varNamePoolOne[value] == undefined){
                    //Need to "extend the index"
                    // 27       26
                    if(value < 2*varNamePoolOneLength){
                        return varNamePoolOne[value-varNamePoolOneLength]+varNamePoolOne[value-varNamePoolOneLength]+varNumPool[0];
                    }
                    if(value < 3*varNamePoolOneLength){
                        return varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)]+varNumPool[0];
                    }
                }
                return varNamePoolOne[value]+varNumPool[0];
                break;
        case "js-multi-param":
                if(varNamePoolOne[value] == undefined){
                    //Need to "extend the index"
                    // 27       26
                    if(value < 2*varNamePoolOneLength){
                        return varNamePoolOne[value-varNamePoolOneLength]+varNamePoolOne[value-varNamePoolOneLength]+varNumPool[aditional];
                    }
                    if(value < 3*varNamePoolOneLength){
                        return varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)]+varNamePoolOne[value-(2*varNamePoolOneLength)]+varNumPool[aditional];
                    }
                }
                return varNamePoolOne[value]+varNumPool[aditional];
                break;
        default:
            break;
    }

    return Error;
}