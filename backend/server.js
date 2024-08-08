import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import weblinkRoutes from './routes/weblink.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.get('/', (req, res) => {
    res.json({ message: `Express App is running on port ${port}` });
});

app.use('/api/weblink', weblinkRoutes);
authRoutes(app);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(port, () => {
        console.log('✅️ Database connected');
        console.log(`✅️ Listening on port: ${port}`);
    });
})
.catch((error) => {
    console.error(error);
});
