import foodModel from "../models/foodModel.js";
import fs from "fs";
//add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food item added successfully"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Food item not added"})
    }
}
//all food list
const listFood = async (req, res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Food item not found"})
    }
}
//remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food item not found" });
        }

        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (error) => {
                if (error) console.log(error);
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food item removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Food item not removed" });
    }
};

export { addFood, listFood, removeFood };