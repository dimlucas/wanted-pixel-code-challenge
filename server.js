const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const distFolder = `${__dirname}/dist`;

app.use(express.static(distFolder));
app.get('/', (req, res) => {
    res.sendFile(`${distFolder}/index.html`);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});