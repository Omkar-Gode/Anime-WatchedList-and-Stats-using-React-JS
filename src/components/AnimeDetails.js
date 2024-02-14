import getStarCoOrdinates from "./getStarCoOrdinates";

function AnimeDetails({anime, handleSetSelectedAnime, children, starRating, watched}){
    return (
        <div className="animedetails">
            <div className="closebuttondiv">
                <button onClick={()=>{handleSetSelectedAnime(null)}}>&#10006;</button>
            </div>
            <div className="alldetails">
                <div className="topdetails">
                    <img className='detailsImg' src={anime.images.jpg.image_url} alt='animeImg'></img>
                    <div>
                        <h3>{anime.title}</h3>
                        <p>Episodes: <strong>{anime.episodes}</strong></p>
                        <p>
                            <svg height={12} width={12} xmlns="http://www.w3.org/2000/svg">
                                <polygon points={getStarCoOrdinates(12)} style={{fill:"cyan", stroke:"cyan"}}></polygon>
                             </svg><strong> {anime.score ? anime.score : 'N/A'}</strong>
                        </p>
                        <p>Watched: <strong>{watched === undefined ? <span style={{color:"red"}}>&#10006;</span> : (watched ? <span style={{color:'lightgreen'}}>&#10004;</span> : <span style={{color:"red"}}>&#10006;</span>)}</strong></p>
                    </div>
                </div>
                <div className="ratingcontainer">
                    {children}
                </div>
                <div className="bottomdetails">
                    {anime.synopsis}
                </div>
            </div>
        </div>
    );
}

export default AnimeDetails;