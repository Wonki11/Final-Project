import React, {useEffect , useState} from "react";
import axios from 'axios';
import './Moviechart.css'

const MovieChart = () => {
    const [MovieChart , setMovieChart] = useState([]);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/Wonki11/moviejson/master/movies.json')
        .then(res => {
            setMovieChart(res.data.results);
        })
        .catch(err => {
            alert(err + "발생했습니다.");
        });
    },[]);

    return(
        <div className="moviechart-container">
            <h1>영화차트</h1>
            <div className="moviechart-content">
                {MovieChart.map(Movies => (
                    <div key={Movies.id} className="moviechart-movies">
                        <img src={Movies.poster_path} />
                        <h2>{Movies.title}</h2>
                        <p>평점 : {Movies.vote_average}</p>
                        <p>개봉일 : {Movies.release_date}</p>

                    </div>
                ))}
            </div>

        </div>
    )
}
export default MovieChart;