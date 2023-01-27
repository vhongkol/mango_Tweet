<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\LoginUserRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use App\Models\User;
use DB;

class AuthController extends Controller
{        
    use HttpResponses;
    public function login(LoginUserRequest $request) {
               
        $user = User::where('email', $request->email)->get(['remember_token']);
        $loginSuccess = Auth::attempt($request->only('email', 'password'));
         
        if (strcmp($user[0]->remember_token, '') != 0) {

            return $this->error('', 'Already Login', 401);
        }

        if (!$loginSuccess) {
            return $this->error('', 'Credentials do not Match', 401);
        }        
        $user = Auth::user();
        $token = $user->createToken('API Token of ' . $user->name)->plainTextToken;
            
        $user->remember_token = $token;
        $user->save();

        return $this->success([            
            'user' => $user,
            'token' => $token
        ],);
    }

    public function register(StoreUserRequest $request) {

        $request->validated($request->all());
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'gender' => $request->gender,
            'email' => $request->email,
            'password' => Hash::make($request->password),    
        ]);                
        $token = $user->createToken('API Token of ' . $user->name)->plainTextToken;
            
        $user->remember_token = $token;
        $user->save();

        return $this->success([            
            'user' => $user,
            'token' => $token
        ],);        
    }

    public function logout() {

        $user = Auth::user();        
        $user->currentAccessToken()->delete();        
        $user->remember_token = '';
        $user->save();

        DB::table('personal_access_tokens')->where('tokenable_id', $user->id)->delete();

        return $this->success('','Logout Successful, Token Deleted');
    }
}
