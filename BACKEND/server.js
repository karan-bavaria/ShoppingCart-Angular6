var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
const util = require('util');
var uniqid = require('uniqid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

app.listen(8000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/getProducts", async function (req, res) {
    let product_DATA = await readingProductFile();
    if (product_DATA) {
        res.send(product_DATA);
    }

})


app.get("/getTransactions", async function (req, res) {
    let transaction_DATA = await readingTransactionFile();
    if (transaction_DATA) {
        res.send(transaction_DATA);
    }

})

app.post("/commitTransaction", async function (req, res) {
    let transaction_DATA = await readingTransactionFile();
    req.body.tId = generateUniqueId(transaction_DATA);
    transaction_DATA.push(req.body);
    writeInTransactionFile(JSON.stringify(transaction_DATA, null, 4));
    res.status(200).send();
});

app.post("/getUserByCredential", async function (req, res) {
    let user_DATA = await readingUserFile();
    let isUserValid = false;

    user_DATA.forEach(element => {
        if (element.username === req.body.username && element.password === req.body.password) {
            isUserValid = true;
        }
    });
    res.send(isUserValid);
});


app.post("/addProduct", async function (req, res) {
    let product_DATA = await readingProductFile();
    let isProductIdUnique = validateProductId(req.body.pId, product_DATA);
    
    if (isProductIdUnique) {
        product_DATA.push(req.body);
        writeInProductFile(JSON.stringify(product_DATA, null, 4));
        res.send({ "message": "Product Added","isProductAdded":true });

    }
    else {
        res.send({ "message": "Product Id not unique","isProductAdded":false });
    }

});

generateUniqueId = (transaction_DATA) => {
    let tempId = uniqid();
    let isUniqueTransactionId = validateTransaction(tempId, transaction_DATA);

    if (isUniqueTransactionId) {
        return tempId;
    }
    else {
        generateUniqueId(transaction_DATA);
    }
}

readingUserFile = async () => {
    const data = await readFile("./users.json", 'utf-8');
    return JSON.parse(data.toString());
}

readingProductFile = async () => {
    const data = await readFile("./product.json", 'utf-8');
    return JSON.parse(data.toString());
}

readingTransactionFile = async () => {
    const data = await readFile("./transaction.json", 'utf-8');
    return JSON.parse(data.toString());
}


writeInProductFile = async (obj) => {
    try {
        await writeFile("./product.json", obj);
        return 'Sucessfully Inserted';
    } catch (err) {
        throw "error writing file"
    }
}

writeInTransactionFile = async (obj) => {
    try {
        await writeFile("./transaction.json", obj);
        return 'Sucessfully Inserted';
    } catch (err) {
        throw "error writing file"
    }
}

validateTransaction = (tId, transaction_DATA) => {

    for (let i = 0; i < transaction_DATA.length; i++) {
        if (transaction_DATA[i].tId === tId) {
            return false;
        }
    }
    return true;
}

validateProductId = (pId, product_DATA) => {
    for (let i = 0; i < product_DATA.length; i++) {
        if (product_DATA[i].pId === pId) {
            return false;
        }
    }
    return true;
}














