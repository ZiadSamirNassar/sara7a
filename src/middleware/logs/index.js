import fs from "node:fs";
import path from "node:path";

export const logger = (req, res, next) => {
    const { method, url, ip } = req;

    // مسار اللوج النهائي اللي انت عاوزه
    const logFile = "D:\\Route\\sara7a\\logs\\access.log";

    // استخراج مسار المجلد فقط
    const logDir = path.dirname(logFile);

    // لو المجلد مش موجود نعمله
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
    }

    const timestamp = new Date().toISOString();
    // كتابة اللوج
    fs.appendFileSync(logFile, `${timestamp} ${method} ${url} ${ip}\n`);

    next();
};
