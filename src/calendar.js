import moment from "moment";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getMealForDate } from "./api";

export default function MealCalendar() {
  const [value, onChange] = useState(new Date());
  const [mealData, setMealData] = useState("");

  const date = moment(value).format("YYYYMMDD");

  useEffect(() => {
    const fetchData = async () => {
      const mealData = await getMealForDate(date);
      setMealData(mealData);
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

  // console.log(date);

  return (
    <div>
      <Calendar onChange={onChange} formatDay={(locale, date) => moment(date).format("DD")} value={value} />
      <div className="w-[250px] h-[150px] border-2 rounded-lg my-10">
        {mealData && (
          <p className="text-center">
            메뉴
            <br />
            {formatMealData(mealData)}
          </p>
        )}
      </div>
    </div>
  );
}
