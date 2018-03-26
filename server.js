const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static('./dist/'));
app.get('/', (req, res) => {
    res.sendFile("./dist/index.html");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});