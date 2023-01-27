<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class PostsRequest extends FormRequest
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
            'user_id' => ['required', Rule::exists('users', 'id')->where('id', $this->user_id) ],
            'description' => ['sometimes'],            
            'image' => ['sometimes','image', 'mimes:jpeg,png,jpg,gif,svg'],
            'original_post_id' => ['sometimes', 'required'],
            ];
    }
}
