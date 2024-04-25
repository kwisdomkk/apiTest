import { useEffect } from "react";
import { getSchoolInfo } from "./api";
import Calendar from "./calendar";

function App() {
  useEffect(() => {
    async function fetchData() {
      const data = await getSchoolInfo();
      console.log("학교코드", data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Calendar />
    </div>
  );
}

export default App;
