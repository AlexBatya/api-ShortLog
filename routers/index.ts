import checkRouter from './checkRouter';
import videoShortRouter from './videoShortRouter_post';
import videoOnServerRouter from './videoOnServerRouter';

export default (token: string, app: any) => {
    checkRouter(token, app);
    videoShortRouter(token, app);
    videoOnServerRouter(token, app);
}