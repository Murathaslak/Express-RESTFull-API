const express = require("express");
const aktorlerRouter = require("./routers/aktorlerRouter");

const server = express();
server.use(express.json());
server.use("/aktorler",aktorlerRouter);

server.get("/", (req,res) => {
    res.send("Express'ten merhaba");
});

server.listen(3000, () => {
    console.log(`http://localhost:3000 adresine gelen istekler dinleniyor...`);
}); 