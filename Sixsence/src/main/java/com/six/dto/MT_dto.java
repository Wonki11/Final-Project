package com.six.dto;

import java.sql.Date;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class MT_dto {
	private int moviepay_adult;
	private int moviepay_child;
	private int moviepay_adultpay;
	private int moviepay_childpay;
	private int moviepay_price;
	private String moviepay_seat;
	private String moviepay_paydate;
	private String moviepay_point_use;
	private String moviepay_point;
	private String moviepay_refund;
	private String moviepay_viewdate;
	private String moviepay_viewtime; 
	private int movie_no;
	private int member_no;
	
	

}
