import io from "socket.io-client";

const port = "https://veajqzj9se.execute-api.ap-south-1.amazonaws.com"
// const port = "http://192.168.137.1:8080";
const socket = io(port); // Replace with your server URL

export default socket;
