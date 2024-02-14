function getStarCoOrdinates(size){
    const coOrds = `${(1/2)*size},${0} 
                    ${(1.211/2)*size},${(0.6/2)*size} 
                    ${(1.917/2)*size},${(0.6/2)*size} 
                    ${(1.361/2)*size},${(1.025/2)*size} 
                    ${(1.627/2)*size},${(1.779/2)*size} 
                    ${(1/2)*size},${(1.3/2)*size}
                    ${(0.373/2)*size},${(1.779/2)*size}
                    ${(0.639/2)*size},${(1.025/2)*size} 
                    ${(0.083/2)*size},${(0.6/2)*size} 
                    ${(0.789/2)*size},${(0.6/2)*size}`;
    return coOrds;
}

export default getStarCoOrdinates;