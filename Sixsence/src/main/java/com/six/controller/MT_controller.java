package com.six.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.six.service.MT_service;



@RestController
public class MT_controller {
	
	@Autowired
	private MT_service mt_service;
	
	@PostMapping("") // 나중에 토스api 주소값이랑 연결
	public ResponseEntity<String> Movieticket()

}
