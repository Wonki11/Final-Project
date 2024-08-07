package com.six.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.six.dto.MT_dto;

@Mapper
public interface MT_mapper {
	List<MT_dto> insertMT();
	void insertMT(MT_dto mt_dto);

}
