import { useEffect } from "react";
import { getApi } from "./api";

function App() {
  useEffect(() => {
    async function fetchData() {
      const data = await getApi();
      console.log(data);
    }

    fetchData();
  }, []);

  return <div>api 테스트</div>;
}

export default App;
