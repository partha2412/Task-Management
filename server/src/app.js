import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import securityMiddleware from "./middlewares/security.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";

import logger from "./config/logger.js";
import env from "./config/env.js";

export default function createApp() {
    const app = express();

    // Required when deployed behind a proxy
    // e.g. Render, Railway, etc.
    app.set("trust proxy", 1);

    // CORS
    app.use(
        cors({
            origin: env.CLIENT_URL,
            credentials: true,
        })
    );

    // Cookie parser
    app.use(cookieParser());

    // Security
    securityMiddleware(app);

    // Body parser
    app.use(express.json({ limit: "10kb" }));

    // HTTP logging
    app.use(
        morgan(
            ":method :url | :status | :response-time ms | IP :remote-addr",
            {
                stream: {
                    write: (message) => {
                        const status = Number(
                            message.match(/\|\s(\d{3})\s\|/)?.[1]
                        );

                        let coloredStatus = String(status);

                        if (status >= 200 && status < 300) {
                            coloredStatus = `\x1b[32m${status}\x1b[0m`;
                        } else if (status >= 300 && status < 400) {
                            coloredStatus = `\x1b[36m${status}\x1b[0m`;
                        } else if (status >= 400 && status < 500) {
                            coloredStatus = `\x1b[33m${status}\x1b[0m`;
                        } else if (status >= 500) {
                            coloredStatus = `\x1b[31m${status}\x1b[0m`;
                        }

                        const coloredMessage = message
                            .trim()
                            .replace(
                                `| ${status} |`,
                                `| ${coloredStatus} |`
                            );

                        if (status >= 500) {
                            logger.error(coloredMessage);
                        } else if (status >= 400) {
                            logger.warn(coloredMessage);
                        } else {
                            logger.info(coloredMessage);
                        }
                    },
                },
            }
        )
    );

    // Health check
    app.get("/health", (req, res) => {
        const dbState = mongoose.connection.readyState;

        if (dbState !== 1) {
            return res.status(503).json({
                status: "unhealthy",
                server: "ok",
                database: "down",
            });
        }

        return res.status(200).json({
            status: "healthy",
            server: "ok",
            database: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    });

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/tasks", taskRoutes);

    // 404
    app.use((req, res) => {
        res.status(404).json({
            success: false,
            message: `Route not found: ${req.method} ${req.originalUrl}`,
        });
    });

    // Global error handler
    app.use(errorHandler);

    return app;
}