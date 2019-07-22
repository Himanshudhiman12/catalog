const productValidator  = require('./validators/productValidators');
const productController = require('./controller/productControllers');


app.delete('/delete_product', productValidator.deleteProductsValidation, productController.deleteProduct);