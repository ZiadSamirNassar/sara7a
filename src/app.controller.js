import { globalErrorHandler } from "./utils/index.js";
import {connectDB} from "./DB/index.js";
import * as appRoutes from "./modules/index.js";
import rateLimit from "express-rate-limit";
export default function bootstrap(app, express) {

    const apiLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 50, // limit each IP to 50 requests per windowMs
        handler: (req, res, next, options) => {
            throw new Error(options.message, { cause: options.statusCode });
        }
    });

    app.use(apiLimiter);
    
    app.use(express.json());
    app.use("/uploads", express.static("uploads"));

    connectDB(process.env.DB_URI);

    //Routes
    app.use("/auth", appRoutes.authRouter);
    app.use("/user", appRoutes.userRouter);
    app.use("/message", appRoutes.messageRouter);

    app.get("/", (req, res) => {
        res.send("Hello World!");
    });

    //global error handler
    app.use(globalErrorHandler);

}