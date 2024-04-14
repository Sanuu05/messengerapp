import io from "socket.io-client";
import { baseUrl } from "../config/main";

// const baseUrl = "https://veajqzj9se.execute-api.ap-south-1.amazonaws.com"
// const baseUrl = "http://192.168.137.1:8080";
const socket = io(baseUrl); // Replace with your server URL

export default socket;
