import { Schema,model } from "mongoose";

export interface Music{
    title: string;
    artist: string;
    date: Date;
    album: string;
    genre: string;
    image: string; 
}

const url="https://cdn.pixabay.com/photo/2016/09/08/21/09/piano-1655558_960_720.jpg"


const MusicSchema = new Schema<Music>({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    date: {type: Date, default: Date.now, required: true},
    album: {type: String, required: true},
    genre: {type: String, required: true},
    image: {type: String, default: url, required: false}, 
})

export default model<Music>('Music', MusicSchema)