import getStarCoOrdinates from "./getStarCoOrdinates";

function WatchedStats({watchedList}){
    return (
        <div className="watchedstats">
            <div>
                <p>Anime Watched</p>
                {watchedList.length === 0 ?
                    <strong>0</strong>:
                    <strong>{watchedList.length}</strong>
                }
            </div>
            <div>
                <p>Episodes Watched</p>
                {watchedList.length === 0 ?
                    <strong>0</strong>:
                    <strong>{watchedList.reduce((ac, cv) => ac + cv.episodes, 0)}</strong>
                }   
            </div>
            <div>
                <p>Avg <svg height={12} width={12} xmlns="http://www.w3.org/2000/svg">
                        <polygon points={getStarCoOrdinates(12)} style={{fill:"gold", stroke:"gold"}}></polygon>
                        </svg></p>
                {watchedList.length === 0 ?
                    <strong>N/A</strong>:
                    <strong>{(watchedList.reduce((ac, cv) => ac + cv.myRating, 0)/watchedList.length).toFixed(2)}</strong>
                }
            </div>
        </div>
    );
}

export default WatchedStats;