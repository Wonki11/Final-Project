import React, { useState,useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import './Booking.css';
import movieData from './movies.json';

const Booking = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const movieId = queryParams.get('movieId');
    const [movies, setMovies] = useState(movieData.results);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [numPeople, setNumPeople] = useState(1);

    useEffect(() => {
        if (movieId) {
            const movie = movies.find(m => m.id === parseInt(movieId));
            setSelectedMovie(movie);
        }
    }, [movieId,movies]);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleSeatClick = (seat) => {
        if (selectedSeat.includes(seat)) {
            setSelectedSeat(selectedSeat.filter(s => s !== seat));
        } else if (selectedSeat.length < numPeople) {
            setSelectedSeat([...selectedSeat, seat]);
        }
    };

    const handleNumPeopleChange = (event) => {
        const value = parseInt(event.target.value);
        if (value >= 1) {
            setNumPeople(value);
            setSelectedSeat([]);
        }
    };

    const getPosterPath = (movie) => {
        return `${process.env.PUBLIC_URL}/movieimages/${movie.poster_path}`;
    };

    return (
        <div className="booking">
            <div className="movie-list">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie)}>
                        <img src={getPosterPath(movie)} alt={movie.title} />
                        <p>{movie.title}</p>
                    </div>
                ))}
            </div>
            <div className="content">
                <div className="header">
                    {selectedMovie ? (
                        <>
                            <div className="movie-info">
                                <img src={getPosterPath(selectedMovie)} alt="Movie Poster" />
                                <div className="movie-details">
                                    <p>영화: {selectedMovie.title}</p>
                                    <p>관람일시: 2019-11-20 10:40</p>
                                    <p>선택좌석: {selectedSeat.length > 0 ? selectedSeat.join(', ') : '없음'}</p>
                                </div>
                            </div>
                            <div className="total-price">
                                <p>총 결제금액: 0원</p>
                            </div>
                        </>
                    ) : (
                        <div className="default-movie-info">
                            <img src={process.env.PUBLIC_URL + '/movieimages/select_movie1.jpg'} alt="Default" />
                            <p>선택한 영화가 없습니다.</p>
                        </div>
                    )}
                </div>
                <div className="steps-row">
                    <div className="step">
                        <p>STEP1: 영화관 선택</p>
                        <button className="step-button">서울</button>
                        <button className="step-button">경기</button>
                    </div>
                    <div className="step">
                        <p>STEP2: 관람일 선택</p>
                        <button className="step-button">2019-11-20</button>
                    </div>
                    <div className="step">
                        <p>STEP3: 관람시간 선택</p>
                        <button className="step-button">10:40</button>
                        <button className="step-button">13:45</button>
                        <button className="step-button">17:00</button>
                    </div>
                    <div className="step">
                        <p>STEP4: 좌석 및 잔여석 확인</p>
                        <div className="seat-selection">
                            <input 
                                type="number" 
                                min="1" 
                                value={numPeople} 
                                onChange={handleNumPeopleChange} 
                            />
                        </div>
                    </div>
                </div>
                <div className="screen">
                    <p>SCREEN</p>
                    <div className="seats">
                        {['A', 'B', 'C', 'D', 'E'].map((row) => (
                            <div key={row} className="seat-row">
                                <span className="row-label">{row}</span>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
                                    <button
                                        key={`${row}${col}`}
                                        className={`seat ${selectedSeat.includes(`${row}${col}`) ? 'selected' : ''}`}
                                        onClick={() => handleSeatClick(`${row}${col}`)}
                                        disabled={row === 'C' && (col === 4 || col === 5 || col === 6)}
                                    >
                                        {`${row}${col}`}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="notice">
                    <p>예매 시 주의사항</p>
                    <ol>
                        <li>홈페이지 예매 후 영화별 실수관번호 발행될 수 있습니다.</li>
                        <li>영화 예매는 관람일 전날 취소 시 수수료 없이 취소 가능합니다.</li>
                        <li>상영관 입장은 상영시간 10분 전부터 가능합니다.</li>
                        <li>할인혜택은 중복적용이 불가합니다.</li>
                    </ol>
                </div>
                <button className="confirm-button">결제</button>
            </div>
        </div>
    );
};

export default Booking;