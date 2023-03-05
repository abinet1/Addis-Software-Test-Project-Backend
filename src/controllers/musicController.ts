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
    const musics = await Musics.find();
    try {
        return res.status(200).json(musics);
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

export const allMusics =async (req: Request, res: Response) => {
    const filter = param(req.query);
    const musics = await Musics.find(filter);
    try {
        return res.status(200).json(musics);
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

export const addMusic=async (req: Request,res: Response)=>{
    const musicTocreate = await Musics.create(req.body);
    const musics = await Musics.find();
    try {
        return res.status(201).json(musics);
    }catch(error){
        return res.send(500).json({msg:"couldn't create music"})
    }
}

export const detailMusic=async(req: Request,res: Response)=>{
    const {id} = req.params;
    const singleMusic = await Musics.findById(id);
    try {
        return res.status(201).json(singleMusic);
    }catch(error){
        return res.send(500).json({msg:"couldn't updating music"})
    }
}

export const updateMusic=async (req: Request,res: Response)=>{
    const {id} =req.params;
    const musicToUpdate = await Musics.findByIdAndUpdate(id, req.body, {new:true});
    try {
        return res.status(201).json(musicToUpdate);
    }catch(error){
        return res.send(500).json({msg:"couldn't updating music"})
    }
}

export const deleteMusic=async (req: Request,res: Response)=>{
    const { id } = req.params;
    await Musics.findByIdAndDelete(id);
    try {
        return res.status(201).json({msg:"deleted successfully"});
    }catch(error){
        return res.send(500).json({msg:"couldn't create music"})
    }
}