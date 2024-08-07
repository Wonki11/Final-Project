package com.six.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.six.dto.MT_dto;
import com.six.mapper.MT_mapper;

@Service
public class MT_servicelmpl {
	
	@Autowired
	private MT_mapper mt_mapper;
	
	@Override
	public List<MT_dto> insertMT() {
		return mt_mapper.insertMT();
	}
	@Override
	public void insertMT(MT_dto mt_dto) {
		mt_mapper.insertMT(mt_dto);
	}

}
