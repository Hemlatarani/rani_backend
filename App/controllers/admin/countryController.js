const { countryModel } = require("../../models/countryModel")

let countryCreate = async (req, res) => {
    let obj
    try {
        let countryCollection = await countryModel(req.body)
        let countryRes = await countryCollection.save()
        obj = {
            status: 1,
            msg: "country add",
            countryRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "country code already exists";
        }
        if (err.errors) {
            if (err.errors.countryName)
                errorMessage = err.errors.countryName.message

        }
        obj = {
            status: 0,
            msg: "country not added",
            errorMessage

        }
        res.send(obj)

    }



}

let countryView = async (req, res) => {

    let skip = 0
    let limit = 5
    if (req.query.limit) {
        limit=req.query.limit;
    }
    if (req.query.page) {
        skip=(req.query.page - 1) * limit
    }
    let countryCollection = await countryModel.find().skip(skip).limit(limit)
    let countrylenght = await countryModel.find()

    let obj = {
        status: 1,
        msg: "country view",
        countryCollection,
        length:countrylenght.length,// number of row
        totalpages: Math.ceil(countrylenght.length/limit)
        
    }
    res.send(obj)
}

let countryDelete = async (req, res) => {

    let obj
    let { id } = req.params;

    countryModel.deleteOne({ _id: id })
        .then((delRes) => {
            obj = {
                status: 1,
                msg: "country delete",
                delRes
            }
            res.send(obj)

        })
        .catch((err) => {
            obj = {
                status: 1,
                msg: "country delete",
                err
            }
            res.send(obj)
        })



}
let countryUpdate = async (req, res) => {
    let { id } = req.params;
    let obj
    try {
        let countryRes = await countryModel.updateOne(
            {
                _id: id
            },
            {
                $set: req.body
            }
        )
        obj = {
            status: 1,
            msg: "country update",
            countryRes
        }
        res.send(obj)
    }
    catch (err) {
        let errorMessage
        if (err.code == 11000) {
            errorMessage = "countrycode updated";
        }
        if (err.errors) {
            if (err.errors.countryName)
                errorMessage = err.error.countryName.message

        }
        obj = {
            status: 0,
            msg: "countrynot added",
            errorMessage

        }
        res.send(obj)

    }

}
let countryMultidelete = (req, res) => {

    let { ids } = req.body;
    let obj
    countryModel.deleteMany({ _id: ids })
        .then((delRes) => {
            obj = {
                status: 1,
                msg: "many country deleted",
                delRes
            }
            res.send(obj)
        })
        .catch((err) => {
            obj = {
                status: 0,
                // msg:"many country not deleted",
                err
            }
            res.send(obj)
        })
}
let singalData = async (req, res) => {
    let { id } = req.params;
    let countryData = await countryModel.findOne({ _id: id })
    let obj = {
        status: 1,
        countryData
    }
    res.send(obj)
}
let cstatusUpdate = async (req, res) => {
    let { ids } = req.body;
    let countryUpdate = await countryModel.updateMany(
        { _id: ids },
        [
            {
                $set: {
                    countryStatus: {
                        $not: "$countryStatus"
                    }
                }
            }
        ]
    )
    let obj = {
        status: 1,
        countryUpdate

    }
    res.send(obj)
}

module.exports = { countryCreate, countryView, countryDelete, countryUpdate, countryMultidelete, singalData, cstatusUpdate }