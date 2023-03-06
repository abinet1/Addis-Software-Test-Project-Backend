import { Request, response, Response } from "express";
import Musics from "../models/Musics";

// @ts-ignore
function param(query){
    var response = {}
    // @ts-ignore
    query.title != '' ? response['title'] = {$regex: query.title}  : '';
    // @ts-ignore
    query.album != '' ? response['album'] = {$regex: query.album}  : '';
    // @ts-ignore
    query.genre != '' ? response['genre'] = {$regex: query.genre}  : '';

    return response;

}

const urls = [
    "https://cdn.pixabay.com/photo/2018/06/30/09/29/monkey-3507317_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/11/23/00/58/record-player-1851576_960_720.jpg",
    "https://cdn.pixabay.com/photo/2022/09/07/17/26/vintage-pocket-watch-7439233_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/06/29/01/47/piano-3505109_960_720.jpg",
    "https://cdn.pixabay.com/photo/2018/08/27/10/11/radio-cassette-3634616_960_720.png",
    "https://cdn.pixabay.com/photo/2014/11/26/15/20/saxophone-546303_960_720.jpg",
    "https://cdn.pixabay.com/photo/2013/11/03/08/05/cheers-204742_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/03/16/23/55/flea-market-1262036_960_720.jpg",
    "https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png",
    "https://cdn.pixabay.com/photo/2016/01/14/06/09/woman-1139397_960_720.jpg",
    "https://cdn.pixabay.com/photo/2016/09/08/21/09/piano-1655558_960_720.jpg",
    ]

function get(){
    const url = urls[Math.floor(Math.random() * urls.length)]
    return(url)
}




export const allMusic =async (req: Request, res: Response) => {
    try {
        const musics = await Musics.find();
        return res.status(200).json(musics);
    } catch (error) {
        return res.status(500)
    }
}

export const allMusics =async (req: Request, res: Response) => {
    try {
        const filter = param(req.query);
        const musics = await Musics.find(filter);
        return res.status(200).json(musics);
    } catch (error) {
        return res.status(500)
    }
}

export const addMusic=async (req: Request,res: Response)=>{

    try {
        const data = {
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            album: req.body.album,
            image: get()
        }
        const musicTocreate = await Musics.create(data);
        const musics = await Musics.find();
        return res.status(201).json(musics);
    }catch(error){
        return res.sendStatus(500)
    }
}

export const detailMusic=async(req: Request,res: Response)=>{
    
    try {
        const {id} = req.params;
        const singleMusic = await Musics.findById(id);
        return res.status(201).json(singleMusic);
    }catch(error){
        return res.sendStatus(500)
    }
}

export const updateMusic=async (req: Request,res: Response)=>{
    try {
        const {id} =req.params;
        const musicToUpdate = await Musics.findByIdAndUpdate(id, req.body, {new:true});
    
        return res.status(201).json(musicToUpdate);
    }catch(error){
        return res.sendStatus(500)
    }
}

export const deleteMusic=async (req: Request,res: Response)=>{
    try {
        const { id } = req.params;
        await Musics.findByIdAndDelete(id);
    
        const musics = await Musics.find();
        return res.status(201).json(musics);
    }catch(error){
        return res.sendStatus(500)
    }
}