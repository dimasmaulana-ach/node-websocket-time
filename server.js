const WebSocket = require('ws');

const http = require('http');
const server = http.createServer();
const port = 8080;

const wss = new WebSocket.Server({ server });

function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

wss.on('connection', (ws) => {
  console.log('Client terhubung.');

  // Kirim waktu ke client setiap detik
  const interval = setInterval(() => {
    const currentTime = getCurrentTime();
    ws.send(currentTime);
  }, 1000);

  // Ketika koneksi ditutup oleh client
  ws.on('close', () => {
    console.log('Client terputus.');
    clearInterval(interval); // Hentikan pengiriman waktu setelah koneksi ditutup
  });
});

server.listen(port, () => {
  console.log(`Server berjalan di ws://localhost:${port}`);
});
