import React, { useState,useEffect } from 'react';
import { useLocation} from 'react-router-dom';
import './Booking.css';
//import movieData from './movies.json';
import axios from 'axios'; // 비동기로 axios를 사용해서 영화 데이터 로딩 경로설정 

const Booking = () => {
    const location = useLocation(); // 전 무비차트페이지에서 선택한 값을 저장후 예매티켓으로 넘어오게끔 지정
    const queryParams = new URLSearchParams(location.search); // 쿼리파람으로 전 페이지의 내용 서치
    const movieId = queryParams.get('movieId');
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [numPeople, setNumPeople] = useState(1);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    useEffect(() => {
       const fetchMovies = async () => {
        try{
            const response = await axios.get('https://raw.githubusercontent.com/Wonki11/moviejson/master/movies.json');
            setMovies(response.data.results);
            if(movieId) {
                const movie = response.data.results.find(m => m.id === parseInt(movieId));
                setSelectedMovie(movie)
            }
        } catch (err) {
            console.error("Error loading movie data: ", err);
        }
       };
       fetchMovies();
    },[movieId]);

    useEffect(() => { // useLocation과 연계 무비차트페이지에서 선택한 movieId 값을 json 파일에서 확인후 데이터값을 가지고 넘어옴 (해당 영화 예매하기 버튼 누르면 예매티켓에서 그 영화 예매하는 걸로 바로 시작)
        if (movieId && movies.length > 0) {
            const movie = movies.find(m => m.id === parseInt(movieId)); // parseInt : 함수는 문자열 인자를 파싱하여 특정 진수(수의 진법 체계에서 기준이 되는 값)의 정수를 반환
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
        if (!isNaN(value) && value >= 1 && value <= 4) {
            setNumPeople(value);
            setSelectedSeat([]);
        } 
    };

     const getPosterPath = (movie) => {
        const path = movie.poster_path;
        console.log('Poster path:', path); // 경로 확인용 로그
        return path;
    };

    const handleRegionChange = (region) => {
        setSelectedRegion(region);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setSelectedTime(null) // 날짜 변경 시 선택한 시간 초기화
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    }

    const WeekDate = () => {
        const options = [];
        const today = new Date(); 
        for (let i = 0; i <= 7; i++){
            const date = new Date(today);
            date.setDate(today.getDate()+ i);
            const dateString = date.toISOString().split('T')[0];
            options.push(dateString);
        }
        return options;
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
                                    <p>영화 : {selectedMovie.title}</p>
                                    <p>영화관 : {selectedRegion}</p>
                                    <p>관람일시 : {selectedDate} {selectedTime}</p>
                                    <p>선택좌석 : {selectedSeat.length > 0 ? selectedSeat.join(', ') : '없음'}</p>
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
                        <button className="step-button" onClick={() => handleRegionChange('강남')}>강남</button>
                        <button className="step-button" onClick={() => handleRegionChange('역삼')}>역삼</button>
                    </div>
                    <div className="step">
                        <p>STEP2: 관람일 선택</p>
                        <select value={selectedDate} onChange={handleDateChange}>
                            <option value="">날짜를 선택하세요</option>
                            {WeekDate().map(date => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                    </div>
                    <div className="step">
                        <p>STEP3: 관람시간 선택</p>
                        <button className="step-button" onClick={() => handleTimeChange('10:40')}>10:40</button>
                        <button className="step-button" onClick={() => handleTimeChange('13:45')}>13:45</button>
                        <button className="step-button" onClick={() => handleTimeChange('17:00')}>17:00</button>
                        <button className="step-button" onClick={() => handleTimeChange('19:40')}>19:40</button>
                        <button className="step-button" onClick={() => handleTimeChange('22:20')}>22:20</button>
                    </div>
                    <div className="step">
                        <p>STEP4: 좌석 및 잔여석 확인</p>
                        <div className="seat-selection">
                            <input 
                                type="number" 
                                min="1" 
                                max="4"
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
                        <li>좌석은 한 계정당 4자리만 예매 가능합니다.</li>
                    </ol>
                </div>
                <button className="confirm-button">결제</button>
            </div>
        </div>
    );
};

export default Booking;