import express, {Express} from 'express'

const app: Express = express();
const PORT = 5000;

app.use(express.json());

app.get('/statistics/:statId/weights', (req, res) => {
    res.status(200).json({
        labels: [2020, 2021, 2022],
        values: [96, 92, 90] 
    });
})

app.listen(PORT);