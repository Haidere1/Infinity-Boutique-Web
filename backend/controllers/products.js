
import prmodel from "../models/product.js";

export const addProduct = async (req, res) => {
    const { prID, prName, prPrice, prDescription, prImage, category } = req.body;

    if (!prName) return res.status(400).json({ message: 'prName is required' });

    const newProductm = new prmodel({
        prID: prID || '',
        prName,
        prPrice: prPrice || '',
        prDescription: prDescription || '',
        prImage: prImage || '',
        category: category || 'unisex',
    });

    try {
        await newProductm.save();
        res.json(newProductm);
    } catch (error) {
        console.log('Product not added:', error.message);
        res.status(500).json({ message: 'Could not save product' });
    }
};


export const getProducts = async (req, res) => {
    try {
        const prlist = await prmodel.find();
        res.json(prlist);

    } catch (error) {
        console.log("Couldnt Find Any Data")
    }
};

export const prDelete = async (req, res,) => {
    try {
        const deletedproduct = await prmodel.findByIdAndDelete(req.params.id);
        console.log(deletedproduct);
        res.status(200).json({ message: "Product Deleted" });

    } catch (error) {


        console.log("delete failed")

    }

}

export const getproduct = async (req, res) => {
    try {
        const pr = await prmodel.findById(req.params.id);
        res.json(pr);

    } catch (error) {
        console.log("Couldnt Find Any Data")
    }

}

export const editProduct = async (req, res) => {
    const { prID, prName, prPrice, prDescription, prImage, category } = req.body;

    try {
        const updated = await prmodel.updateOne({ _id: req.params.id }, {
            ...(prID !== undefined && { prID }),
            ...(prName !== undefined && { prName }),
            ...(prPrice !== undefined && { prPrice }),
            ...(prDescription !== undefined && { prDescription }),
            ...(prImage && { prImage }),
            ...(category !== undefined && { category }),
        });
        res.json(updated);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}