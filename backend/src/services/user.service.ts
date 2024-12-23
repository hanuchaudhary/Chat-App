import userModel from "../models/user.model"
import bcrypt from 'bcrypt';

export const createUser = async ({ email, password }: { email: string, password: string }) => {
    if (!email || !password) {
        throw new Error("Email and Password is Required");
    } else {

        const userExists = await userModel.findOne({
            email
        });

        if (userExists) {
            throw new Error("User Already Exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            email,
            password: hashedPassword
        })

        return user;
    }
}


export const loginUser = async ({ email, password }: { email: string, password: string }) => {
    if (!email || !password) {
        throw new Error("Email and Password is Required");
    }
    const user = await userModel.findOne({
        email
    }).select('+password');

    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid Password");
    }

    return user;
}
