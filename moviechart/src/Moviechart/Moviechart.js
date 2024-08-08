import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Moviechart.css";

const MovieChart = () => {
  const [movieChart, setMovieChart] = useState([]);
  const [movieOption, setMovieOption] = useState("rating");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/Wonki11/moviejson/master/movies.json"
      )
      .then((res) => {
        console.log('Response data:', res.data);
        if (res.data && res.data.results) {
          setMovieChart(res.data.results);
        } else {
          console.error("Invalid data format", res.data);
        }
      })
      .catch((err) => {
        alert(err + "발생했습니다.");
      });
  }, []);

  const handleOption = (e) => {
    setMovieOption(e.target.value);
  };

  const sortedMovies = [...movieChart].sort((a, b) => {
    if (movieOption === "rating") {
      return b.vote_average - a.vote_average;
    } else if (movieOption === "alphabetical") {
      return a.title.localeCompare(b.title, "ko");
    }
    return 0;
  });
  // 무비 카테고리 별로 나누는 기능 rating : average 평점 alphabetical 가나다 순

  return (
    <div>
      <div className="movie-options">
        <label>
          <input
            type="radio"
            value="alphabetical"
            checked={movieOption === "alphabetical"}
            onChange={handleOption}
          />
          가나다순
        </label>
        <label>
          <input
            type="radio"
            value="rating"
            checked={movieOption === "rating"}
            onChange={handleOption}
          />
          평점순
        </label>
      </div>

      <div className="moviechart-container">
        {sortedMovies.slice(0, 20).map((movie) => (
          <div key={movie.id} className="moviechart-movies">
            <img src={movie.poster_path} alt={movie.title} />
            <h2>{movie.title}</h2>
            <p>평점 : {movie.vote_average}</p>
            <p>개봉일 : {movie.release_date}</p>
            <a href={`/movieboard-app?movieId=${movie.id}`} className="btn">
              예매하기
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieChart;