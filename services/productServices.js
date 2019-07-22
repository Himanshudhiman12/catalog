var commonFunc = require('../commonfunction');
exports.getSiblingsCountOfAProduct = getSiblingsCountOfAProduct;

function getSiblingsCountOfAProduct(apiReference, parentCategoryId) {
    return new Promise((resolve, reject) => {
        var sqlQuery = "SELECT COUNT(product_id) FROM tb_products WHERE parent_category_id = ? AND is_enabled = ?";
        var sqlParams = [parentCategoryId, 1];


        commonFuncProm.executeSqlQueryPromisify(apiReference, sqlQuery, sqlParams)
            .then(cataloguesNumber => {
                return resolve(cataloguesNumber);
            })
            .catch(exception => {
                return reject(exception);
            });
    })
}
