import { getPosts } from "../ApiRequests/posts/getPosts";
import { addPost } from "../ApiRequests/posts/addPost";
import YesNoModal from '../Components/posts/YesNoModal';
import { useEffect, useState } from "react";
import Posts from "../Components/posts/Posts";
import { deletePost } from "../ApiRequests/posts/deletePost";

function Profile() {                 

    const [postsArray, setPostsArray] = useState([]);
    const [isDataEmpty, setIsDataEmpty] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [user_id, set_user_id] = useState(0);
    const [image, setImage] = useState("");    
    const [description, setDescription] = useState("");
    
    const idTemp = 1;              

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);    

    useEffect(() => {

        // TODO 
        // GET USER ID FROM LOCAL STORAGE
              
        getData({user: idTemp, simplify: true, logged_in_user_id: idTemp});    
        set_user_id(idTemp);                

    },[]);   
    
    useEffect(() => {
        if (isDataEmpty) {
          setTimeout(() => {
            setIsDataEmpty(false);
          }, 2000);
        }
      }, [isDataEmpty]);

    function getData(params) {
        getPosts(params).then((result) => {            

            console.log(" --- GETTING USERS POSTS ---");
            console.log(result);
            let temp = [];
            result[1].forEach(function(item) {                

                if (!postsArray.find(post => post.id === item.id)) {
                    temp.push(item);
                }                    
            });           
            setPostsArray(postsArray.concat(temp));
            setLoading(false);            
        });  
    }

    function onAddPost() {        

        if (description.length == 0 && image.length == 0) {
                        
            console.log("CANNOT POST EMPTY DATA");
            setIsDataEmpty(true);
            setShowModal(false);   
            return;
        }

        addPost({
            user_id: idTemp,
            description: description,
            imageFile: image,
            logged_in_user_id: idTemp

        }).
        then(function(res) {

            console.log(" --- POST ADDED DATA ---");
            console.log(res);

            setShowModal(false);        
            getData({user: idTemp, simplify: true});   

            // clear
            setDescription("");
            setImage("");                     
        });                    
    }    

    const onDeletePost = (id) => {

        // DELETE FROM DATABASE

        deletePost({post_id: id}).then((res) => {

            console.log(res);             

            // UPDATE POSTS
            postsArray.forEach(function(item, index, object) {
                if (item.id === id) {                
                    object.splice(index, 1);
                    return;
                }
            });              
            setPostsArray([...postsArray]);         
        });             
    }  

    return (        
        <div>                           
            <div>                
                <input 
                    type="text"
                    placeholder="Write a Mango Tweet"
                    onChange={(e)=> {setDescription(e.target.value)}}  
                    value={description}
                    style={{width: "30%"}}
                    >                
                </input>
                <br/>
                    <div 
                        style={{
                            width: "30%",
                            height: "30%",                    
                        }}>
                        <input 
                            type="file" id="file" 
                            onChange={(e) => {setImage(e.target.files[0]);}}     
                            value={""}                        
                            accept="image/*"                            
                            >
                        </input>
                        {image && 
                            <img 
                                style={{
                                    width: "100%",
                                    height: "100%",                        
                                    }} 
                                src={URL.createObjectURL(image)} 
                                alt="Selected Image" />}
                    </div>
                <br/>            
                <div style={{
                    width: "30%",                    
                    }}>
                    <YesNoModal    
                        title={"Add Post"}
                        message={"Are you sure you want to add a new post?"}      
                        buttonName={"Post"}           
                        showModal={showModal} 
                        handleClose={handleClose} 
                        handleShow={handleShow} 
                        handleYes={onAddPost} /> 
                    {isDataEmpty && <p style={{margin: 0, color: "red"}}>cannot post an empty data</p>}
                </div>                                                        
            </div>
            <h3>Recent Posts</h3>  
            {loading ? <p>Loading...</p> : (
                postsArray.map((post) => (
                    <Posts key={post.id} item={post} onDeletePost={onDeletePost}/>
                ))
            )}                       
        </div>
    );
}

export default Profile;  
