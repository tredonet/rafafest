import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserService } from "./UserService";

export class AuthService {
    private userService: UserService;
    private jwtSecret: string;

    constructor(userService: UserService, jwtSecret: string) {
        this.userService = userService;
        this.jwtSecret = jwtSecret;
    }

    async login(username: string, password: string) {
        const user = await this.userService.findOne({ username });
        if (!user) throw new Error("forbidden");
        const match = bcrypt.compareSync(password, user.password);
        if (!match) throw new Error("forbidden");
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: user.username
        }, this.jwtSecret);
        if (!token) throw new Error("internal_server_error");
        return token;

    }

    async register(username: string, _password: string) {
        const existingUser = await this.userService.findOne({ username });
        if (existingUser) throw new Error("user exists");
        const password = bcrypt.hashSync(_password, 10);
        const user = await this.userService.create({ username, password });
        const { password: _p, ...newUser } = user;
        return newUser;
    }
}
