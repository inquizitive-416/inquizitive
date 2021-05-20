const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcryptjs");
const tokens = require("../utils/tokens");
const User = require("../models/users-model");

module.exports = {
  Query: {
    /**
			getUserById
		**/
    getCurrentUser: async (_, __ , {req}) => {
      console.log(req.userId);
      const _id = new ObjectId(req.userId);
      if (!_id) {
          return ({});
      }
      const found = await User.findOne(_id);
      if (found) {
          return found;
      }
    },

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
      getUserByEmail: async (_, args) => {
        const { email } = args;
        console.log("email",email)
        // const objectId = new ObjectId();
        const user = await User.findOne({ email: email });
        
        if (user) {
          
          const original_password = await bcrypt.hash(user.password, 10);
          user.password=original_password
          console.log("user",user)
          return user;
        }
        else return {};
      },

      getAllUsers: async (_, args) => {
        const { skip, limit } = args;
        const users = await User.find().sort({ _id: -1 }).skip(skip).limit(limit);
        if (users) return users;
        else return {};
      },

      getSearchedPlatforms: async (_, args) => {
        const { username, skip, limit } = args;
        const users = await User.find({ username: {$regex: username, $options: 'i'} }).sort({ _id: -1 }).skip(skip).limit(limit);
        if (users) return users;
        else return {};
      },

      getAllUsersCount: async (_, args) => {
        const { skip, limit } = args;
        const users = await User.find().sort({ _id: -1 });
        if (users) return users;
        else return {};
      },

      getSearchedPlatformsCount: async (_, args) => {
        const { username } = args;
        const users = await User.find({ username: {$regex: username, $options: 'i'} });
        if (users) return users;
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
    login: async (_, args, { res }) => {
      const { email, password } = args;
      // if (!email || !password)         // Check that both email and password were sent
      //     return ({ email: "Must provide both email and password." })
      // console.log(args);
      const user = await User.findOne({ email: email });

      if(!user){

         return({});
        }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {                       // Check that the password sent matches the stored hashed password
          return ({});
      }
      
      const accessToken = tokens.generateAccessToken(user);
      // console.log(accessToken);
      const refreshToken = tokens.generateRefreshToken(user);
      
      // console.log(refreshToken);
      res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true});
      res.cookie('access-token', accessToken, { httpOnly: true, sameSite: 'None', secure: true});
      console.log(res);
      return user;
    },
    reset: async (_,args)=>{
      const {email,password} = args;
      const user = await User.findOne({email:email})
      console.log(user)
      const hashed = await bcrypt.hash(password,10)
      const updated = await User.updateOne({_id:user._id},{password:hashed})
      console.log(updated)
      if(updated) return user
      else return false

    },
      /**
		 	@param 	 {object} args - an empty user object
			@returns {string} the objectID of the new user, or an error message
		**/
    register: async (_, args,{res}) => {
        
      const { 
        firstName,
        lastName,
        email,
        username,
        password,
        securityQuestionOne,
        securityAnswerOne,
        securityQuestionTwo,
        securityAnswerTwo } = args;
      // console.log(args)
      // const objectId = new ObjectId();
      if((firstName==="")&&
        (lastName==="") &&
        (email==="")&&
        (username==="")&&
        (password==="")&&
        (securityQuestionOne==="")&&
        (securityAnswerOne==="")&&
        (securityQuestionTwo==="")&&
        (securityAnswerTwo==="")){
          console.log("nam");
          return ({});
        }
      const username_exists = await User.findOne({ username: username });
      if (username_exists) {
          return ({});
      }
      
      const email_exists = await User.findOne({ email: email });
      if (email_exists) {
          return ({});
      }
      const hashed_password = await bcrypt.hash(password, 10);
      const _id = new ObjectId();

      const user = new User({
        _id: _id,
        // userId: userId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: hashed_password,
        dateOfBirth: "",
        securityQuestionOne: securityQuestionOne,
        securityAnswerOne: securityAnswerOne,
        securityQuestionTwo: securityQuestionTwo,
        securityAnswerTwo: securityAnswerTwo,
        profilePicture: "",
        profilePublic: false,
        coins: 0,
      });
      const reg = await user.save();
      const accessToken = tokens.generateAccessToken(user);
      const refreshToken = tokens.generateRefreshToken(user);
      res.cookie('refresh-token', refreshToken, { httpOnly: true});
      res.cookie('access-token', accessToken, { httpOnly: true});
      return user;
    },
    /** 
    @param 	 {object} res - response object containing the current access/refresh tokens  
    @returns {boolean} true 
  **/
    logout:(_, __, { res }) => {
      res.clearCookie('refresh-token');
      res.clearCookie('access-token');
      return true;
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

      updateUserVisibility: async (_, args) => {
        const { value, _id } = args;
        const objectId = new ObjectId(_id);
        const updated = await User.updateOne(
          { _id: objectId },
          { ["profilePublic"]: value }
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