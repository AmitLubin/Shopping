import * as Joi from 'joi';
import { ContainerTypes, ValidatedRequestSchema} from 'express-joi-validation';


// Get '/test' 
export const testQuerySchema = Joi.object({ name: Joi.string().required() });
export interface TestRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        name: string
}};


// POST '/addItems'
export const addItemBodySchema = Joi.array().items(Joi.object().keys({
    name: Joi.string().min(2).required(),
    price: Joi.number().min(0.01).required(),
    sale_unit: Joi.string(),
    division: Joi.string().min(2).required(),
    sub_division: Joi.string().min(2),
    manufacturer: Joi.string().min(2),
    supplier: Joi.string().min(2),
    description: Joi.string().min(2),
    tags: Joi.string().min(2),
    stock: Joi.boolean()
}));
export interface AddItemSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: [{
        name: string,
        price: number,
        sale_unit?: string,
        division: string,
        sub_division?: string,
        manufacturer?: string,
        supplier?: string,
        description?: string,
        tags?: string,
        stock?: boolean
}]};