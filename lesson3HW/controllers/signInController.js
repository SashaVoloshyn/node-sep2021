class SignInController {

    renderSignInPage(req,res){
        res.render('signIn');
    }

    signInUser(req,res){
        res.redirect(`/users/${req.user.id}`);
    }
}

module.exports = new SignInController();