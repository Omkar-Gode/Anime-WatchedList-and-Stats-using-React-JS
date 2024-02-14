import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import NavBar from "./components/NavBar";
import Result from "./components/Result";
import Anime from "./components/Anime";
import AnimeList from "./components/AnimeList";
import AnimeDetails from "./components/AnimeDetails";
import Box from "./components/Box";
import Main from "./components/Main";
import WatchedStats from "./components/WatchedStats";

function App(){
    const [animes,setAnimes] = useState([]);
    const [query, setQuery] = useState('');
    const [selectedAnime, setSelectedAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [starRating, setStarRating] = useState(0);
    const [watchedList, setWatchedList] = useState([]);


    // useEffect(function () {
    //     const controller = new AbortController();
    //     async function getAnimeList(url){
    //         try{
    //             setIsLoading(true);

    //             const res =  await fetch(url+query, {signal: controller.signal});
    //             const data = await res.json();

    //             setAnimes(data.data);
    //         }
    //         catch (err){
    //             console.log("Something Happened \n",err);
    //         }
    //         finally{
    //             setIsLoading(false);
    //         }
    //     }

    //     if (query.length <3){
    //         setAnimes([]);
    //         return;
    //     }

    //     getAnimeList('https://api.jikan.moe/v4/anime?q=');

    //     return function (){
    //         controller.abort();
    //     }
    // },
    // [query]);


    function handleSetMovies(){
        async function getAnime(url,query){
            try{
                setIsLoading(true);
                console.log(url+query);

                const res = await fetch(url+query);
                // if (!res.ok){
                //     throw new Error("Problem in Response",res.status,res.statusText);
                // }
                // if (!res.data){
                //     throw new Error("Problem in Response from server"+res.status+res.statusText);
                // }

                const data = await res.json();

                setAnimes(data.data);
            }
            catch(err){
                console.log("something Happened\n",err);
            }
            finally{
                setIsLoading(false);
            }
          }
          
          getAnime('https://api.jikan.moe/v4/anime?q=',query);
    }

    function handleSetSelectedAnime(anime){
        let selAnime = anime;
        if (anime !== null){
            [selAnime] = watchedList.filter(a => a.mal_id === anime.mal_id && a);
            if (selAnime === undefined){
                selAnime = anime
            }
        }
        setStarRating(selAnime === null ? 0 : (selAnime.watched ? selAnime.myRating : 0));
        setSelectedAnime(selAnime);
    }

    function addToList(anime){
        const newAnime = {...anime};
        newAnime.watched = true;
        newAnime.myRating = starRating;
        setWatchedList(watchedList => [...watchedList, newAnime]);
        setSelectedAnime(null);
    }

    function removeFromList(anime){
        setWatchedList(watchedList => watchedList.filter(wa => wa.mal_id !== anime.mal_id && wa));
        setStarRating(0);
        setSelectedAnime(null);
    }

    function updateList(anime){
        setWatchedList(watchedList => watchedList.map(wa => wa.mal_id === anime.mal_id ? {...anime, myRating:starRating} : wa));
        setSelectedAnime(null);
    }

    function containsAnime(arr,obj){
        let contains = false;
        for(let i=0; i<arr.length; i++){
            if (arr[i].mal_id === obj.mal_id){
                contains = true;
                break;
            }
        }
        return contains;
    }

    return(
        <div className="container">
            <NavBar>
                <div className="query">
                    <input type="text" placeholder="type anime name ..."value={query}  onChange={(e)=>{setQuery(e.target.value)}}></input>
                    <button onClick={() => {handleSetMovies();}}>Search</button>
                </div>
                <Result>
                    {query==='' ? 
                    <p>Search something..</p> :
                    <p><strong>{animes.length}</strong> {query} results</p>
                    }
                </Result>
            </NavBar>
            <Main>
                <Box title="Searched Results">
                    <div className="loading" >{isLoading && <div><div className="loader"></div><br/><>Loading ... Please wait</></div>}</div>
                    <div className="loading" >{!isLoading && animes.length===0 && <>No Results Found... 😞<br/>&#128269; Try Searching something</>}</div>
                    <AnimeList>
                        {!isLoading && animes.length>0 &&
                            animes.map(anime => 
                                (<Anime anime={anime} handleSetSelectedAnime={handleSetSelectedAnime} key={anime.mal_id}/>))
                        }
                    </AnimeList>
                </Box>
                {selectedAnime ? (
                    containsAnime(watchedList,selectedAnime) ?
                    <AnimeDetails anime={selectedAnime} watched={selectedAnime.watched} handleSetSelectedAnime={handleSetSelectedAnime} starRating={starRating} key={selectedAnime.mal_id}>
                        <p>Your Rating: </p>
                        <StarRating size={20} total={10} color="gold" borderColor="gold" className="starrating" starRating={selectedAnime.myRating} setStarRating={setStarRating}/>
                        <div className="srbuttondiv">
                            <button onClick={()=>{updateList(selectedAnime);}}>Update Rating</button>
                            <button onClick={()=>{removeFromList(selectedAnime);}}>Remove from Watched</button>
                        </div>
                        
                        {/* {starRating>0 && <button onClick={()=>{addToList(selectedAnime)}}>Add to Watched</button>} */}
                    </AnimeDetails> :
                    <AnimeDetails anime={selectedAnime} watched={selectedAnime.watched} handleSetSelectedAnime={handleSetSelectedAnime} starRating={starRating} key={selectedAnime.mal_id}>
                        <p>Give Rating: </p>
                        <StarRating size={20} total={10} color="cyan" borderColor="cyan" className="starrating" starRating={0} setStarRating={setStarRating}/>
                        <div className="srbuttondiv">
                            {starRating>0 && <button onClick={()=>{addToList(selectedAnime)}}>Add to Watched</button>}
                        </div>
                    </AnimeDetails>
                                ):
                    <Box title="Watched Stats">
                        <WatchedStats watchedList={watchedList}/>
                        <p className="wlLabel">Watched List</p>
                        <div className="watchedlist">
                            {watchedList.map(anime =>
                                (<Anime anime={anime} handleSetSelectedAnime={handleSetSelectedAnime}/>))
                            }
                        </div>
                    </Box>
                }

            </Main>
        </div>
    );
}


export default App;