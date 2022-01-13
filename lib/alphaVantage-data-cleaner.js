export async function dataCleaner(rawData) {
  // Extract only stock data
  const timeSeriesData = rawData["Time Series (Daily)"];

  // make array only stock price data
  const onlyTimeSeriesData = Object.keys(timeSeriesData).map((date) => {
    return {
      date: date,
      price: timeSeriesData[date],
    };
  });
  // convert object keys to
  const convertedData = onlyTimeSeriesData.map((data) => {
    return {
      date: data.date,
      open: data.price["1. open"],
      high: data.price["2. high"],
      low: data.price["3. low"],
      close: data.price["4. close"],
    };
  });
  // convert all strings to numbers - parseFloat()
  const convertedValues = convertedData.map((item) => {
    return Object.assign(item, {
      date: item.date,
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close),
    });
  });
  return convertedValues;
}
