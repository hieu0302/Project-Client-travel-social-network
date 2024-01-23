import io from "socket.io-client";

const socket = io("http://localhost:4000");

// const socket = io("https://trip-social-socket.onrender.com");

export default socket;
