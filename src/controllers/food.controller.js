const foodModel = require("../models/fooditem.model");
const storageService = require('../services/storage.service');
const { v4 : uuid} = require("uuid");

async function createFood(req,res){
    
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    const foodItem =    await foodModel.create({
        name:req.body.name,
        description:req.body.description,
        video:fileUploadResult.url,
        foodPartner:req.foodPartner._id
    })
    res.status(201).json({
        message:"Food Created Successfully",
        food:foodItem
    })  


}
async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({})
        .populate('likes', 'fullName')
        .populate('dislikes', 'fullName')
        .lean()
    console.log('Found food items:', foodItems.length);
    // Normalize for frontend: likeCount
    const items = foodItems.map(item => ({
        ...item,
        likeCount: item.likes?.length ?? 0,
        dislikeCount: item.dislikes?.length ?? 0
    }))
    res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems: items
    })
}
async function getFoodItemsByPartner(req, res) {
    const { partnerId } = req.params
    const foodItems = await foodModel.find({ foodPartner: partnerId })
        .populate('likes', 'fullName')
        .populate('dislikes', 'fullName')
        .populate('comments.user', 'fullName email')
        .lean()
    res.status(200).json({ message: 'Food items fetched', foodItems })
}


module.exports = {
    createFood,
    getFoodItems,
    getFoodItemsByPartner
};