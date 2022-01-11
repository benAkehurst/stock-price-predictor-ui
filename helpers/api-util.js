import { getDummyPrediction } from "../dummy-data";

export async function makeNewPrediction(props) {
  const URL = `http://localhost:8080/api/v1/predict/${props.enteredStock}`;
  const response = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);
  return response;
}

export async function makeNewPredictionMock() {
  const mockRequest = await getDummyPrediction();
  return mockRequest;
}
