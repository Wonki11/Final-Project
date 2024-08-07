import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";
import axios from "axios"; // 비동기로 axios를 사용해서 영화 데이터 로딩 경로설정

const Booking = () => {
  const location = useLocation(); // 전 무비차트페이지에서 선택한 값을 저장후 예매티켓으로 넘어오게끔 지정
  const queryParams = new URLSearchParams(location.search); // 쿼리파람으로 전 페이지의 내용 서치
  const movieId = queryParams.get("movieId");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [numPeople, setNumPeople] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [adultTickets, setAdultTickets] = useState(null); // 일반
  const [childTickets, setChildTickets] = useState(null); // 청소년
  const [totalPoints, setTotalPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(0);
  const [usingPoints, setUsingPoints] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/Wonki11/moviejson/master/movies.json"
        );
        setMovies(response.data.results);
        if (movieId) {
          const movie = response.data.results.find(
            (m) => m.id === parseInt(movieId)
          );
          setSelectedMovie(movie);
        }
      } catch (err) {
        console.error("Error loading movie data: ", err);
      }
    };
    fetchMovies();
  }, [movieId]);

  useEffect(() => {
    // useLocation과 연계 무비차트페이지에서 선택한 movieId 값을 json 파일에서 확인후 데이터값을 가지고 넘어옴 (해당 영화 예매하기 버튼 누르면 예매티켓에서 그 영화 예매하는 걸로 바로 시작)
    if (movieId && movies.length > 0) {
      const movie = movies.find((m) => m.id === parseInt(movieId)); // parseInt : 함수는 문자열 인자를 파싱하여 특정 진수(수의 진법 체계에서 기준이 되는 값)의 정수를 반환
      setSelectedMovie(movie);
    }
  }, [movieId, movies]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSeatClick = (seat) => {
    if (selectedSeat.includes(seat)) {
      setSelectedSeat(selectedSeat.filter((s) => s !== seat));
    } else if (selectedSeat.length < adultTickets + childTickets) {
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
    console.log("Poster path:", path); // 경로 확인용 로그
    return path;
  };

  const handleRegionChange = (region) => {
    // 지역을 핸들링할수 있는 변수 지정 강남,역삼
    setSelectedRegion(region);
  };

  const handleDateChange = (e) => {
    //날짜를 정할수 있는 핸들러
    setSelectedDate(e.target.value);
    setSelectedTime(null); // 날짜 변경 시 선택한 시간 초기화
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const WeekDate = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i <= 7; i++) {
      // for문을 사용하여 현재 날짜를 포함해 일주일 동안 날짜 출력
      const date = new Date(today);
      date.setDate(today.getDate() + i); // 오늘 날짜부터 i가 0이면 오늘 1이면 내일 식으로 계속 +
      const dateString = date.toISOString().split("T")[0];
      options.push(dateString);
    }
    return options;
    /*
        toISOString().split('T')[0]; : 날짜를 ISO 8601 문자열 형식으로 변환 (YYYY-MM-DD)
        split('T')[0]; : 문자열을 특정 구분자로 분할하고 그 중 첫 번째 부분을 선택하는 작업을 수행
        여기서 'T'는 반드시 존재해야 한다 ISO 8601 날짜 형식에서 날짜와 시간을 구분하는 문자로 없으면 구분하지 못해 기능실행 안됨
        */
  };

  const handleAdultTickets = (e) => {
    // 성인 티켓 제한 수량 숫자가아닌 값은 못들어가고 0보다 크고 4보다 작으며 성인티켓 값 + 어린이티켓 값 의 합이 4보다 작거나 같아야한다 라는 조건을 건 기능
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      value <= 4 &&
      value + childTickets <= 4
    ) {
      setAdultTickets(value);
      setSelectedSeat([]); // 티켓수 변경시 좌석 초기화
    }
  };

  const handleChildTickets = (e) => {
    // 어린이 티켓 제한 수량 숫자가아닌 값은 못들어가고 0보다 크고 4보다 작으며 어린이티켓 값 + 성인티켓 값 의 합이 4보다 작거나 같아야한다 라는 조건을 건 기능
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      value <= 4 &&
      value + adultTickets <= 4
    ) {
      setChildTickets(value);
      setSelectedSeat([]);
    }
  };

  const PointUseTotalPrice = () => {
    // 포인트 사용유무
    const totalPrice = adultTickets * 100 + childTickets * 100;
    const finalPrice = usingPoints ? totalPrice - usePoints : totalPrice; // 최종가격은 포인트를 사용했을때? 총가격에서 -사용한 포인트 : 총 토탈 가격
    return finalPrice > 0 ? finalPrice : 0; // 최종 결제 금액이 0보다 작으면 0으로 설정
  };

  const Accumulate = () => {
    //적립
    return usingPoints ? 0 : Math.floor((adultTickets * 100 + childTickets * 100) * 0.1); 
    //Math.floor 적립할때 소수점 버림처리하고 총 금액 0.1(10%)를 포인트로 적립
    //return usingPoints ? 0 포인트 사용하지 않을때(포인트사용이 0일때) 적립포인트 계산
  };

  const UsePointChange = (e) => {
    //숫자 이외의 다른 문자를 못넣게 기능 추가
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= totalPoints) {
      setUsePoints(value);
    }
  };

  const UsePoints = () => {
    // 포인트 사용
    setUsingPoints(!usingPoints);
    if (!usingPoints) {
      setUsePoints(0); // 만약 포인트 사용을 중지하면 기본값 포인트 0으로 설정
    }
  };

  const resetbutton = () => {
    setSelectedMovie(null);
    setSelectedRegion(null);
    setSelectedSeat([]);
    setSelectedTime(null);
    setSelectedDate(null);
    setNumPeople(1);
    setAdultTickets(0);
    setChildTickets(0);
  };

  return (
    <div className="booking">
      <div className="movie-list">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleMovieClick(movie)}
          >
            <img src={getPosterPath(movie)} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
      <div className="content">
        <div className="resetbutton">
          <button onClick={resetbutton}>예매 다시하기</button>
        </div>
        <div className="header">
          {selectedMovie ? (
            <>
              <div className="movie-info">
                <img src={getPosterPath(selectedMovie)} alt="Movie Poster" />
                <div className="movie-details">
                  <p>영화 : {selectedMovie.title}</p>
                  <p>영화관 : {selectedRegion}</p>
                  <p>관람일시 : {selectedDate}</p>
                  <p>상영시간 : {selectedTime}</p>
                  <p>
                    선택좌석 :{" "}
                    {selectedSeat.length > 0 ? selectedSeat.join(", ") : "없음"}
                  </p>
                </div>
              </div>
              <div className="total-price">
                <div className="infobutton">
                  <p>총 결제금액: {PointUseTotalPrice()} 원</p>
                  <p>
                    포인트 사용 여부 :
                    <input
                      type="checkbox"
                      checked={usingPoints} // 사용할 수 있는 총 포인트
                      onChange={UsePoints} // 사용할 포인트
                    />
                  </p>
                  {usingPoints && (
                    <p>
                      사용할 포인트 :
                      <input
                        type="number"
                        value={usePoints}
                        onChange={UsePointChange}
                      />
                    </p>
                  )}
                  <p>적립될 포인트 : {Accumulate()}점</p>
                  <button className="confirm-button">결제</button>
                </div>
              </div>
              <div>
              <p>※ 포인트를 사용해 예매 할 경우<br/>포인트는 따로 적립되지 않습니다.</p>
              </div>
            </>
          ) : (
            <div className="default-movie-info">
              <img
                src={process.env.PUBLIC_URL + "/movieimages/select_movie1.jpg"}
                alt="Default"
              />
              <p>선택한 영화가 없습니다.</p>
            </div>
          )}
        </div>
        <div className="steps-row">
          <div className="step">
            <p>STEP1: 영화관 선택</p>
            <button
              className="step-button"
              onClick={() => handleRegionChange("강남")}
            >
              강남
            </button>
            <button
              className="step-button"
              onClick={() => handleRegionChange("역삼")}
            >
              역삼
            </button>
          </div>
          <div className="step">
            <p>STEP2: 관람일 선택</p>
            <select value={selectedDate} onChange={handleDateChange}>
              <option value="">날짜를 선택하세요</option>
              {WeekDate().map((date) => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <div className="step">
            <p>STEP3: 관람시간 선택</p>
            <button
              className="step-button"
              onClick={() => handleTimeChange("10:40")}
            >
              10:40
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("13:45")}
            >
              13:45
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("17:00")}
            >
              17:00
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("19:40")}
            >
              19:40
            </button>
            <button
              className="step-button"
              onClick={() => handleTimeChange("22:20")}
            >
              22:20
            </button>
          </div>
          <div className="step">
            <p>STEP4: 좌석 및 잔여석 확인</p>
            <div className="seat-selection">
              <label>
                일반 (100원)
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={adultTickets}
                  onChange={handleAdultTickets}
                />
                <br />
              </label>
              <label>
                청소년 (100원)
                <input
                  type="number"
                  min="0"
                  max="4"
                  value={childTickets}
                  onChange={handleChildTickets}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="screen">
          <p className="moviescreen">SCREEN</p>
          <div className="seats">
            {["A", "B", "C", "D", "E", "F", "G", "H"].map((row) => (
              <div key={row} className="seat-row">
                <span className="row-label">{row}</span>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col) => (
                  <button
                    key={`${row}${col}`}
                    className={`seat ${
                      selectedSeat.includes(`${row}${col}`) ? "selected" : ""
                    }`}
                    onClick={() => handleSeatClick(`${row}${col}`)}
                    disabled={
                      row === "C" && (col === 4 || col === 5 || col === 6)
                    }
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

          <dl>
            <dt>1. 홈페이지 예매 후 영화별 실수관번호 발행될 수 있습니다.</dt>
            <dt>
              2. 영화 예매는 관람일 전날 취소 시 수수료 없이 취소 가능합니다.
            </dt>
            <dt>3. 상영관 입장은 상영시간 10분 전부터 가능합니다.</dt>
            <dt>4. 할인혜택은 중복적용이 불가합니다.</dt>
            <dt>5. 좌석은 한 계정당 총 4자리만 예매 가능합니다.</dt>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Booking;
