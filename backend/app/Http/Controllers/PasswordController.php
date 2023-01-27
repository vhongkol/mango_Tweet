<?php

namespace App\Http\Controllers;

use App\Notifications\ResetPasswordNotification;
use App\Http\Requests\OtpResetPasswordRequest;
use App\Http\Requests\SendEmailRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use App\Mail\MailNotify;
use App\Models\User;

use Ichtrojan\Otp\Models\Otp as OtpModel;
use Mail;
use Otp;

class PasswordController extends Controller
{
    use HttpResponses;
    private $otp;

    public function __construct() {

        $this->otp = new Otp;
    }


    public function sendEmailRequest(SendEmailRequest $request) {

        $email = $request->email;

        // clear existing token
        $res = OtpModel::where('identifier', $email)->get(['created_at']);
        
        $date = now()->subMinutes(5);        
        $time;

        if ($res->isEmpty()) {

            // send new token to email        
            $user = User::where('email', $email)->first();
            $user->notify(new ResetPasswordNotification());       

            return $this->success('','token sent successfully');
        }
        else {

            $time = $res[0]->created_at;
        }
        if ($time < $date) {
                       
            OtpModel::where('identifier', $email)->delete();
            $user = User::where('email', $email)->first();
            $user->notify(new ResetPasswordNotification());  
            return $this->success('','sending new token to '.$email);
        }
        else {

            return $this->error('','token has already been sent to '.$email, 201);
        }                   
    }

    public function updatePasswordWithOTP(OtpResetPasswordRequest $request) {
        
        $token = $this->otp->validate($request->email, $request->otp);

        if (!$token->status) {
            return $this->error('', 'Credentials do not match', 401);
        }
        OtpModel::where('identifier', $request->email)->delete();
        $user = User::where('email', $request->email)->first();
        $user->update(['password' => Hash::make($request->password)]);

        return $this->success('','reset successfully');
    }
}
