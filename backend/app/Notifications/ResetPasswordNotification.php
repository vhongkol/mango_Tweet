<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Otp;

class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    private $expiresInMin = 15;
    public $message;
    public $subject;        
    private $otp;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->message = 'Use the code below for verification. This will expire in '.$this->expiresInMin.' minutes';
        $this->subject = 'Password Reset Verification';                
        $this->otp = new Otp;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $token = $this->otp->generate($notifiable->email, 5, $this->expiresInMin);
        return (new MailMessage)                    
                    ->subject($this->subject)
                    ->greeting('Hello '.$notifiable->first_name)                    
                    ->line($this->message)                    
                    ->line('code: '. $token->token);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
