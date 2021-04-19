const fibInstanceResolvers = require('./fibInstance-resolvers');
const fillInTheBlankResolvers = require('./fillInTheBlank-resolvers');
const mcqInstanceResolvers = require('./mcqInstance-resolvers');
const multipleChoiceResolvers = require('./multipleChoice-resolvers');
const mtpInstanceResolvers = require('./mtpInstance-resolvers');
const mtpQuestionResolvers = require('./MTPQuestion-resolvers');
const orderInstanceResolvers = require('./orderQuestionInstance-resolvers');
const orderQuestionResolvers = require('./orderQuestion-resolvers');
const quizResolvers = require('./quiz-resolvers')
const quizInstanceResolvers = require('./quizInstance-resolvers')
const usersResolvers = require('./users-resolvers');

module.exports = [
    fibInstanceResolvers, 
    fillInTheBlankResolvers, 
    multipleChoiceResolvers, 
    mcqInstanceResolvers, 
    mtpInstanceResolvers, 
    mtpQuestionResolvers,
    orderInstanceResolvers,
    orderQuestionResolvers,
    quizResolvers, 
    quizInstanceResolvers, 
    usersResolvers
];