const LINE = (_) =>
  console.log(
    GREY + "---------------------------------------------------" + RESET
  );
const LN = (n) => console.log(Array(n).fill("-").join(""));
const BREAK = (_) => console.log("\n");

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";

const GREY = "\x1b[30;10;50m";

const HYPER = (url, text) => `\x1b]8;;${url}\x1b\\${text}\x1b[0m\x1b]8;;\x1b\\`;

function mToTime(min) {
  let output = "";
  if (min > 60) {
    output += BOLD + Math.floor(min / 60) + RESET + " Hours ";
  }

  output += BOLD + (min % 60) + RESET + " Mins";
  return output;
}

function drawPath(data) {
  let out = Array(20).fill(GREY + "-" + RESET);
  // 6 4 10
  out[
    Math.round(
      (data.distance_from_departure /
        (data.distance_from_departure + data.distance_to_arrival)) *
        20
    )
  ] = "🤠";

  out[0] = "📍";
  out[out.length - 1] = "🏁";

  console.log(out.join(""));
}

function drawScreen(resp) {
  BREAK();
  BREAK();
  LINE();
  console.log("Outernet Flight Tracker 1.0  🛬  🛫   Made by Ajith");
  LINE();
  BREAK();
  const aTime = new Date.parse(resp.flightInfoFIG2.arrival.time.estimated);
  const arriveTime = new Intl.TimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(aTime);

  console.log(
    `${BOLD + resp.flightInfoFIG2.departure.airport.iata}     ${
      RESET + GREY + resp.systemInfo.flightNo + RESET
    }      ${
      BOLD + resp.flightInfoFIG2.arrival.airport.iata + RESET + GREY
    }  <~~~>  arriving at ${RESET + BOLD + arriveTime + RESET}`
  );
  drawPath(resp.flightInfoFIG2.flight.gps.calculations);
  // BREAK();
  console.log(
    ` ${mToTime(resp.systemInfo.timeToLand)} Left    ${GREY}<--=-->${RESET}   ${
      BOLD +
      Math.round(
        resp.flightInfoFIG2.flight.gps.calculations.distance_to_arrival * 100
      ) /
        100 +
      RESET
    } Miles`
  );
  BREAK();
  console.log(
    `💨 ${BOLD + resp.flightInfoFIG2.flight.gps.speed} MPH  🧭  ${
      BOLD + resp.flightInfoFIG2.flight.gps.course + RESET
    }° 🏔️  ${BOLD + Math.round(resp.systemInfo.aboveSeaLevel)}ft${RESET}`
  );
  BREAK();
  BREAK();
}

// Juicy ones
/*

GPS(lat,long)
Departure, Arrival
Time
Speed
FlightInfo (Plane type) (flight number) (registration too)(airline)
Bearing



*/
fetch("https://wifi.inflightinternet.com/abp/v2/statusTray?fig2=true", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.5",
  },
  body: null,
  method: "GET",
})
  .then((resp) => resp.json())
  .then((json) => {
    console.log(json.Response);
    drawScreen(json.Response);
  });
setInterval(() => {
  fetch("https://wifi.inflightinternet.com/abp/v2/statusTray?fig2=true", {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.5",
    },
    body: null,
    method: "GET",
  })
    .then((resp) => resp.json())
    .then((json) => {
      drawScreen(json.Response);
      // console.log(json.Response);
    });
}, 10000);

const R = {
  status: 200,
  flightInfo: {
    logo: null,
    airlineName: null,
    airlineCode: "ASA",
    airlineCodeIata: null,
    tailNumber: "N581AS",
    flightNumberInfo: "ASA357",
    flightNumberAlpha: null,
    flightNumberNumeric: null,
    departureAirportCode: "KBOS",
    destinationAirportCode: "KSFO",
    departureAirportCodeIata: "BOS",
    destinationAirportCodeIata: "SFO",
    departureAirportLatitude: 42.36,
    destinationAirportLatitude: 37.61,
    departureAirportLongitude: -71,
    destinationAirportLongitude: -122.37,
    origin: null,
    destination: null,
    departureCity: null,
    destinationCity: null,
    expectedArrival: "2023-08-01T04:24:00.00Z",
    departureTime: "2023-07-31T22:29:00.00Z",
    abpVersion: "9.0.0",
    acpuVersion: "3.1.7",
    videoService: false,
    latitude: 38.1111,
    longitude: -111.3636,
    altitude: 27652.572,
    localTime: null,
    utcTime: "2023-08-01T03:05:07.514Z",
    destinationTimeZoneOffset: -7,
    hspeed: 535.3539,
    vspeed: 0.67045456,
  },
  gogoFacts:
    "The Wright brothers' first flight (120 feet) could have taken place within the economy section of a Boeing 747-400.",
  serviceInfo: {
    service: "Inactive",
    remaining: 0,
    quality: null,
    productCode: null,
    alerts: [],
  },
  flightInfoFIG2: {
    flight: {
      id: 58375506,
      key_time: "2023-07-31T21:50:00Z",
      flight_state: "IN_AIR",
      flight_number: "357",
      flight_identifier: "ASA357",
      oooi: {
        out: "2023-07-31T21:33:00Z",
        off: "2023-07-31T22:29:00Z",
        attributes: {},
      },
      gps: {
        time: "2023-08-01T03:00:10Z",
        latitude: 38.08528,
        longitude: -110.57833,
        speed: 442,
        flight_level: 380,
        calculations: {
          bearing_from_departure: 275.34994767740096,
          distance_from_departure: 1815.5436725248132,
          bearing_to_arrival: 270.7707704171551,
          distance_to_arrival: 559.6226719217634,
          direct_course_distance: 2344.02517257307,
          attributes: {},
        },
        attributes: {},
        estimated: {
          time: "2023-08-01T03:00:27.955Z",
          latitude: 38.08591158597107,
          longitude: -110.62497237439638,
          speed: 442,
          calculations: {
            bearing_from_departure: 275.37702547136956,
            distance_from_departure: 1817.5902920807075,
            bearing_to_arrival: 270.741101010821,
            distance_to_arrival: 557.4183528319043,
            direct_course_distance: 2344.02517257307,
            attributes: {},
          },
          attributes: {},
        },
        course: 271,
      },
      time_above_service_level: {
        first_known: "2023-07-31T22:29:49Z",
        last_known: "2023-08-01T02:59:49Z",
        attributes: {},
      },
      attributes: {},
    },
    aircraft: {
      id: 5066,
      registration_number: "N581AS",
      airline_icao: {
        attributes: {},
        owner: "ASA",
        partner: "ASA",
      },
      fleet_number: "581",
      aircraft_type: "B737-890",
      seat_count: 159,
      airlines: [
        {
          id: 2487,
          name: "Alaska Airlines",
          icao: "ASA",
          iata: "AS",
          currency: "USD",
          locale: "en-US",
          call_sign: "ALASKA",
          incorporated_country: "US",
          incorporated_country_name: "United States",
          attributes: {},
        },
      ],
      connections: [
        {
          id: 10064,
          aircraft_id: 5066,
          connectivity_type: "2KU",
          connectivity_type_last_changed: "2021-05-01T00:51:24.190Z",
          attributes: {},
          connectivity_installed_by_oem: false,
        },
      ],
      attributes: {
        firehose_sync: "true",
        product: "flight_track",
        video_capability: "W_IFE",
        connectivity_identifier: "N581AS",
        firehose_sync_lock: "false",
        serial_number: "35188",
        gogo_business: "EXTERNAL",
        source: "NAV",
        official_registration: "N581AS",
        transaction_routing_id: "L1",
        manufacturer: "BOE",
        connectivity_provider: "INST",
        mode_s_code: "A779B0",
        source_id: "24;mBKoAAJ7/04ANQA4ADEAQQBT10;13182847140;",
        class: "MEDIUM_JET",
        make: "737-800",
        status: "Active",
      },
    },
    departure: {
      airport: {
        id: 18433,
        icao: "KBOS",
        iata: "BOS",
        name: "General Edward Lawrence Logan Intl",
        mailing_address: {
          municipality: "Boston",
          administrative_area: "MA",
          administrative_area_name: "Massachusetts",
          country: "US",
          country_name: "United States",
          postal_code: "02128",
          attributes: {},
        },
        location: {
          latitude: 42.362944444444445,
          longitude: -71.00638888888889,
          elevation: 9,
          attributes: {},
        },
        time_zone_offset: -4,
        attributes: {
          product_region: "DOM",
          marketing_municipality: "Boston",
          billing_municipality: "Boston",
          icao_update_time: "1525277549132",
        },
      },
      time: {
        actual: "2023-07-31T22:29:00Z",
        estimated: "2023-07-31T21:40:00Z",
        computed: "2023-07-31T22:29:00Z",
        attributes: {},
        scheduled: "2023-07-31T21:40:00Z",
      },
      attributes: {},
      gate: "B40",
    },
    arrival: {
      airport: {
        id: 18454,
        icao: "KSFO",
        iata: "SFO",
        name: "San Francisco Intl",
        mailing_address: {
          municipality: "San Francisco",
          administrative_area: "CA",
          administrative_area_name: "California",
          country: "US",
          country_name: "United States",
          postal_code: "94030",
          attributes: {},
        },
        location: {
          latitude: 37.618805555555554,
          longitude: -122.37541666666667,
          elevation: 1,
          attributes: {},
        },
        time_zone_offset: -7,
        attributes: {
          product_region: "DOM",
          marketing_municipality: "San Francisco",
          billing_municipality: "San Francisco",
          icao_update_time: "1525278771284",
        },
      },
      time: {
        estimated: "2023-08-01T04:24:00Z",
        computed: "2023-08-01T04:24:00Z",
        attributes: {},
        scheduled: "2023-08-01T04:25:00Z",
      },
      attributes: {},
      gate: "D6",
    },
    statusCode: 200,
    statusMessage: "OK",
  },
  ipAddress: "172.19.207.74",
  macAddress: "C8:89:F3:BD:52:D2",
  systemInfo: {
    wapType: "ACWAP",
    systemType: "2KU",
    arincEnabled: "true",
    horizontalVelocity: "535.3539",
    verticalVelocity: "0.67045456",
    aboveGndLevel: "27652.572",
    aboveSeaLevel: "38001.625",
    flightPhase: "EN_ROUTE",
    flightNo: "ASA357",
    timeToLand: "83",
    paxSsidStatus: "",
    casSsidStatus: "UP",
    countryCode: "US",
    airportCode: "0",
    linkState: "UP",
    linkType: "2KU",
    tunnelState: "UP",
    tunnelType: "VTP",
    ifcPaxServiceState: "UP",
    ifcCasServiceState: "UP",
    currentLinkStatusCode: "3001",
    currentLinkStatusDescription: "NORMAL_OPERATION",
    noSubscribedUsers: "69",
    aircraftType: "B738",
  },
  device_iid:
    "621296700dd67953dd4e1df3d2393dbe30a5bea73909f0de5e38475d6dd2ad49",
};
