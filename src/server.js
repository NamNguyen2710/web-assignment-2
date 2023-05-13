const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

app.use(cors({ origin: `http://localhost:${port}` }));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    message: 'API not found!'
  });
});

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
