const express = require('express');
const router = express.Router();
const ModelBlog = require('../model/modelBlog')
const ModelOhWow = require('../model/modelOhWow');
const ModelVideo = require('../model/modelVideo');
const ModelEnVrac = require('../model/modelEnVrac');
const modelEnVrac = require('../model/modelEnVrac');
const modelQuiz = require('../model/modelQuiz');
const modelAnimalTotem = require('../model/modelAnimal');

// general 

router.get('/', async (req, res) => {
    res.send({title:'hello on data skyblag'})
})

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

router.get('/getAll', async (req, res) => {
    try{
        const data = await ModelBlog.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({ message : error.message})
    }
});

router.get('/getOne/:id', (req, res)=> {
    res.send(req.params.id);
} )

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

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await ModelBlog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ohWow 
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

// En vrac 
router.post('/post-enVrac', async (req, res) => {
    try{
       const {title, content, image} = req.body;
       const newEnVrac = new ModelEnVrac({
            title:title,
            content:content,
            image:image,
       });
       const savedEnVRac = await newEnVrac.save();
       res.status(201).json({message: 'enVrac informations saved successfully', enVrac:savedEnVRac})
    } catch(error){
        res.status(400).json({message: error.message});
    }
});

router.get('/getAllEnVrac', async (req, res) => {
    try{
        const dataEnVrac = await modelEnVrac.find();
        res.json(dataEnVrac)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

router.patch('/updateEnVrac/:id', async (req, res)=> {
    try{
        const {id} =req.params;
        const {title, image, content} = req.body;
        const updatedEnVrac = await ModelEnVrac.findByIdAndUpdate(id, {title, image, content}, {new:true});
        if(!updatedEnVrac){
            return res.status(404).json({message: 'en Vrac post not found'});
        }
        res.status(200).json({message: 'En vrac post updated successfully', enVrac:updatedEnVrac})
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

router.delete('/deleteEnVrac:id', async (req, res) => {
    try{
        const {id} = req.params;
        const deletedEnVrac = await ModelEnVrac.findByIdAndDelete(id);
        if(!deletedEnVrac){
            return res.status(404).json({message: 'en vrac post not found.'});
        }
        res.status(200).json({message: 'en vrac post deleted successfully.'})
    } catch (error){
        res.status(500).json({message: error.message});
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

router.patch('/updateVideo/:id', async (req, res)=> {
    try{
        const {id} =req.params;
        const {title, src} = req.body;
        const updatedVideo= await ModelVideo.findByIdAndUpdate(id, {title, src}, {new:true});
        if(!updatedVideo){
            return res.status(404).json({message: 'Video post not found'});
        }
        res.status(200).json({message: 'Video updated successfully', video:updatedVideo})
    } catch(error){
        res.status(500).json({message: error.message})
    }
})


router.delete('/delete-videos/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const deletedVideo = await ModelVideo.findByIdAndDelete(id); 
        if(!deletedVideo){
            return res.status(404).json({ message: 'videos infos not found.'});
        }
        res.status(200).json({message:'video infos deleted successfully.'})
    } 
    catch(error){
        res.status(500).json({message : error.message});
    }
});

//quiz

router.post('/postQuiz', async (req, res) => {
    try{
        const {question, numeroQuestion, answer1, answer1Score, 
            answer2, answer2Score, answer3, answer3Score, answer4, answer4Score, 
            answer5, answer5Score,image 
        } = req.body;
        const newQuiz = new modelQuiz({
            question:question,
            numeroQuestion:numeroQuestion,
            answer1:answer1,
            answer1Score: answer1Score,
            answer2:answer2,
            answer2Score:answer2Score,
            answer3:answer3,
            answer3Score:answer3Score, 
            answer4:answer4,
            answer4Score:answer4Score,
            answer5:answer5,
            answer5Score:answer5Score,
            image:image
        });

        const savedQuiz= await newQuiz.save();
        res.status(201).json({ message : 'question saved successfully', quiz: savedQuiz });
    } catch(error){
        res.status(400).json({ message : error.message});
    }
})

router.get('/getAllQuiz', async (req, res) => {
    try {
        const data = await modelQuiz.find();
        res.json(data)
    } catch(error){
        res.status(500).json({message : error.message})
    }
});

// animal totem 

router.post('/postAnimalTotem', async (req, res) => {
    try{
        const { name, image, description1, description2, conseil, legend} = req.body;
        const newAnimalTotem = new modelAnimalTotem({
            name:name,
            image:image,
            description1:description1,
            description2:description2,
            conseil:conseil,
            legend:legend,
        });
        const savedAnimalTotem = await newAnimalTotem.save();
        res.status(201).json({message: "animal totem saved successfully", animalTotem: savedAnimalTotem})
    } catch(error){
        res.status(400).json({message : error.message});
    }
})

router.patch('/patchAnimalTotem', async(req, res) => {
    try{
        const {id} = req.params;
        const {name, image, description1, description2, conseil, legend } = req.body;
        const updatedAnimalTotem = await modelAnimalTotem.findByIdAndUpdate
        (id, {name, image, description1, description2, conseil, legend}, {new:true});
        if(!updatedAnimalTotem){
            return res.status(404).json({ message: 'Animal Totem not found.'});
        } 
        res.status(200).json({ message : 'animal totem updated with success', animalTotem : updatedAnimalTotem})
    } catch(error){
        res.status(500).json({ message: error.message})
    }
})

router.get('/getAllAnimalsTotem', async(req, res) => {
    try{
        const data = await modelAnimalTotem.find();
        res.json(data)
    } catch(error){
        res.status(500).json({message : error.message})
    }
})

router.delete('/deleteAnimalTotem', async(req, res) => {
    try{
        const {id} = req.params;
        const deletedAnimalTotem = await modelAnimalTotem.findByIdAndDelete(id); 
        if(!deletedAnimalTotem){
            return res.status(404).json({ message: 'animal totem not found.'});
        }
        res.status(200).json({message:'animal totem deleted successfully.'})
    } 
    catch(error){
        res.status(500).json({message : error.message});
    }
})
module.exports = router;