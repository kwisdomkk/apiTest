import { useEffect } from "react";
import { getMealInfo } from "./api";
import Calendar from "./calendar";

function App() {
  useEffect(() => {
    async function fetchData() {
      const data = await getMealInfo();
      console.log("전체값", data);
    }

    fetchData();
  }, []);

  return (
    <div className="flex justify-center mt-[50px]">
      <Calendar />
    </div>
  );
}

export default App;
