package com.six.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.six.dto.Moviepay;

@Mapper
public interface MTmapper {
	List<Moviepay> insertMT();
	void insertMT(Moviepay moviepay);

}
