import { getDummyPrediction } from "../dummy-data";

export async function makeNewPrediction(props) {
  const URL = `http://localhost:8080/api/v1/predict/${props}`;
  const response = await fetch(URL, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message === "Stock not found") {
        return { message: "Stock not found" };
      } else {
        return data;
      }
    });
  return response;
}

export async function makeNewPredictionMock() {
  const mockRequest = await getDummyPrediction();
  return mockRequest;
}
