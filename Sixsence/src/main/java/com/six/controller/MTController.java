package com.six.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.six.dto.Moviepay;
import com.six.service.MTServicelmpl;

@RestController
@RequestMapping("/moviepay")
public class MTController {
	
	@Autowired
	private MTServicelmpl mtservicelmpl;
	
	@PostMapping("/insert")
	public ResponseEntity<String> insertMT
	(@RequestBody Moviepay moviepay) {
		return ResponseEntity.ok("DB insert success");
	}

}
