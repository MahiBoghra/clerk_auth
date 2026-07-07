// Path: src\app.js
import express from "express";
import cors from "cors";
import { clerkMiddleware , getAuth} from "@clerk/express";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.send("Backend is running!");
});

app.get("/me", (req, res) => {
    const auth = getAuth(req);

    if (!auth.userId) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    res.json({
        message: "Authenticated!",
        userId: auth.userId,
    });
});


export default app;
