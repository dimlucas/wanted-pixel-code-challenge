const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static('./'));
app.get('/', (req, res) => {
    res.sendFile("index.html");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});