const API_URL = "https://opentdb.com/api.php?amount=15";

export const fetchAPIForData = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
    }
};
