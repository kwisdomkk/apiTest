import moment from 'moment';
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getApi } from './api';

export default function MealCalendar() {
  const [value, onChange] = useState(new Date());
  const [mealInfo, setMealInfo] = useState(null);
  
  useEffect(() => {
    async function fetchMealData() {
      const data = await getApi();
      console.log("API Data:", data);
      setMealInfo(data);
    }

    fetchMealData();
  }, [value]);

  const parseMealData = (mealData) => {
    if (!mealData) {
      return [];
    }

    const items = mealData.split('<br/>');
    const mealList = items.map(item => {
      const [dishName, allergies] = item.split('(');
      return { dishName: dishName.trim(), allergies: allergies ? allergies.replace(')', '').split('.').join(', ') : '' };
    });
    return mealList;
  };

  const getMealForSelectedDate = () => {
    if (!mealInfo || !mealInfo.mealServiceInfo || mealInfo.mealServiceInfo.length === 0) {
      return "해당 날짜의 식단 정보가 없습니다.";
    }

    const selectedDate = moment(value).format("YYYYMMDD");
    const mealDataForSelectedDate = mealInfo.mealServiceInfo.find(meal => meal.MLSV_YMD === selectedDate);

    if (!mealDataForSelectedDate || !mealDataForSelectedDate.DDISH_NM) {
      return "해당 날짜의 식단 정보가 없습니다.";
    }

    return parseMealData(mealDataForSelectedDate.DDISH_NM).map((item, index) => (
      <div key={index}>
        {item.dishName} ({item.allergies})
      </div>
    ));
  };

  return (
    <div>
      <Calendar 
        onChange={onChange} 
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value} 
      />
      
      <div className="text-gray-500 mt-4">
        {getMealForSelectedDate()}
      </div>
    </div>
  );
}
