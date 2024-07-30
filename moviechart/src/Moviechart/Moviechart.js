import React, {useEffect , useState} from "react";
import axios from 'axios';

const MovieChart = () => {
    const [MovieChart , setMovieChart] = useState([]);

    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/sangjunchung/jsonFolder/master/movie.json')
        .then(res => {
            setMovieChart(res.data.results);
        })
        .catch(err => {
            alert(err + "발생했습니다.");
        });
    },[]);

    return(
        <div>
            <h1>영화차트</h1>
            <div>
                {MovieChart.map(Movies => (
                    <div key={Movies.id}>
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