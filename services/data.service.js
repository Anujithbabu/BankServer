// import jwt
const jwt = require("jsonwebtoken");

//import db
const db = require("./db");

userDetails = {
  1000: {
    acno: 1000,
    username: "amal",
    password: 1000,
    balance: 1000,
    transaction: [],
  },
  1001: {
    acno: 1001,
    username: "john",
    password: 1001,
    balance: 1000,
    transaction: [],
  },
  1002: {
    acno: 1002,
    username: "maya",
    password: 1002,
    balance: 1000,
    transaction: [],
  },
};

const register = (acno, username, password) => {
  return db.User.findOne({ acno }) //data 
                                  //
    .then((user) => {
      if (user) {
        return {
          status: "false",
          statusCode: 400,
          message: "user already registered",
        };
      } else {
        const newUser = new db.User({
          acno: acno,
          username: username,
          password: password,
          balance: 0,
          transaction: [],
        })
        newUser.save(); //data saved in mangoose
        return {
          status: "true",
          statusCode: 200,
          message: "Register Successful",
        };
      }
    });
};

const login = (acno, password) => {
  return db.User.findOne({ acno,password }) //data
    .then((user) => {
      if (user) {
        currentuser = user.username;
        currentAcno = acno;
        const token = jwt.sign(
          {
            currentAcno: acno
          },
          "superkey2022"
        ) //To generate token
        //It will generete number and it assign to token
        return {
          status: "true",
          statusCode: 200,
          message: "Login Successful",
          token: token,
          currentuser:currentuser,
          currentAcno:acno
        }
      } else {
        return {
          status: "false",
          statusCode: 400,
          message: "Invalid userdetails",
        }
      }
    })
}

const deposit = (acno, pswd, amt) => {
  var amount = parseInt(amt);
  return db.User.findOne({ acno, pswd }) //data
    .then((user) => {
      if (user) {
        user.balance += amount;
        user.transaction.push({
          Type: "Credit",
          Amount: amount,
        });
        user.save();
        return {
          status: "true",
          statusCode: 200,
          message: `${amount} is credited and balance is ${user.balance}`,
        };
      } else {
        return {
          status: "false",
          statusCode: 400,
          message: " Incorrect userdetails",
        };
      }
    });
};

//   if(acno in userDetails){
//     if(pswd==userDetails[acno]['password']){
//       userDetails[acno]['balance']+=amount;
//       userDetails[acno]['transaction'].push({
//       Type:'Credit',
//       Amount:amount
//       })
//       return{
//         status:'true',
//         statusCode:200,
//         message:`${amount} is credited and balance is ${userDetails[acno]['balance']}`

//       }
//       // console.log(userDetails);
//       // return userDetails[acno]['balance']
//     }
//             // alert('password mismatch')
//     else{
//       return {
//         status:'false',
//         statusCode:400,
//         message:'Password Incorrect'
//       }
//     }
//   }
//   else{
//     // alert('invalid data')
//     return {
//       status:'false',
//       statusCode:400,
//       message:'Invalid userdetails'
//     }
//   }
// }

const withdraw = (acno,pswd, amt) => {
  var amount = parseInt(amt);
  return db.User.findOne({ acno, pswd }) //data
    .then((user) => {
      if (user) {
        if (user.balance > amount) {
          user.balance -= amount;
          user.transaction.push({
            Type: "Debit",
            Amount: amount,
          });
          user.save();
          return {
            status: "true",
            statusCode: 200,
            message: `${amount} is debited and balance is ${user.balance}`,
          };
        } else {
          // alert('transaction failed')
          return {
            status: "false",
            statusCode: 400,
            message: "Invalid userdetails",
          };
        }
      }
    });
};
// if(acno in userDetails){
//   if(pswd==userDetails[acno]['password']){
//     if(userDetails[acno]['balance']>amount){
//     userDetails[acno]['balance']-=amount;
//     userDetails[acno]['transaction'].push({
//       Type:'Debit',
//       Amount:amount
//       })
//     // console.log(userDetails);
//     return {
//       status:'true',
//       statusCode:200,
//       message:`${amount} is debited and balance is ${userDetails[acno]['balance']}`

//     }
//   }
//   else{
//     // alert('transaction failed')
//     return {
//       status:'false',
//       statusCode:400,
//       message:'transaction failed'
//     }
//   }
// }
//   else{
//     // alert('password mismatch')
//     return {
//       status:'false',
//       statusCode:400,
//       message:'Password Incorrect'
//     }
//   }

// }
// else{
//   // alert('invalid data')
//   return {
//     status:'false',
//     statusCode:400,
//     message:'Password Incorrect'
//   }
// }

// }
const getTransaction = (acno) => {
  return db.User.findOne({ acno }) //data
    .then((user) => {
      if (user) {
        return {
          status: "true",
          statusCode: 200,
          transaction: user.transaction,
        };
      } else {
        return {
          status: "false",
          statusCode: 400,
          message: "User not found",
        };
      }
    });
};

//to delete an account

const deleteAcc=(acno)=>{
  return db.User.deleteOne({acno})
  .then(user=>{
    if(user){
      return {
        status: "true",
        statusCode: 200,
        message: `User Deleted successfully`,
      }
    }
    else{
      return {
        status: "false",
        statusCode: 400,
        message: "User not found"
      }
    }
  })
}
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc
};
