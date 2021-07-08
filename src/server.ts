// @ts-ignore
import express from "express";
import axios from 'axios'
import { getLatestPicture, getRovers } from "./nasaAPI";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

router.get('/rovers', async (req, res) => {
    const response = await getRovers()
    res.send(response.data)
});

router.get('/rovers/photos', async (req, res) => {
    const response = await getLatestPicture(<string> req.query.rover, <string> req.query.camera)
    res.send(response.data)
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

