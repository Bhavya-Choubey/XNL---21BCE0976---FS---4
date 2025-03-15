const socket = new WebSocket("wss://your-backend-websocket-url");

socket.onopen = () => {
  console.log("Connected to WebSocket server");
};

socket.onmessage = (event) => {
  console.log("New Job Update:", event.data);
};

socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

export default socket;
