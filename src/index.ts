import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send("Hello from the server")
})

async function serverInit() {
    const PORT = process.env.PORT ? process.env.PORT : 8000;

    try {
        const server = app.listen(PORT, () => {
            console.log(`Server startd at port: ${PORT} \nlink: http://localhost:${PORT}`);
        })
    } catch (err) {
        console.log("Error starting the server:", err);
    }
}

serverInit();