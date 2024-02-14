import getStarCoOrdinates from "./getStarCoOrdinates";

function Anime({anime, handleSetSelectedAnime}){
    return (
        <div className="anime" onClick={() => handleSetSelectedAnime(anime)}>
            <div>
                <img className='animeImg' src={anime.images.jpg.image_url} style={{height:'100px',width:'70px'}} alt="Anime Poster"></img>
            </div>
            <div>
                <p className="movieProperty">Title: <strong>{anime.title}</strong> </p>
                <p className="movieProperty">Episodes: <strong>{anime.episodes}</strong> </p>
                <p className="movieProperty">
                    <svg height={12} width={12} xmlns="http://www.w3.org/2000/svg">
                        <polygon points={getStarCoOrdinates(12)} style={{fill:"cyan", stroke:"cyan"}}></polygon>
                    </svg><strong> {anime.score ? anime.score : 'N/A'}</strong>
                </p>
                {anime.watched && 
                    <>
                        <svg height={12} width={12} xmlns="http://www.w3.org/2000/svg">
                            <polygon points={getStarCoOrdinates(12)} style={{fill:"gold", stroke:"gold"}}></polygon>
                        </svg><strong> {anime.myRating ? anime.myRating : 'N/A'}</strong>
                    </>
                }
                        
            </div>

        </div>
    );
}

export default Anime;