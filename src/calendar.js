import moment from "moment";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getMealForDate } from "./api";

export default function MealCalendar() {
  const [value, onChange] = useState(new Date());
  const [mealData, setMealData] = useState("");
  const [mealCountry, setMealCountry] = useState("");
  const [allergy, setAllergy] = useState([]);

  const date = moment(value).format("YYYYMMDD");

  useEffect(() => {
    const fetchData = async () => {
      const { mealData, mealCountry, allergy } = await getMealForDate(date);
      setMealData(mealData);
      setMealCountry(mealCountry);
      setAllergy(allergy);
    };

    fetchData();
  }, [date]);

  const formatMealData = (data) => {
    if (!data) return "";

    const menuItems = data.split("<br/>");

    const formattedMenu = menuItems.map((item) => {
      const menuName = item.split("(")[0].trim();
      return menuName;
    });

    return formattedMenu.join(", ");
  };

  const formatCountryData = (data) => {
    if (!data) return "";

    const countryItems = data.split("<br/>");

    const formattedCountry = countryItems.map((item) => {
      const [food, origin] = item.split(" : ");
      return `${food.trim()} : ${origin.trim()}`;
    });

    return formattedCountry.join(", ");
  };

  const formatAllergyData = (data) => {
    if (!data || data.length === 0) return "";

    return data.join(", ");
  };

  return (
    <div className="flex justify-center">
      <div className="max-w-[700px] mt-[50px]">
        <Calendar onChange={onChange} formatDay={(locale, date) => moment(date).format("DD")} value={value} />
        <div className="max-w-[90%] mx-auto ">
          <div className="flex justify-between">
            <div className="w-[45%] p-1 border-2 rounded-lg mt-5 ">
              {mealData && (
                <p className="text-center">
                  메뉴
                  <br />
                  {formatMealData(mealData)}
                </p>
              )}
            </div>
            <div className="w-[45%]  p-1 border-2 rounded-lg my-5 ">
              {allergy && (
                <p className="text-center text-red-600">
                  알레르기 정보 및 참고
                  <br />
                  {formatAllergyData(allergy)}
                </p>
              )}
            </div>
          </div>
          <div className="w-[100%]] p-1 border-2 rounded-lg mb-10">
            {mealCountry && (
              <p className="text-center">
                원산지
                <br />
                {formatCountryData(mealCountry)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
