import { Request, Response, NextFunction } from 'express';
import Api from '../Api';
import UserService from '../../application/service/UserService';
import HttpMethod from '../HttpMethod';
import User from '../../domain/user/User';

/**
 * Userを追加するAPI。
 */
export default class UserAddApi implements Api {
  constructor(private readonly service: UserService) {}

  public get uri() {
    return '/user';
  }

  public get method() {
    return HttpMethod.Post;
  }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user = User.prototypeOf(req.body.name);
    const createdUser = await this.service.register(user);
    res.json(createdUser);
  }
}