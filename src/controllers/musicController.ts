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
        const musicTocreate = await Musics.create(req.body);
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