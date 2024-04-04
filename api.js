// User
function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = "https://open.neis.go.kr/hub/mealServiceDietInfo";

  // // 학교 정보
  //  async function fetchSchoolInfo(apiKey, pIndex, pSize) {
  //   const url = `${BASE_URL}?KEY=${apiKey}&Type=json&pindex=${pIndex}&pSize=${pSize}`;

  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     // console.log(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  // const apiKey = API_KEY ;
  // const pIndex = 1;
  // const pSize = 1000;

  // fetchSchoolInfo(apiKey, pIndex, pSize);

  // 학교 급식 정보
  async function fetchMealInfo(apiKey, schoolCode, officeCode, pIndex, pSize, date) {
    const url = `${BASE_URL}?KEY=${apiKey}&Type=json&${pIndex}&${pSize}&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${date}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const mealData = data.mealServiceDietInfo[1].row[0].DDISH_NM || "";

      const str = mealData.split("(");
      const arr = str.flatMap((item) => item.split("."));
      const arr2 = arr.filter((item) => !isNaN(item));
      console.log("식단표", arr2);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const apiKey = API_KEY;
  const pIndex = 1;
  const pSize = 1000;
  const schoolCode = "7010057"; // 학교 코드
  const officeCode = "B10"; // 교육청 코드
  const date = "202403"; // 날짜

  fetchMealInfo(apiKey, schoolCode, officeCode, pIndex, pSize, date);
}

let location = {
  서울: "B10",
  부산: "C10",
  대구: "D10",
  인천: "E10",
  광주: "F10",
  대전: "G10",
  울산: "H10",
  세종시: "I10",
  경기도: "J10",
  강원도: "K10",
  충청북도: "M10",
  충청남도: "N10",
  전라북도: "P10",
  전라남도: "Q10",
  경상북도: "R10",
  경상남도: "S10",
  제주도: "T10",
};

function getLocationCode(locationName) {
  // 입력된 지역 이름을 키로 사용하여 지역 코드를 가져옵니다.
  const code = location[locationName];

  if (code) {
    return code;
  } else {
    console.error("해당 지역 코드를 찾을 수 없습니다.");
    return null;
  }
}

// 사용자로부터 입력 받은 지역 이름
const userInput = "강원도";

// 지역 이름에 대응하는 지역 코드 가져오기
const code = getLocationCode(userInput);

if (code) {
  console.log(`${userInput}의 지역 코드는 ${code}입니다.`);
} else {
  console.log("지역 코드를 찾을 수 없습니다.");
}

export default App;