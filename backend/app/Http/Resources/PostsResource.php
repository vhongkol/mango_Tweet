<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ReactionsResource;
use App\Http\Resources\CommentsResource;
use Illuminate\Support\Facades\Storage;
use App\Models\Reactions;
use App\Models\Comments;
use App\Models\Posts;
use App\Models\User;
use DB;

class PostsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {                        
        return [

            'id' => $this->id,
            'user_id' => $this->user_id,
            'name' => User::select(DB::raw('CONCAT(first_name , " " , last_name) as name'))->where('id', $this->user_id)->get()[0]->name,
            'description' => $this->description,            
            'user_image_url' => User::select('image_url')->where('id', $this->user_id)->first()->image_url,
            'image_url' => $this->image_url,            
            'original_post_id' => $this->original_post_id,  

            'comments' => $this->whenLoaded('comments', function() {

                return [

                    'overall_total' => Comments::where('posts_id', $this->id)->count(),
                    'group' => CommentsResource::collection($this->whenLoaded('comments'))
                ];
            }),                            

            'comments_with_reactions' => 
                $this->whenLoaded('commentsWithReact', function() {
                return [
                    'overall_total' => Comments::where('posts_id', $this->id)->count(),
                    'group' => CommentsResource::collection(
                    Comments::with('reactions')
                    ->where('posts_id', $this->id)
                    ->get())
                ];
            }),
            'isUserReacted' => Reactions::where('user_id', $request->logged_in_user_id)->where('posts_id', $this->id)->exists(),                        

            'post_reactions' => 
                $this->whenLoaded('reactions', function() {
                return [
                        'overall_total' => Reactions::where('posts_id', $this->id)->count(),

                        'group' =>
                        Reactions::select(DB::raw('count(*) as total'), 'type')
                        ->join('reaction_type', 'reactions.type_id', '=', 'reaction_type.id')
                        ->join('posts', 'posts.id', '=', 'reactions.posts_id')
                        ->where('posts.id', $this->id)
                        ->groupBy('type')->get()
                    ];
            }),                                 
        ];
    }
}
