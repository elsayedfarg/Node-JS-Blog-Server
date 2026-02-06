const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
var hpp = require("hpp");
const { xss } = require("express-xss-sanitizer");
const { limiter } = require("./middlewares/rateLimiter");

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const likeRouter = require("./routes/likeRoutes");
const followRouter = require("./routes/followRoutes");
const notificationRouter = require("./routes/notificationRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(limiter);

// Route Mount
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/likes", likeRouter);
app.use("/follow", followRouter);
app.use("/notifications", notificationRouter);

// Global error handler
app.use(errorHandler);

module.exports = app;
