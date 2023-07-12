export const adminSession = (req, res, next) => {
    if(req.session.user.role !== "Admin"){
        return res.status(403).send({error: { status:403, message:'Access denied.'}})
    };
    next();
};
export const publicAcces = (req, res, next) =>{
    if(req.session.user) return res.redirect('/profile');
    next();
};
export const privateAcces = (req, res, next)=>{
    if(!req.session.user) return res.redirect('/login');
    next();
};