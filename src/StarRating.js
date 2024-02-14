import { useState } from "react";


const starContainerStyle = {
    display:"flex",
    flexDirection:"row",
    gap:"0.25%",
    alignItems:"center"
}

function StarRating({size, total, color, borderColor, className, setStarRating, starRating}){
    const [starNumber, setStarNumber] = useState(starRating);
    const [starOver, setStarOver] = useState(-1);

    // const coOrds = `${0.5*size},${0*size} ${0.6625*size},${0.325*size} ${1*size},${0.325*size} ${0.7477*size},${0.4953*size} ${1*size},${1*size} ${0.5*size},${0.6625*size} ${0*size},${1*size} ${0.2523*size},${0.4953*size} ${0*size},${0.325*size} ${0.3375*size},${0.325*size}`;
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

    const starOffStyle = {
        fill: "none",
        stroke: borderColor,
        strokeWidth:0.04*size 
    }
    const starOnStyle = {
        fill: color,
        stroke: borderColor,
        strokeWidth:0.04*size  
    }

    function handleSetStarRating(star){
        if (setStarRating !== undefined){
            setStarRating(Number(star));
        }
    }

    return (
        <div className={className} style={starContainerStyle}>
                {Array.from(Array(total), (item,index) =>
                    <div style={{display:"flex", alignItems:"center"}}> 
                    <svg height={size} width={size} xmlns="http://www.w3.org/2000/svg" 
                        onClick={()=> {setStarNumber(index+1); handleSetStarRating(index+1);}} 
                        key={index+1}
                        onMouseOver={() =>setStarOver(index+1)}
                        onMouseOut={() =>setStarOver(-1)}>
                        <polygon points={coOrds} style={starOver>-1 ? (index+1<=starOver ? starOnStyle : starOffStyle) :
                            ((index+1 <= starNumber && starNumber!==-1) ? starOnStyle : starOffStyle)} key={index+1}/>
                    </svg>
                    </div>        
                )
                }
                <div style={{marginLeft:"3%",color:color, fontSize:size*0.9, display:"flex", alignItems:"start"}}>
                    {starOver>-1 ? (starOver) :
                        (starNumber)
                    }
                </div>
        </div>
    );
}

export default StarRating;