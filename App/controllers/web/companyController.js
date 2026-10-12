

const { companyAccountSchemaModel } = require("../../models/companyAccountModel")



const getCompanyDetails = async (req, res) => {
    try {
        const companyData = await companyAccountSchemaModel.findOne()

        if (!companyData) {
            return res.status(404).json({
                success: false,
                message: "Company details not found"
            })
        }

        res.status(200).json({
            success: true,
            data: companyData
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { getCompanyDetails, }