import http from "http";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Server } from "socket.io";
import tokensRouter from "./routes/tokens";
import { tokens } from "./data/tokens";
const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

app.use("/tokens", tokensRouter);

// --- Socket.io + HTTP server wiring ---
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("client connected", socket.id);

    const interval = setInterval(() => {
        // pick 3 random tokens
        const updated = tokens
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map((t) => {
                const changePercent = Math.random() * 2 - 1; // -1% to +1%
                const newPrice = t.price * (1 + changePercent / 100);

                t.price = Number(newPrice.toFixed(6));
                t.priceChange24h = Number((t.priceChange24h + changePercent).toFixed(2));

                return { id: t.id, price: t.price, priceChange24h: t.priceChange24h };
            });



        io.emit("prices:update", updated);

    }, 3000);

    socket.on("disconnect", () => {
        clearInterval(interval);
        console.log("client disconnected", socket.id);
    });
});



server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
