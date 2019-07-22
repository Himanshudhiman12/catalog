const Promise           = require("bluebird");
const productServices   = require('../services/productServices');
const commonFuncProm    = require('../commonfunction')
const responses         = require('../response');


exports.deleteProduct = deleteProduct;


function deleteProduct(req, res) {
    var apiReference = {
        module : "catalogue",
        api    : "deleteProduct"
    };

    var userAccessToken   = req.body.user_access_token;
    var productId         = req.body.product_id;
    var parentCategoryId  = req.body.parent_id;

    Promise.coroutine(function* () {
        var userDetails = yield commonFuncProm.authenticateUserAccessTokenPromisified(apiReference, userAccessToken);
        userDetails     = userDetails[0];
        if(!userDetails.is_admin){
            let errorResponse = {
                "message"  :"Only admin allowed to  delete product",
                "status"   : 101,
                "data"     : data || {}
            }
           return res.send(errorResponse);
        }

        yield new Promise((resolve, reject) => {
            connectionForTransaction.beginTransaction(function (transactionError) {
                if (transactionError) {
                    return reject();
                }
                return resolve();
            });
        });

        var sqlQuery, sqlParams, sqlResult;
        if (parentCategoryId) {
            var siblingsCountOfAProduct = yield productServices.getSiblingsCountOfAProduct(apiReference, parentCategoryId);
            siblingsCountOfAProduct = siblingsCountOfAProduct[0]["COUNT(product_id)"];
            var newHasProducts = siblingsCountOfAProduct > 1 ? 1 : 0;
            if (newHasProducts == 0) {
                sqlQuery = "UPDATE tb_categories SET has_products = ? WHERE category_id = ?";
                sqlParams = [newHasProducts, parentCategoryId];
                sqlResult = yield commonFuncProm.executeSqlTransactionPromisify(apiReference, sqlQuery, sqlParams);
                if (!sqlResult
                    || !sqlResult.affectedRows) {
                    yield commonFuncProm.rollbackTransactionPromisified(apiReference);
                    throw errorResponse;
                }
            }
        }
        sqlQuery = "UPDATE tb_products SET is_deleted = ?, is_enabled = ? WHERE product_id = ?";
        sqlParams = [1, 0, productId];
        sqlResult = yield commonFuncProm.executeSqlTransactionPromisify(apiReference, sqlQuery, sqlParams);
        if (!sqlResult
            || !sqlResult.affectedRows) {
            yield commonFuncProm.rollbackTransactionPromisified(apiReference);
            throw errorResponse;
        }

        yield commonFuncProm.commitTransactionPromisified(apiReference);
        return responses.actionCompleteResponse(res);
    })().catch(function (ex) {
        return res.send(errorResponse ? errorResponse : ex);
    });
}