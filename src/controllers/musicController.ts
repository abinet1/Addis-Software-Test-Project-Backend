import { Request, Response } from "express";
import Musics from "../models/Musics";

export const allMusics =async (req: Request, res: Response) => {
    const musics = await Musics.find();
    try {
        return res.status(200).json(musics);
    } catch (error) {
        return res.status(500).json({err: error})
    }
}

export const addMusic=async (req: Request,res: Response)=>{
    const musicTocreate = await Musics.create(req.body);
    try {
        return res.status(201).json(musicTocreate);
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