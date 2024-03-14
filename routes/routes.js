const express = require('express');
const router = express.Router();
const ModelBlog = require('../model/modelBlog')
const ModelOhWow = require('../model/modelOhWow');
const ModelVideo = require('../model/modelVideo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



//post 
router.post('/post', async (req, res) => {
    try {
        const { title, content1, content2, content3, image, legend, image2, legend2} = req.body;

        const newBlog = new ModelBlog({
            title: title,
            content1: content1,
            content2: content2,
            content3: content3,
            image:image,
            legend : legend,
            image2:image2,
            legend2: legend2
        });

        const savedBlog = await newBlog.save();
        
        res.status(201).json({ message: 'Blog post saved successfully.', blog: savedBlog });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//get all 
router.get('/getAll', async (req, res) => {
    try{
        const data = await ModelBlog.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({ message : error.message})
    }
});

// get by id 
router.get('/getOne/:id', (req, res)=> {
    res.send(req.params.id);
} )

// update by id
router.patch('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, image2, legend, legend2 } = req.body;
        const updatedBlog = await ModelBlog.findByIdAndUpdate(id, { title, content, image, image2, legend, legend2 }, { new: true });

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.status(200).json({ message: 'Blog updated successfully.', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await ModelBlog.findByIdAndDelete(id);

        res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.status(500).json({ message: error.message });
    }
});

// oh wow part

router.post('/postOhwow', async (req, res) => {
    try {
        const {title, image} = req.body;
    
        const newOhWow = new ModelOhWow({
            title:title,
            image:image,
        });
        const savedOhWow = await newOhWow.save();
        res.status(201).json({message: 'Oh Wow Post saved successfully.', ohWow : savedOhWow });
    } catch (error){
        res.status(400).json({ message: error.message });
    }
    })


router.get('/getAllOhWow', async (req, res) => {
    try {
        const dataOhWow = await ModelOhWow.find();
        res.json(dataOhWow)
    }
    catch(error){
        res.status(500).json({ message: error.message})
    }
})

// update
router.patch('/update-wow/:id', async (req, res ) => {
    try {
        const {id} = req.params;
        const {title, image} = req.body;
        const updatedWow = await ModelOhWow.findByIdAndUpdate(id, {title, image}, {new:true});
        
        if(!updatedWow) {
            return res.status(404).json({message : 'oh wow post not found.'})
        }
        res.status(200).json({message : 'oh wow post updated successfully', wow: updatedWow})
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

// video part

router.post('/post-video', async (req, res) => {
    try {
        const {title, src} = req.body;
        const  newVideo = new ModelVideo({
            title:title,
            src:src,
        });
        const savedVideo = await newVideo.save();
        res.status(201).json({message: 'video informations saved successfully', video:savedVideo})
    } catch(error){
        res.status(400).json({message: error.message});
    }
})

router.get('/getAllVideos', async (req, res) => {
    try{
        const dataVideos = await ModelVideo.find();
        res.json(dataVideos)
        res.status(200);
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
});

router.delete('/delete-videos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const deletedVideo = await ModelVideo.findByIdAndDelete(id);
        res.status(200).json({message:'video infos deleted successfully.'})
    } 
    catch(error){
        if(!deletedVideo){
            return res.status(404).json({ message: 'videos infos not found.'});
        }
        res.status(500).json({message : error.message});
    }
});

module.exports = router;