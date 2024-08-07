package com.six.service;

import java.util.List;

import com.six.dto.MT_dto;

public interface MT_service {
	List<MT_dto> insertMT();
	void insertMT(MT_dto mt_dto);
	
}
