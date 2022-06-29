const userService = require('../../service/userService')

const {getPayload} = require('../../utils/jwt');
const {AuthenticationError} = require('apollo-server');
const codeResolvers={
    Query:{

    },
    Mutation:{
        confirmAccount:async=(parent,args,context,info)=>{
            const {code} = args;
            console.log(code)
            console.log(context.loggedIn);
            const result =userService.checkCode(context.user.email,code);
            if(result ===true) {
                return 'An account has been confirmed';
            }else{

            }
        }
    }
}


module.exports={
    codeResolvers
}