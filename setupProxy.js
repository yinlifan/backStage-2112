const { createProxyMiddleware: proxy } = require("http-proxy-middleware");

module.exports = (app) => {
    app.use(
        "/api",
        proxy({
            // 此处的端口号要与后期数据请求的数据端一致
            target: "http://localhost:9000",
            changeOrigin: true,
        })
    );
};