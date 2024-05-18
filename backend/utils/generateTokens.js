import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,
        {expiresIn:'15d'}
    )

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // for mili seconds
        httpOnly: true, // prevents XSS attack cross-site scripting attacks
        sameSite: "strict",  // for preventing CSRF attack cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development" // this will cheange http to https (scure) for production

    
    })
}


