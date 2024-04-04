const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = "https://open.neis.go.kr/hub/mealServiceDietInfo";

//학교 정보
// export async function fetchSchoolInfo(apiKey, pIndex, pSize) {
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

//학교 급식 정보

export async function fetchMealInfo(apiKey, schoolCode, officeCode, pIndex, pSize, date) {
  const url = `${BASE_URL}?KEY=${apiKey}&Type=json&${pIndex}&${pSize}&ATPT_OFCDC_SC_CODE=${officeCode}&SD_SCHUL_CODE=${schoolCode}&MLSV_YMD=${date}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    const mealData = data.mealServiceDietInfo[1].row[0].DDISH_NM || "";

    // const str = mealData.split("k");
    // const arr = str.flatMap(item => item.split("."));
    // const arr2 = arr.filter(item => !isNaN(item));
    console.log("식단표", mealData);
  } catch (error) {
    console.error("Error:", error);
  }
}
const apiKey=API_KEY
const pIndex = 1; 
const pSize = 1000; 
const schoolCode = "7010057"; // 학교 코드
const officeCode = "B10"; // 교육청 코드
const date = "202403"; // 날짜 (예: '20220401')

fetchMealInfo(apiKey, schoolCode, officeCode,pIndex, pSize,date);


