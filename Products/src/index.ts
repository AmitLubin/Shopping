import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { ValidatedRequest, createValidator, ExpressJoiInstance } from 'express-joi-validation';
import * as mw from './middleware/middleware';
import SQLqueries from './mysql';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT ?? 5000;
const validator: ExpressJoiInstance = createValidator();
const jsonParser = bodyParser.json();

const query = new SQLqueries();

/// Testing protocols ///

app.get('/', (req: Request, res: Response) => res.status(200).send('TS with Express, using Joi as middleware'))

app.get('/test',
    validator.query(mw.testQuerySchema),
    (req: ValidatedRequest<mw.TestRequestSchema>, res: Response) => res.status(200).send(`Hi ${req.query.name}!`)
);

/// Standard protocols ///

app.get('/allProducts', async (req: Request, res: Response) => {
    const queryResult = await query.getAllProducts();
    res.status(200).send(queryResult[0]); //index 0 is the an array of products
})

app.post('/addProducts', 
    [jsonParser, validator.body(mw.addItemBodySchema)], 
    (req: ValidatedRequest<mw.AddItemSchema>, res: Response) => {
        query.addProducts(req.body);
        res.status(200).send("Success!");
})

app.delete('/allProducts', (req: Request, res: Response) => {
    query.deleteAllProducts();
    res.status(204).send("Deleted");
})
  
app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});

/// sql commands need async and await