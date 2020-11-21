const Product = require('../models/Product');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
    const {subcategory} = ctx.request.query;
    if ( !subcategory ) {
        return next();
    }
    const products = await Product.find({subcategory});
    if ( products.length === 0 ) {
         ctx.body = {products};
         return;
    }
    ctx.body = {products};
    return next();
};

module.exports.productList = async function productList(ctx, next) {
    const products = await Product.find({}) || [];
    ctx.body = {products};
    return next();
};

module.exports.productById = async function productById(ctx, next) {
    try {
        const id = ctx.params.id;
        const product = await Product.findById(id);
        if ( !product ) {
            ctx.status = 404;
        }
        ctx.body = {product};
    } catch (e) {
        ctx.status = 400;
    }
    return next();
};

