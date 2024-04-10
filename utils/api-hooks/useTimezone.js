async function useTimezone() {
  let timezone;

  const timezoneUrl = process.env.TIMEZONE_TOKEN_URL;

  try {
    const tz = await fetch(timezoneUrl);
    console.log("tz-----------------",tz)
    timezone = await tz.json();
    return {success: true, timezone: timezone};
  } catch (error) {
    console.log("+++++++++++",error)
    return {success: false}
  }

  // Log
  //timezoneapi.io/
  //       {
  //     "meta": {
  //         "code": "200"
  //     },
  //     "data": {
  //         "ip": "66.220.144.0",
  //         "city": "Menlo Park",
  //         "postal": "94025",
  //         "state": "California",
  //         "state_code": "CA",
  //         "country": "United States",
  //         "country_code": "US",
  //         "location": "37.459,-122.1781",
  //         "timezone": {
  //             "id": "America\/Los_Angeles",
  //             "location": "34.05222,-118.24278",
  //             "country_code": "US",
  //             "country_name": "United States of America",
  //             "iso3166_1_alpha_2": "US",
  //             "iso3166_1_alpha_3": "USA",
  //             "un_m49_code": "840",
  //             "itu": "USA",
  //             "marc": "xxu",
  //             "wmo": "US",
  //             "ds": "USA",
  //             "phone_prefix": "1",
  //             "fifa": "USA",
  //             "fips": "US",
  //             "gual": "259",
  //             "ioc": "USA",
  //             "currency_alpha_code": "USD",
  //             "currency_country_name": "UNITED STATES",
  //             "currency_minor_unit": "2",
  //             "currency_name": "US Dollar",
  //             "currency_code": "840",
  //             "independent": "Yes",
  //             "capital": "Washington",
  //             "continent": "NA",
  //             "tld": ".us",
  //             "languages": "en-US,es-US,haw,fr",
  //             "geoname_id": "6252001",
  //             "edgar": ""
  //         },
  //         "datetime": {
  //             "date": "12\/05\/2021",
  //             "date_time": "12\/05\/2021 01:35:13",
  //             "date_time_txt": "Monday, December 5, 2021 01:35:13",
  //             "date_time_wti": "Mon, 05 Dec 2021 01:35:13 -0800",
  //             "date_time_ymd": "2021-12-05T01:35:13-08:00",
  //             "time": "01:35:13",
  //             "month": "12",
  //             "month_wilz": "12",
  //             "month_abbr": "Dec",
  //             "month_full": "December",
  //             "month_days": "31",
  //             "day": "5",
  //             "day_wilz": "05",
  //             "day_abbr": "Mon",
  //             "day_full": "Monday",
  //             "year": "2021",
  //             "year_abbr": "16",
  //             "hour_12_wolz": "1",
  //             "hour_12_wilz": "01",
  //             "hour_24_wolz": "1",
  //             "hour_24_wilz": "01",
  //             "hour_am_pm": "am",
  //             "minutes": "35",
  //             "seconds": "13",
  //             "week": "49",
  //             "offset_seconds": "-28800",
  //             "offset_minutes": "-480",
  //             "offset_hours": "-8",
  //             "offset_gmt": "-08:00",
  //             "offset_tzid": "America\/Los_Angeles",
  //             "offset_tzab": "PST",
  //             "offset_tzfull": "Pacific Standard Time",
  //             "tz_string": "PST8PDT,M3.3.0/2,M11.2.0/2",
  //             "dst": "false",
  //             "dst_observes": "true",
  //             "timeday_spe": "late_night",
  //             "timeday_gen": "night"
  //         }
  //     }
  // }
}

export default useTimezone;
