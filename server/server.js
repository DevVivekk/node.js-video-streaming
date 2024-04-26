const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.listen(4000);
app.use(cors());

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/video", async (req, res) => {
    // Set range
    const range = req.headers.range;
    const fileStat = fs.statSync('./video.mp4');
    
    if (!range) {
        return res.status(400).json("Required range!");
    }

    const chunkSize = 10**6; // 1mb
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunkSize, fileStat.size - 1); // fileStat.size instead of fileStat

    const contentLength = end - start + 1;
    const videoFs = fs.createReadStream("./video.mp4", {
        start,
        end
    });
    
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileStat.size}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };
    
    res.writeHead(206, headers);
    videoFs.pipe(res);
});
