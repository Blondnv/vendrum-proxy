import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

const target = "http://213.35.123.50";

app.use("/", createProxyMiddleware({
  target,
  changeOrigin: true,
  onProxyReq(proxyReq, req, res) {
    proxyReq.setHeader("Host", "vendroom.ru");
    proxyReq.setHeader("X-Real-IP", req.headers["x-real-ip"] || req.socket.remoteAddress);
  },
}));

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Reverse proxy running on port ${port}`);
});
