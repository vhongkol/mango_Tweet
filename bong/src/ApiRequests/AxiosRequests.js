import axios from 'axios';

export async function sendCodeForgotPassword(email) {
    
  var statusCode = 0;
  const res = await axios.post('http://127.0.0.1:8000/api/forgot-password', 
  {    
    email: email,         
  },
  {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  }).then(function (response) {
    statusCode = response.status;
    return response.data;      
  })
  .catch(function (error) {      
    statusCode = error.response.status;
    return error.response.data;      
  });      

  return [statusCode, res];
}

export async function resetPassword(
    
  email,
  otp,    
  password,
  confirmPassword) {
    
  var statusCode = 0;
  const res = await axios.post('http://127.0.0.1:8000/api/otp-reset-password', 
  {    
    email: email,
    otp: otp,
    password: password,
    password_confirmation: confirmPassword,      
  },
  {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  }).then(function (response) {
    statusCode = response.status;
    return response.data;      
  })
  .catch(function (error) {      
    statusCode = error.response.status;
    return error.response.data;      
  });      

  return [statusCode, res];
}

export async function register(
  
  firstname,
  lastname,
  gender,  
  email,
  password,
  confirmPassword) {
    
  var statusCode = 0;
  const res = await axios.post('http://127.0.0.1:8000/api/register', 
  {
    first_name: firstname,
    last_name: lastname,
    gender: gender,
    email: email,
    password: password,
    password_confirmation: confirmPassword,      
  },
  {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  }).then(function (response) {
    statusCode = response.status;
    return response.data.data;      
  })
  .catch(function (error) {      
    statusCode = error.response.status;
    return error.response.data;      
  });      

  return [statusCode, res];
}

export async function login(email, password) {
    
  var statusCode = 0;
  const res = await axios.post('http://127.0.0.1:8000/api/login', 
  {
    email: email,
    password: password
  },
  {
    headers: {
      'Accept': 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json'
    }
  }).then(function (response) {
    statusCode = response.status;    
    return response.data.data;      
  })
  .catch(function (error) {      
    statusCode = error.response.status;
    return error.response.data;      
  });      

  return [statusCode, res];
}
  
export async function logout(token) {
  
  var statusCode = 0;
  const res = await axios.post('http://127.0.0.1:8000/api/logout',  
    {
      // BODY
    }, 
    {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    }).then(function (response) {
      statusCode = response.status;
      return response.data;        
    })
    .catch(function (error) {    
      statusCode = error.response.status;  
      return error.response.data;        
    });   

    return [statusCode, res];
}