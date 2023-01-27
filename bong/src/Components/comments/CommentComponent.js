import { getImage } from "../../ApiRequests/posts/getImage";
import { useEffect, useState } from "react";
import YesNoModal from "../posts/YesNoModal";
import { addOrUpdateReaction } from "../../ApiRequests/reactions/addOrUpdateReaction";
import { deleteReaction } from "../../ApiRequests/reactions/deleteReaction";

function Comments({
    
    item,
    onDeleteComment,
    
    } = {}) {                                       

    const [message, setMessage] = useState('...');        
    const [image, setImage] = useState(null);  
    const [isUserReacted, setIsUserReacted] = useState(item.isUserReacted);
    const [isLikedMessage, setIsLikedMessage] = useState(isUserReacted ? "Liked": "Like");

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);  

    useEffect(() => {
        
        getImage({image_url : item.user_image_url}).then(function(res) { setImage(res); });                        

    },[]);     

    const handleYes = () => {

        onDeleteComment(item.id);
        handleClose();
    }

    const onLikeClick = () => {
              
        if (isUserReacted) { // DELETE REACTION

            deleteReaction({

                // TODO GET USER ID FROM LOCAL STORAGE
                user_id: 1,
                comments_id: item.id,                
                
            }).then((res) => {

                console.log(res);
                setIsLikedMessage("Like");
                // setTotalReactions(totalReactions - 1);                        

                setIsUserReacted(false);        
            });  
                
        }
        else { // ADD REACTION
                                
            addOrUpdateReaction({

                // TODO GET USER ID FROM LOCAL STORAGE
                user_id: 1,
                comments_id: item.id,
                type_id: 1,
                
            }).then((res) => {

                console.log(res);
                // setTotalReactions(totalReactions + 1);
                setIsLikedMessage("Liked");

                setIsUserReacted(true);
            });            
        }   
    }

    return (                    
        <div style={{width: "30%", height: "30%", display: "flex", flexDirection: "column", margin: 0}}>
            <div style={{display: "flex", margin: 0}}>
                {!image ? <p style={{margin: 0}}>{message}</p> : <img 
                        src={URL.createObjectURL(image)}
                        alt="SHETTY"
                        style={{
                        width: "1em",
                        height: "1em",
                        lineHeight: "1em",
                        margin: 0
                        }}
                    ></img>}
                <div style={{alignSelf: "center", margin: 0}}>
                    <p style={{margin: 0}}>{item.name}</p>                    
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
            <div style={{margin: 0}}>
                <p style={{margin: 0}}>{item.comment}</p>
            </div>
            <div style={{margin: 0}}>
                <button style={{alignSelf: "flex-end", margin: 0}}onClick={onLikeClick}>{isLikedMessage}</button>   
            </div>
      </div>
            
    );    
}

export default Comments;

