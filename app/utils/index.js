export function UserDisplayName(req){
    if(req.user){
        return req.user.displayName;
    }
    return '';
}

export function GetUserID(req){
    if(req.user){
        console.log(req.user.id);
        return req.user.id;
        
    }
}

export function GetUsername(req){
    if(req.user){
        return req.user.username
    }
}

export function AuthGuard(req, res, next){
    if(!req.isAuthenticated()){
        return res.redirect('/login')
    }
    next();
}