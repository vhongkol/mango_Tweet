import axios from 'axios';

export const addOrUpdateReaction = async ({
    
    user_id=0,
    posts_id=null,
    comments_id=null,
    type_id=null,     
    token=null

} = {}) => {      

    const formData = new FormData();    

    formData.append("user_id", user_id);    
    formData.append("type_id", type_id);    

    // IF POST ID IS NULL COMMENT WILL BE SELECTED
    posts_id == null ? 
        console.log("COMMENTS REACTION") : 
        formData.append("posts_id", posts_id);

    // IF COMMENT ID IS NULL POST WILL BE SELECTED
    comments_id == null ? 
        console.log("POSTS REACTION") : 
        formData.append("comments_id", comments_id);            

    try {
        // TEMP TOKEN
        token = '1|pIzxgW8CWvyGM8vxHK9UXU4NeUmnEFz75SHD0rEL';

        const res = await axios.post('http://127.0.0.1:8000/api/reactions', formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,  
                'Accept': 'application/vnd.api+json',                 
                'Content-Type': 'application/vnd.api+json',
            },
        })                
        return [res.status, res.data];

    } catch (error) {

        return [error.response.status, error.response];
    }
};
