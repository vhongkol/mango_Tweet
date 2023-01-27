<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CommentsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'posts_id' => ['required', Rule::exists('posts', 'id')->where('id', $this->posts_id)],
            'user_id' => ['required', Rule::exists('users', 'id')->where('id', $this->user_id) ], 
            'comment' => ['required'],     
        ];
    }
}
