import type { User } from '../models/user';
import { randomId } from '../utils/randomId';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from '../utils/wait';

const users = [
  {
    id: '1',
    username: 'kerbin admin',
    email: 'kerbin@test.com',
    name: 'kerbin griman',
    password: 'Admin123.',
    role: 'admin',
  }
];
type typeCredentials = {
    email: String,
    password: String
}

class AuthApi {
  async login({ email, password } : typeCredentials): Promise<string> {
    await wait(500);
    return new Promise((resolve, reject) => {
      try {
        const user = users.find((_user) => _user.email === email);

        if (!user || user.password !== password) {
          reject(new Error('Email and password combination does not match'));
          return;
        }

        const accessToken = sign({ userId: user.id }, JWT_SECRET, {
          expiresIn: JWT_EXPIRES_IN
        });

        resolve(accessToken);
      } catch (err) {
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }


  me(accessToken: string): Promise<User> {
    return new Promise((resolve, reject) => {
      try {
        const { userId } = decode(accessToken) as any;

        const user = users.find((_user) => _user.id === userId);

        if (!user) {
          reject(new Error('Invalid authorization token'));
          return;
        }

        resolve({
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          role: user.role,
          password:'s'
        });
      } catch (err) {
        console.error(err);
        reject(new Error('Internal server error'));
      }
    });
  }
}

export const authApi = new AuthApi();
