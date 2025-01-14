const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  override: true,
});

export const fetchData = async () => {
  const userName = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;
  const auth = Buffer.from(`${userName}:${password}`).toString("base64");

  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Basic ${auth}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // return the data for reuse
  } catch (error) {
    console.log("Error fetching data:", error);
    throw error;
  }
};
