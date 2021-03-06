import { inject, injectable } from 'inversify';
import * as moment from 'moment';
import { Pool } from 'pg';
import User from '../../../domain/user/User';
import UserRepository from '../../../domain/user/UserRepository';
import Users from '../../../domain/user/Users';

@injectable()
export default class UserDatasource implements UserRepository {
  constructor(@inject('DbPool') private readonly dbPool: Pool) {}

  public async all(): Promise<Users> {
    const sql = 'SELECT * FROM sample_user.users';
    const { rows } = await this.dbPool.query(sql, []);
    const items = rows.map((row: any) => this.rowToUser(row));
    return new Users(items);
  }

  public async register(user: User): Promise<User> {
    const nextUserIdentifier = await this.nextUserIdentifier();
    await this.insertUser(nextUserIdentifier, user);
    return await this.get(nextUserIdentifier);
  }

  public async get(nextUserIdentifier: number): Promise<User> {
    const sql = 'SELECT * FROM sample_user.users WHERE user_identifier = $1';
    const { rows } = await this.dbPool.query(sql, [nextUserIdentifier]);
    return this.rowToUser(rows[0]);
  }

  private async nextUserIdentifier(): Promise<number> {
    const sql = 'SELECT nextval(\'sample_user.users_seq\') AS identifire';
    const { rows } = await this.dbPool.query(sql, []);
    return rows[0].identifire;
  }

  private async insertUser(userIdentifier: number, user: User): Promise<void> {
    const sql =
      'INSERT INTO sample_user.users (user_identifier, name) VALUES ($1, $2);';
    await this.dbPool.query(sql, [userIdentifier, user.name]);
  }

  private rowToUser(row: any): User {
    return new User(row.user_identifier, row.name, moment(row.created_at));
  }
}
