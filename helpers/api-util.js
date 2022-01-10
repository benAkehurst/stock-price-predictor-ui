import { getDummyPrediction } from "../dummy-data";

export async function makeNewPrediction() {}

export async function makeNewPredictionMock() {
  const mockRequest = await getDummyPrediction();
  return mockRequest;
}
