import { Request, Response, NextFunction } from "express";
import Api from "../Api";
import HttpMethod from "../HttpMethod";

/**
 * 写真データを返すAPI。
 */
export default class PhotoListApi implements Api {
    public get uri() {
        return '/photo/list';
    }

    public get method() {
        return HttpMethod.Get;
    }

    public execute(req: Request, res: Response, next: NextFunction): any {
        var photoList = [
            {
                id: "001",
                name: "photo001.jpg",
                type: "jpg",
                dataUrl: "http://localhost:3000/data/photo001.jpg"
            }, {
                id: "002",
                name: "photo002.jpg",
                type: "jpg",
                dataUrl: "http://localhost:3000/data/photo002.jpg"
            }
        ]
        res.json(photoList);
    }
}