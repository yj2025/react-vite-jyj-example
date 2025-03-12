import React, { useEffect, useRef, useState } from "react";

const NaverMap = () => {
  const mapRef = useRef(null); // 지도 인스턴스
  const infoWindowRef = useRef(null); // 정보창 인스턴스
  const markerList = useRef([]); // 마커 리스트
  const [address, setAddress] = useState(""); // 입력한 주소 상태
  const maxMarkers = 5; // 최대 마커 개수

  // 지도 및 초기 이벤트 설정 (컴포넌트 마운트 시 1회 실행)
  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    // 지도 초기화 함수
    const initMap = (center) => {
      mapRef.current = new naver.maps.Map("map", {
        center: center,
        zoom: 14,
        minZoom: 12,
        maxZoom: 16,
      });

      infoWindowRef.current = new naver.maps.InfoWindow({
        anchorSkew: true,
      });

      mapRef.current.setCursor("pointer");

      // 지도 클릭 시 마커 추가 및 좌표로 주소 검색
      naver.maps.Event.addListener(mapRef.current, "click", function (e) {
        const markerPosition = e.coord;

        // 최대 마커 수 초과 시 가장 오래된 마커 제거
        if (markerList.current.length >= maxMarkers) {
          const removedMarker = markerList.current.shift();
          removedMarker.setMap(null);
        }

        const marker = new naver.maps.Marker({
          position: markerPosition,
          map: mapRef.current,
        });

        // 마커 클릭 시 정보창 열기
        const markerInfoWindow = new naver.maps.InfoWindow({
          content: `<div style="padding:10px;">마커 클릭!</div>`,
        });
        naver.maps.Event.addListener(marker, "click", function () {
          markerInfoWindow.open(mapRef.current, marker);
        });

        markerList.current.push(marker);

        // 클릭한 좌표로 주소 검색 (reverse geocode)
        searchCoordinateToAddress(markerPosition);
      });
    };

    // 사용자 위치로 지도 초기화 (실패 시 기본 위치: 서울)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = new naver.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        initMap(userLocation);
      },
      () => {
        const defaultLocation = new naver.maps.LatLng(37.5665, 126.978);
        initMap(defaultLocation);
      }
    );
  }, []);

  // 좌표로 주소 검색 (reverse geocoding)
  const searchCoordinateToAddress = (latlng) => {
    const { naver } = window;
    if (!naver || !infoWindowRef.current || !mapRef.current) return;

    infoWindowRef.current.close();

    naver.maps.Service.reverseGeocode(
      {
        coords: latlng,
        orders: [
          naver.maps.Service.OrderType.ADDR,
          naver.maps.Service.OrderType.ROAD_ADDR,
        ].join(","),
      },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("주소 검색 중 오류가 발생했습니다.");
        }
        const items = response.v2.results;
        const htmlAddresses = items.map((item, i) => {
          const addr = makeAddress(item) || "";
          const addrType =
            item.name === "roadaddr" ? "[도로명 주소]" : "[지번 주소]";
          return `${i + 1}. ${addrType} ${addr}`;
        });
        infoWindowRef.current.setContent(`
          <div style="padding:10px;min-width:200px;line-height:150%;">
            <h4 style="margin-top:5px;">검색 좌표</h4><br/>
            ${htmlAddresses.join("<br/>")}
          </div>
        `);
        infoWindowRef.current.open(mapRef.current, latlng);
      }
    );
  };

  // 주소로 좌표 검색 및 지도 중심 이동 (geocoding)
  const searchAddressToCoordinate = (query) => {
    const { naver } = window;
    if (!naver || !mapRef.current || !infoWindowRef.current) return;

    naver.maps.Service.geocode(
      { query },
      function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("주소 검색 중 오류가 발생했습니다.");
        }
        if (response.v2.meta.totalCount === 0) {
          return alert("주소를 찾을 수 없습니다.");
        }
        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(item.x, item.y);
        infoWindowRef.current.setContent(`
          <div style="padding:10px;min-width:200px;line-height:150%;">
            <h4 style="margin-top:5px;">검색 주소: ${query}</h4><br/>
            ${item.roadAddress ? "[도로명 주소] " + item.roadAddress + "<br/>" : ""}
            ${item.jibunAddress ? "[지번 주소] " + item.jibunAddress + "<br/>" : ""}
            ${item.englishAddress ? "[영문명 주소] " + item.englishAddress : ""}
          </div>
        `);
        mapRef.current.setCenter(point);
        infoWindowRef.current.open(mapRef.current, point);
      }
    );
  };

  // 검색 버튼 클릭 시 실행되는 핸들러
  const handleSearch = () => {
    if (address.trim() !== "") {
      searchAddressToCoordinate(address.trim());
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="주소를 입력하세요"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "8px 15px", cursor: "pointer", marginLeft: "5px" }}
        >
          검색
        </button>
      </div>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </div>
  );
};

export default NaverMap;

// 주소 문자열 조합 함수
function makeAddress(item) {
  if (!item) return "";
  const { name, region, land } = item;
  const isRoadAddress = name === "roadaddr";
  let sido = "",
    sigugun = "",
    dongmyun = "",
    ri = "",
    rest = "";

  if (hasArea(region.area1)) {
    sido = region.area1.name;
  }
  if (hasArea(region.area2)) {
    sigugun = region.area2.name;
  }
  if (hasArea(region.area3)) {
    dongmyun = region.area3.name;
  }
  if (hasArea(region.area4)) {
    ri = region.area4.name;
  }
  if (land) {
    if (hasData(land.number1)) {
      if (hasData(land.type) && land.type === "2") {
        rest += "산";
      }
      rest += land.number1;
      if (hasData(land.number2)) {
        rest += "-" + land.number2;
      }
    }
    if (isRoadAddress) {
      if (checkLastString(dongmyun, "면")) {
        ri = land.name;
      } else {
        dongmyun = land.name;
        ri = "";
      }
      if (hasAddition(land.addition0)) {
        rest += " " + land.addition0.value;
      }
    }
  }
  return [sido, sigugun, dongmyun, ri, rest].join(" ");
}

function hasArea(area) {
  return area && area.name && area.name !== "";
}

function hasData(data) {
  return data && data !== "";
}

function checkLastString(word, lastString) {
  return new RegExp(lastString + "$").test(word);
}

function hasAddition(addition) {
  return addition && addition.value;
}
