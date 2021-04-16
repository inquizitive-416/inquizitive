const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcryptjs");
const tokens = require("../utils/tokens");
const User = require("../models/users-model");

module.exports = {
  Query: {
    /**
			getUserById
		**/

    /**
		 	@param 	 {object} args - a user id
			@returns {object} a user on success and an empty object on failure
		**/
      getUserById: async (_, args) => {
        const { _id } = args;
        const objectId = new ObjectId(_id);
        const user = await User.findOne({ _id: objectId });
        if (user) return user;
        else return {};
      },
    },

    Mutation: {
      /**
			addUser,
			deleteUser,
			updateUserField,
      userLogin,
      userLogout,
      userRegister
		**/

      /**
		 	@param 	 {object} args - an empty user object
			@returns {string} the objectID of the new user, or an error message
		**/
      addUser: async (_, args) => {
        const { user } = args;
        const objectId = new ObjectId();
        const {
          userId,
          firstName,
          lastName,
          email,
          username,
          password,
          dateOfBirth,
          securityQuestionOne,
          securityAnswerOne,
          securityQuestionTwo,
          securityAnswerTwo,
          profilePicture,
          profilePublic,
          coins,
        } = user;
        const newUser = new User({
          _id: objectId,
          userId: userId,
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          password: password,
          dateOfBirth: dateOfBirth,
          securityQuestionOne: securityQuestionOne,
          securityAnswerOne: securityAnswerOne,
          securityQuestionTwo: securityQuestionTwo,
          securityAnswerTwo: securityAnswerTwo,
          profilePicture: profilePicture,
          profilePublic: profilePublic,
          coins: coins,
        });
        const updated = await newUser.save();
        if (updated) return objectId;
        else return "Could not add user";
      },
      /**
		 	@param 	 {object} args - a user objectID
			@returns {boolean} true on successful delete, false on failure
		**/
      deleteUser: async (_, args) => {
        const { _id } = args;
        const objectId = new ObjectId(_id);
        const deleted = await User.deleteOne({ _id: objectId });
        if (deleted) return true;
        else return false;
      },
      /**
		 	@param 	 {object} args - a user objectID, field (username, password, etc), and the update value
			@returns {boolean} true on successful update, false on failure
		**/
      updateUserField: async (_, args) => {
        const { field, value, _id } = args;
        const objectId = new ObjectId(_id);
        const updated = await User.updateOne(
          { _id: objectId },
          { [field]: value }
        );
        if (updated) return true;
        else return false;
      },
      /**
            @param {object} args - username and password required
            @param {object} res - response object containing current access/refresh tokens
            @returns {object} returns User on success, error message on fail
        **/
      // userLogin: async (_, args, { res }) => {
      //   const { username, password } = args;
      //   if (!username || !password) {
      //     return { username: "Please enter both username and password" };
      //   }
      //   const user = await User.findOne({ username: username });
      //   if (!user) {
      //     return { username: "User not found" };
      //   }
      //   const valid = await bcrypt.compare(password, user.password);
      //   if (!valid) {
      //     return { username: "Password is incorrect" };
      //   }
      //   const accessToken = tokens.generateAccessToken(user);
      //   const refreshToken = tokens.generateRefreshToken(user);
      //   res.cookie("refresh-token", refreshToken, { httpOnly: true });
      //   res.cookie("access-token", accessToken, { httpOnly: true });
      //   return user;
      // },
      /** 
			@param 	 {object} res - response object containing the current access/refresh tokens  
			@returns {boolean} returns true 
		**/
      // userLogout: (_, __, { res }) => {
      //   res.clearCookie("refresh-token");
      //   res.clearCookie("access-token");
      //   return true;
      // },
      /**
            @param {object} args - required fields
            @param {object} res - response object containing current access/refresh tokens
            @returns {object} returns new User on success, error message on fail
        **/
      // userRegister: async (_, args, { res }) => {
      //   const {
      //     username,
      //     password,
      //     email,
      //     dateOfBirth,
      //     firstName,
      //     lastName,
      //     securityQuestionOne,
      //     securityAnswerOne,
      //     securityQuestionTwo,
      //     securityAnswerTwo,
      //     confirmPassword,
      //   } = args;
      //   if (
      //     !username ||
      //     !email ||
      //     !password ||
      //     !firstName ||
      //     !lastName ||
      //     !dateOfBirth ||
      //     !securityQuestionOne ||
      //     !securityAnswerOne ||
      //     !securityQuestionTwo ||
      //     !securityAnswerTwo ||
      //     !confirmPassword
      //   ) {
      //     return {
      //       username: "All fields must be filled out",
      //     };
      //   }
      //   const usernameExists = await User.findOne({ username: username });
      //   if (usernameExists) {
      //     return {
      //       username: "This username is already taken",
      //     };
      //   }
      //   const emailExists = await User.findOne({ email: email });
      //   if (emailExists) {
      //     return {
      //       username: "An account with this email has already been registered",
      //     };
      //   }
      //   const valid = await bcrypt.compare(password, confirmPassword);
      //   if (!valid) {
      //     return {
      //       username: "Passwords do not match",
      //     };
      //   }
      //   const hashed_password = await bcrypt.hash(password, 10);
      //   const _id = new ObjectId();
      //   const newUser = new User({
      //     _id: objectId,
      //     userId: 0,
      //     firstName: "",
      //     lastName: "",
      //     email: "",
      //     username: "",
      //     password: hashed_password,
      //     dateOfBirth: "",
      //     securityQuestionOne: "",
      //     securityAnswerOne: "",
      //     securityQuestionTwo: "",
      //     securityAnswerTwo: "",
      //     profilePicture: "",
      //     profilePublic: false,
      //     coins: 0,
      //   });
      //   const saved = await newUser.save();

      //   const accessToken = tokens.generateAccessToken(newUser);
      //   const refreshToken = tokens.generateRefreshToken(newUser);
      //   res.cookie("refresh-token", refreshToken, { httpOnly: true });
      //   res.cookie("access-token", accessToken, { httpOnly: true });
      //   return newUser;
      // }
    }
  }
