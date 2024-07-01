import React, { useEffect, useState } from 'react'
import { useLocation , useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import '../SearchPage/SearchPage.css'
import { useDebounce } from '../../hooks/useDebounce';

export default function Searchpage() {

  const navigate = useNavigate(); 
  const [searchResults, setSearchResults] = useState([]);

  console.log('useLocation()', useLocation()); 
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
    // url 정보를 가져오기 위함
  }

  let query = useQuery();
  const searchTerm = query.get("q");
  console.log(searchTerm); 
  const debouncedSearchTerm = useDebounce(searchTerm, 500); 
  // 검색 최적화를 위함
  // 타이핑을 멈출 때까지 keyup 이벤트 처리 지연

  useEffect(() => {
    if (debouncedSearchTerm) {
        fetchSearchMovie(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  const fetchSearchMovie = async (searchTerm) => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
        // 성인영화제외하고 보여주기
      )
      console.log(request);
      setSearchResults(request.data.results);
    } catch(error) {
      console.log("error", error); 
    }
  };


  const renderSearchResults = () => {
    return searchResults.length > 0 ? (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  onClick={() => navigate(`/${movie.id}`)}
                  className="movie__column-poster"
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          }
        })}
      </section>
    ) : (
      <section className="no-results">
        <div className="no-results__text">
          <p>
            찾고자하는 검색어"{debouncedSearchTerm}"에 맞는 영화가 없습니다.
          </p>
        </div>
      </section>
    );
  };

  return renderSearchResults();
}
