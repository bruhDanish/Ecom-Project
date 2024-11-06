const category_model = require('../models/category.model');

//controller for creating category
//POST localhost:8888/ecomm/api/v1/category

exports.createNewCategory = async (req, res) => {
    //read the request body
    

    //create a new category
    const cat_data = {
        name: req.body.name,
        description: req.body.description
    }

    //insert into db
    try{
        const category = await category_model.create(cat_data);

        return res.status(201).send(category);
    }catch(err){
        console.log('Error creating category', err);     
        return res.status(500).send({
            message: 'Error creating category'
        })
    }

    //return response
}

