import { IRoleToken } from '../../interfaces/token.interface';
import { IUser } from '../../interfaces/users.interface';
import { userService } from '../user/userService';
import { roleService } from '../role/roleService';
import { IRole } from '../../interfaces/role.interface';
import { tokenService } from '../token/tokenService';

class AuthService {
    public async registration(user:IUser):Promise<IRoleToken> {
        const createdUser = await userService.createOne(user);
        const role = await roleService.addRole(createdUser);
        return this._getToken(role);
    }

    private async _getToken(userRole:IRole):Promise<IRoleToken> {
        const { role, userId } = userRole;
        const tokensPair = await tokenService.generateTokenPair({ userId, role });
        const { refreshToken } = tokensPair;
        await tokenService.saveToken({ userId, refreshToken });

        return {
            ...tokensPair,
            userId,
            role,
        };
    }
}

export const authService = new AuthService();
