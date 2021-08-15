import { DataLogin, ResponseAuth } from 'src/domain/user';
import { TypedEvent } from 'src/helper/event';
import Cookies from 'universal-cookie';
import md5 from 'md5';
import { ApiService } from '../api/ApiService';

interface Dependencies {
    apiService: ApiService;
}
const TOKEN_COOKIE_KEY = 'token';

export class AuthService {
    private apiService: ApiService;

    private onTokenChange = new TypedEvent<string | undefined>();

    private cookies = new Cookies();

    constructor({ apiService }: Dependencies) {
        this.apiService = apiService;
    }

    async login(data: DataLogin): Promise<ResponseAuth> {
        const res = await this.apiService.post({
            url: '',
            data: {
                studentAccount: data.username.toUpperCase(),
                studentPassword: md5(data.password),
            },
        });
        await this.saveToken('accesstoken');
        return res.json();
    }

    saveToken = (token: string): void => {
        // save token to browser cookies
        this.cookies.set(TOKEN_COOKIE_KEY, token, { path: '/' });

        // token listener cb execute
        this.onTokenChange.emit(token);
    };

    getToken = (): string => {
        // get token from browser cookies
        const token = this.cookies.get<string>(TOKEN_COOKIE_KEY);

        if (!token) return '';

        return token;
    };

    removeToken = (): void => {
        // get token from browser cookies
        this.cookies.remove(TOKEN_COOKIE_KEY);

        // token listener cb execute
        this.onTokenChange.emit(undefined);
    };
}
