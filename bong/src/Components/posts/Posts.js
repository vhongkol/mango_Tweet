import { getImage } from "../../ApiRequests/posts/getImage";
import { addComment } from "../../ApiRequests/comments/AddComment";
import { deleteComment } from "../../ApiRequests/comments/deleteComment";
import { useEffect, useState, useRef } from "react";
import Comments from "../comments/CommentComponent";
import YesNoModal from "../posts/YesNoModal";
import { addOrUpdateReaction } from "../../ApiRequests/reactions/addOrUpdateReaction";
import { deleteReaction } from "../../ApiRequests/reactions/deleteReaction";

function Posts({
    
    item,
    onDeletePost

} = {}) {             

    const [CommentArray, setCommentArray] = useState([]);
    const [message, setMessage] = useState('loading image...');    
    const [showComment, setShowComment] = useState(false);
    const commentInput = useRef(null);    

    const [isUserReacted, setIsUserReacted] = useState(item.isUserReacted);
    const [isLikedMessage, setIsLikedMessage] = useState(isUserReacted ? "Liked": "Like");
    const [totalReactions, setTotalReactions] = useState(item.post_reactions.overall_total);    
    const [totalComments, setTotalComments] = useState(item.comments_with_reactions.overall_total);
    const [user_image, setUserImage] = useState(null);                
    const [image, setImage] = useState(null);                
    
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);  

    useEffect(() => {
        
        getImage({image_url : item.user_image_url}).then(function(res) { setUserImage(res); });        

        if (item.image_url != null) {

            getImage({image_url : item.image_url}).then(function(res) { setImage(res); });
        }
        else { setMessage(""); }                  
                
        let temp = [];
        item.comments_with_reactions.group.forEach(function(item) {                

            if (!CommentArray.find(comment => comment.id === item.id)) {                
                temp.push(item);
            }                    
        });           
        setCommentArray(CommentArray.concat(temp));         

    },[]);     

    const handleKeyDown = (event) => {

        if (event.key === 'Enter' && commentInput.current.value.length != 0) {
            onAddComment(commentInput.current.value);
        }
      };

    const onAddComment = (value) => {                

        addComment({
            // TODO user_id MUST BE FROM THE USER THAT IS LOGGED IN
            user_id: item.user_id,
            posts_id: item.id,
            comment: commentInput.current.value 
        }).then(function(res) {

            console.log(" --- POST COMMENT DATA ---");
            console.log(res);  
                        
            setCommentArray(CommentArray.concat({
                id: res[1].id,
                user_image_url: res[1].user_image_url,                
                user_id: res[1].user_id,
                name: res[1].name,
                comment: res[1].comment,
                onDeleteComment: {onDeleteComment},

            }));
            setTotalComments(totalComments + 1);
            commentInput.current.value = "";
        });    
    };

    const onDeleteComment = (id) => {

        // DELETE FROM DATABASE

        deleteComment({comment_id: id}).then((res) => {

            console.log(res);

             // UPDATE COUNT
            setTotalComments(totalComments - 1);

            // UPDATE COMMENTS
            CommentArray.forEach(function(item, index, object) {
                if (item.id === id) {                
                    object.splice(index, 1);
                    return;
                }
            });              
            setCommentArray([...CommentArray]);         
        });        
    }    

    const onLikeClick = () => {
              

        if (isUserReacted) { // DELETE REACTION

            deleteReaction({

                // TODO GET USER ID FROM LOCAL STORAGE
                user_id: 1,
                posts_id: item.id,                
                
            }).then((res) => {

                console.log(res);
                setIsLikedMessage("Like");
                setTotalReactions(totalReactions - 1);                        
            });              
        }
        else { // ADD REACTION
                                
            addOrUpdateReaction({

                // TODO GET USER ID FROM LOCAL STORAGE
                user_id: 1,
                posts_id: item.id,
                type_id: 1,
                
            }).then((res) => {

                console.log(res);
                setTotalReactions(totalReactions + 1);
                setIsLikedMessage("Liked");
            });            
        }                                

        setIsUserReacted(!isUserReacted); 
    }

    const onCommentClick = () => {
        
        showComment ? commentInput.current.focus() : setShowComment(true);    
    }    

    const handleYes = () => {

        onDeletePost(item.id);
        handleClose();
    }

    return (                    
        <div  
            style={{
                width: "max_content",
                height: "max_content",                     
            }} >            
            <div style={{display: "flex", margin: 0}}>
                {!user_image ? <p style={{margin: 0}}>{"..."}</p> : <img 
                        src={URL.createObjectURL(user_image)}
                        alt="SHETTY"
                        style={{
                        width: "1em",
                        height: "1em",
                        lineHeight: "1em",
                        margin: 0
                        }}
                    ></img>}
                <div style={{alignSelf: "center", margin: 0}}>
                    <h3 style={{margin: 0, lineHeight: "1em"}}>{item.name}</h3>
                </div>
                <div style={{display: "flex", alignItems: "center", margin: 0}}>
                <YesNoModal   
                    title={"Delete"} 
                    message={"delete?"}      
                    buttonName={"delete"}           
                    showModal={showModal} 
                    handleClose={handleClose} 
                    handleShow={handleShow} 
                    handleYes={handleYes} />
                </div>               
            </div>
            <div>
                <p>{item.description}</p>
            </div>
            <div
                style={{
                    width: "30%",
                    height: "30%",                    
                }} >
                {!image ? <p>{message}</p>: <img
                    style={{
                        width: "100%",
                        height: "100%",                        
                    }} 
                    src={URL.createObjectURL(image)}
                    alt="SHETTY"                    
                    ></img>}
            </div>  

            <div style={{display: "flex", justifyContent:"space-between", width: "30%"}}>
                <button style={{flex: 1}} onClick={onLikeClick}>{isLikedMessage}</button>                                
                <button style={{flex: 1}} onClick={onCommentClick}>Comment</button>                                 
                <button style={{flex: 1}}>Share</button>                                 
            </div>               
            <div style={{display: "flex", width: "30%", justifyContent: "space-between"}}>
                <button style={{
                        flex: 1, 
                        opacity: 0.5, 
                        textAlign: "left", 
                        margin: ".1vw", 
                        background: "transparent", 
                        border: "none", 
                        cursor: "pointer"
                        }} 
                        onClick={() => {}}>
                        {totalReactions} reactions
                </button>                
                <button style={{
                        flex: 1, 
                        opacity: 0.5, 
                        textAlign: "right", 
                        margin: ".1vw", 
                        background: "transparent", 
                        border: "none", 
                        cursor: "pointer"
                    }} onClick={() => setShowComment(!showComment)}>
                        {totalComments} comments
                </button>
            </div>  
            { showComment && 
                <>
                <div style={{display: "flex", width: "30%"}}>
                    <input                     
                        style={{flex: 1}}
                        type="text"
                        placeholder="Write a comment"
                        ref={commentInput}
                        onKeyDown={handleKeyDown}
                        ></input>
                </div>   
                <div>    
                    { CommentArray.map((comment) => (
                        <Comments 
                            key={comment.id} 
                            item={comment}                                          
                            onDeleteComment={onDeleteComment}></Comments>
                    ))}                
                </div>     
                </>
            }       
        </div>
            
    );    
}

export default Posts;