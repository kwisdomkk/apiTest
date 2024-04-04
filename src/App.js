
function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL_MEAL = "https://open.neis.go.kr/hub/mealServiceDietInfo";
  const BASE_URL_SCHOOL = "https://open.neis.go.kr/hub/schoolInfo";
  const apiKey = API_KEY;
  const pIndex = 1;
  const pSize = 1000;
  const schoolCode = "7010057"; // 학교 코드
  const officeCode = "B10"; // 교육청 코드
  const date = "202403"; // 날짜

  // // 학교 정보
  let locationA = {
    서울: 'B10',
    부산: 'C10',
    대구: 'D10',
    인천: 'E10',
    광주: 'F10',
    대전: 'G10',
    울산: 'H10',
    세종시: 'I10',
    경기도: 'J10',
    강원도: 'K10',
    충청북도: 'M10',
    충청남도: 'N10',
    전라북도: 'P10',
    전라남도: 'Q10',
    경상북도: 'R10',
    경상남도: 'S10',
    제주도: 'T10',
};
let noFood = {
    1: '달걀',
    2: '우유',
    3: '메밀',
    4: '땅콩',
    5: '대두',
    6: '밀',
    7: '고등어',
    8: '게',
    9: '새우',
    10: '돼지고기',
    11: '복숭아',
    12: '토마토',
    13: '아황산',
    14: '호두',
    15: '닭고기',
    16: '쇠고기',
    17: '오징어',
    18: '조개류.굴.홍합.전복',
    19: '잣',
};
let locationCode = locationA['서울'];
let schoolNM = '가락고등학교';
let schoolcode = '';
export async function apitests() {
    try {
        const schoolInfoResponse = await fetch(
            `${BASE_URL_SCHOOL}?KEY=${apiKey}&Type=json&${pIndex}&${pSize}&ATPT_OFCDC_SC_CODE=${officeCode}`
        ).then((res) => res.json());
        const schoolarr = schoolInfoResponse.schoolInfo[1].row;
        schoolarr.map((item) => {
            if (item.SCHUL_NM === schoolNM) {
                schoolcode = item.SD_SCHUL_CODE;
            }
        });
        const mealServiceInfoResponse = await fetch(
            `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=af9d64d6784a4f5d9b1aa29a4ac41ddb&Type=json&ATPT_OFCDC_SC_CODE=${locationCode}&SD_SCHUL_CODE=${schoolcode}&MLSV_YMD=202403`
        ).then((res) => res.json());
        const str = mealServiceInfoResponse.mealServiceDietInfo[1].row[0].DDISH_NM.split('(');
        const arr = [];
        str.map((item) => {
            arr.push(item.split('.'));
        });
        const arr2 = [];
        arr.map((item) => {
            item.map((item2) => {
                if (!isNaN(item2)) {
                    arr2.push(item2);
                }
            });
        });
        let test = arr2.map((item) => noFood[item]);
        return {
            schoolInfo: schoolcode,
            mealServiceInfo: test,
        };
    } catch (e) {
        console.log(e);
    }
}


export default App;