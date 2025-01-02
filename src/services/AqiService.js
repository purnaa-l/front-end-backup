import axios from "axios";
const REST_API_BASE_URL="http://localhost:8080/api/aqi"
const REST_API_HISTORICAL_URL="http://localhost:8080/api/historical-data"
const REST_API_CONTACT_URL="http://localhost:8080/api/aqi/contact-us"

export const listAQIs=()=>{
    return axios.get(REST_API_HISTORICAL_URL);
}
export const postAQIs=(aqi)=>axios.post(REST_API_BASE_URL, aqi);
export const postQuery=(query)=>axios.post(REST_API_CONTACT_URL, query);

const REST_API_CHATBOT_URL = "http://localhost:8080/api/aqi/chatbot/query";

// Service function to send a query to the backend and receive a response
export const postChatQuery = async (userMessage) => {
    const maxLength = 1000; // Set an appropriate length limit
    const truncatedMessage = userMessage.length > maxLength ? userMessage.substring(0, maxLength) : userMessage;

    console.log("Sending message to backend:", { message: truncatedMessage }); // Log the message

    try {
        const response = await axios.post(REST_API_CHATBOT_URL, { message: truncatedMessage }, {
            headers: { "Content-Type": "application/json" },
        });

        return response.data;
    } catch (error) {
        console.error("Error in sending chatbot query:", error);
        return "Sorry, something went wrong! Please try again later.";
    }
};

