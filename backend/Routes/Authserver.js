const express = require('express')
const getRouter = express.Router();
const postRouter = express.Router();
const putRouter = express.Router();
const deleteRouter = express.Router();
const HarmonyHub = require("../Model/User.model");


getRouter.get('/getallcount', async (req, res) => {
    try {
        const harmonyHubs = await HarmonyHub.find();
        res.status(200).json(harmonyHubs);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

getRouter.get('/getcount/:id', async (req, res) => {
    try {
        const harmonyHub = await HarmonyHub.findOne({ id: req.params.id });
        if (!harmonyHub) {
            return res.status(404).send({
                message: "Harmony Hub not found"
            });
        }
        res.status(200).json(harmonyHub);
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});

postRouter.post('/addcount',authenticateToken, async (req, res) => {
    const {error, value}=schema.validate(req.body, {abortEarly:false});
    try {
        if(!error){
        const {id,name,age} = req.body
        const newHarmonyHub = await HarmonyHub.create({id,name,age});
        res.status(201).json(newHarmonyHub);}
        else{
            return res.status(400).send({
                message: `Bad request, error:${error}`
            })
            console.error(error)
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Internal server error"
        });
    }
});



module.exports = { getRouter, postRouter };