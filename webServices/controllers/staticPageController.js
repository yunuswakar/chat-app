const user = require('../../models/userModel')
const staticPage = require('../../models/staticModel')


module.exports = {
    staticApi: (req, res) => {
        try {
            if (req.body.type == "TERMS") {
                console.log("8 >>>>>>>>>static api")
                staticPage.findOne({ Type: "TERMS" }, (error, success) => {
                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error11" })
                    } else if (!success) {
                        res.send({ responseCode: 404, responseMessage: "Static page not found" })
                    } else {
                        res.send({ responseCode: 200, responseMessage: "Static api ", success })
                    }
                })

            } if (req.body.type == "PRIVACY") {
                console.log("21>>>>>>>>>static api")
                staticPage.findOne({ Type: "PRIVACY" }, (error, success) => {
                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error11" })
                    } else if (!success) {
                        res.send({ responseCode: 404, responseMessage: "Static page not found" })
                    } else {
                        res.send({ responseCode: 200, responseMessage: "Static api ", success })
                    }
                })
            } if (req.body.type == "ABOUT_US") {
                staticPage.findOne({ Type: "ABOUT_US" }, (error, success) => {
                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error11" })
                    } else if (!success) {
                        res.send({ responseCode: 404, responseMessage: "Static page not found" })
                    } else {
                        res.send({ responseCode: 200, responseMessage: "Static api ", success })
                    }
                })
            }
          
            if (req.body.type == "HELP") {
                staticPage.findOne({ Type: "HELP" }, (error, success) => {
                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error11" })
                    } else if (!success) {
                        res.send({ responseCode: 404, responseMessage: "Static page not found" })
                    } else {
                        res.send({ responseCode: 200, responseMessage: "Static api ", success })
                    }
                })
            }
            if (req.body.type == "CONTACT_US") {
                staticPage.findOne({ Type: "CONTACT_US" }, (error, success) => {
                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error11" })
                    } else if (!success) {
                        res.send({ responseCode: 404, responseMessage: "Static page not found" })
                    } else {
                        res.send({ responseCode: 200, responseMessage: "Static api ", success })
                    }
                })
            }
        } catch (error) {
            res.send({ responseCode: 404, responseMessage: "error in catch" })
        }
    },

    staticPageUpdate: (req, res) => {
        try {
            if (!req.body.description) {
                res.send({ responseCode: 500, responseMessage: "Description missing" })
            } else {
                user.findOne({ userType: "ADMIN", status: "ACTIVE" }, (error, success) => {
                    if (error) {
                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                    } else if (!success) {
                        res.send({ responseCode: 404, responseMessage: "Static page not found" })
                    } else {
                        if (req.body.type == "PRIVACY") {

                            staticPage.findOneAndUpdate({ Type: "PRIVACY" },
                                {
                                    $set: {
                                        title: req.body.title,
                                        description: req.body.description
                                    }
                                },
                                { new: true },
                                (error2, success2) => {
                                    if (error2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    } else if (!success2) {
                                        res.send({ responseCode: 404, responseMessage: "Static page  not updated" })
                                    } else {
                                    } res.send({ responseCode: 200, responseMessage: "Static page updated successfully", data: success2 })
                                })
                        } else if (req.body.type == "TERMS") {
                            staticPage.findOneAndUpdate({ Type: "TERMS" },
                                {
                                    $set: {
                                        title: req.body.title,
                                        description: req.body.description
                                    }
                                },
                                { new: true },
                                (error2, success2) => {
                                    if (error2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    } else if (!success2) {
                                        res.send({ responseCode: 404, responseMessage: "Static page  not updated" })
                                    } else {
                                    } res.send({ responseCode: 200, responseMessage: "Static page updated successfully", data: success2 })
                                })
                        } else if (req.body.type == "HELP") {
                            staticPage.findOneAndUpdate({ Type: "HELP" },
                                {
                                    $set: {
                                        title: req.body.title,
                                        description: req.body.description
                                    }
                                },
                                { new: true },
                                (error2, success2) => {
                                    if (error2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    } else if (!success2) {
                                        res.send({ responseCode: 404, responseMessage: "Static page  not updated" })
                                    } else {
                                    } res.send({ responseCode: 200, responseMessage: "Static page  updated successfully", data: success2 })
                                })
                        }
                        else if (req.body.type == "ABOUT_US") {
                            staticPage.findOneAndUpdate({ Type: "ABOUT_US" },
                                {
                                    $set: {
                                        title: req.body.title,
                                        description: req.body.description
                                    }
                                },
                                { new: true },
                                (error2, success2) => {
                                    if (error2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    } else if (!success2) {
                                        res.send({ responseCode: 404, responseMessage: "Static page  not updated" })
                                    } else {
                                    } res.send({ responseCode: 200, responseMessage: "Static page  updated successfully", data: success2 })
                                })
                        }
                        else if (req.body.type == "CONTACT_US") {
                            staticPage.findOneAndUpdate({ Type: "CONTACT_US" },
                                {
                                    $set: {
                                        title: req.body.title,
                                        description: req.body.description
                                    }
                                },
                                { new: true },
                                (error2, success2) => {
                                    if (error2) {
                                        res.send({ responseCode: 500, responseMessage: "Internal server error" })
                                    } else if (!success2) {
                                        res.send({ responseCode: 404, responseMessage: "Static page  not updated" })
                                    } else {
                                    } res.send({ responseCode: 200, responseMessage: "Static page updated successfully", data: success2 })
                                })
                        }
                    }
                })
            }

        } catch (error) {
            res.send({ responseCode: 404, responseMessage: "error in catch" })
        }
    },
}