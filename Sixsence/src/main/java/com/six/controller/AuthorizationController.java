package com.six.controller;


import java.util.Base64;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

// 인증키 확인 후 전송하는 코드
@RestController
public class AuthorizationController {

	// springboot에서 application.properties에 작성한 값을 가져오기 위해
	// @Value 어노테이션을 사용
	// @Value("${application.properties에 작성한 변수명 작성}")
	// lombok 아님!!
	// org.springframework.beans.factory.annotation.Value;
	@Value("${apiSecretKey}")
	private String apiSecretKey; // 가져온 값을 담을 변수그릇 설정

	// HTTP 요청을 보내기 위해서 요청 보내는 것을 담을 공간 생성
	private final RestTemplate restTemplate = new RestTemplate();

	// const encryptedWidgetSecretKey = "Basic " + Buffer.from(widgetSecretKey +
	// ":").toString("base64");
	// const encryptedApiSecretKey = "Basic " + Buffer.from(apiSecretKey +
	// ":").toString("base64");
	// 주어진 비밀키를 Base64로 인코딩해서 HTTP 헤더에 비밀키를 가져갈수 있도록 설정
	/***
	 * Base64 사람이 작성한 데이터를 컴퓨터가 읽을 수 있는 텍스트 형식으로 변환하는 방법 예를 들어 Hello라고 작성한 내용을
	 * Base64를 이용해서 컴퓨터가 읽을 수 있도록 인코딩 사람언어 : Hello 컴퓨터언어로 변환 : SGVsbG8=
	 */
	private String encodeSecretKey(String secretKey) {
		return "Basic " + new String(Base64.getEncoder().encode((secretKey + ":").getBytes()));
	}

	/**
	 * // 브랜드페이 Access Token 발급 app.get("/callback-auth", function (req, res) {
	 * const { customerKey, code } = req.query;
	 * fetch("https://api.tosspayments.com/v1/brandpay/authorizations/access-token",
	 * { method: "POST", headers: {
	 */

	@GetMapping("/callback-auth") // app.get("/callback-auth",
	// function (req, res) { const { customerKey, code } = req.query;
	// function 기능명이 생략가능해서 없을 뿐 (req, res) { const { customerKey, code } =
	// req.query;
	// 자바는 기능명이 존재
	// function callbackAuth (req, res) { const { customerKey, code } = req.query;
	public ResponseEntity<?> callbackAuth(@RequestParam String customerKey, @RequestParam String code) {
		// fetch("https://api.tosspayments.com/v1/brandpay/authorizations/access-token",
		// {
		String url = "https://api.tosspayments.com/v1/brandpay/authorizations/access-token";
		//import org.springframework.http.HttpHeaders; Spring import
		HttpHeaders headers = new HttpHeaders();
		// Authorization: encryptedApiSecretKey,
		// "Content-Type": "application/json",
		// },
		headers.set("Authorization", encodeSecretKey(apiSecretKey));
		headers.set("Content-Type", "application/json");

		/**
		 * body: JSON.stringify({ grantType: "AuthorizationCode", customerKey, code, }),
		 */
		// body: JSON.stringify({
		// Map.of() : 맵 객체 안에 있는 of라는 기능
		// of 는 가져온 값을 추가하거나 제거할 수 없도록 설정해서 가져온 값이 오염되지 않도록 보호
		/* Map<String, String> map = Map.of(
		 *   "key1", "value1",
		 *   "key2", "value2"
		 * )
		 * */
		Map<String, String> requestBody = Map.of(
				"grantType", "AuthorizationCode", 
				"customerKey", customerKey, 
				"code",code
		);
		
		//  HttpEntity HTTP 요청의 본문과 요청조건사항이 담긴 headers를 가져와서 한 번에 묶어서 전달할 예정
		HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);
		//then(async function (response) {
	
		
		/***
			ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
			url = 요청을 보낼 주소값 가져오기
			HttpMethod.POST : 값을 삽입해야하는지 조회해야하는지 수정해야하는지 삭제해야하는지 전달
			entity : 우리가 코드를작성한 목적이 담긴 내용물과 제목 요청 조건 사항이 담긴 내용
			Map.class : 응답받을 데이터 타입을 지정 -> 응답을 key-value로 받아서 가지고 있겠다
		 */
		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);
		//const result = await response.json();
		//res.status(response.status).json(result);
		
		// 응답에 대한 실패 / 성공 결과가 담긴 내용을 전달
		return new ResponseEntity<>(response.getBody(), response.getStatusCode());
	}

}