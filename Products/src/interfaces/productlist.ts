export default interface ProductList {
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
}