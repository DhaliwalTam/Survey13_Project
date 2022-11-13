import { UserDisplayName } from "../utils/index.js";

export function DisplayHomePage(req, res, next) {
    res.render('index', {
        title: 'Home',
        page: 'home',
        displayName: UserDisplayName(req)
    });
}