package com.six.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.Moviepay;
import com.six.mapper.MTmapper;

@Service
public class MTServicelmpl implements MTService{
	
	@Autowired
	MTmapper mtmapper;
	
	@Override
	public List<Moviepay> insertMT() {
		return mtmapper.insertMT();
	}
	
	@Override
	public void insertMT(Moviepay moviepay) {
		mtmapper.insertMT(moviepay);
	}
	
	
	
	
}
