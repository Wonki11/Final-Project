package com.six.dto;

import java.sql.Date;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor

public class Moviepay {
	private int moviepayNo;
	private int moviepayAdult;
	private int moviepayChild;
	private int moviepayAdultpay;
	private int moviepayChildpay;
	private int moviepayPrice;
	private String moviepaySeat;
	private String moviepayPaydate;
	private String moviepayPointUse;
	private String moviepayPoint;
	private String moviepayRefund;
	private String moviepayViewdate;
	private int movieNo;
	private int memberNo;
	private String moviepayViewtime;
	private String moviepayViewregion;
}
