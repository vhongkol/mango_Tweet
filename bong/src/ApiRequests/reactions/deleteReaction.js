import axios from 'axios';

export const deleteReaction = async ({
    
    user_id=0,
    posts_id=null,
    comments_id=null,    
    token=null

} = {}) => {      
    
    let key = "";
    let value = "";             

    if (posts_id == null) { // IF POST ID IS NULL COMMENT WILL BE SELECTED
        
        key = "comments_id";
        value = comments_id;
    }
    else { // IF COMMENT ID IS NULL POST WILL BE SELECTED
        
        key = "posts_id";
        value = posts_id;
    }

    try {

        // TEMP TOKEN
        token = '1|pIzxgW8CWvyGM8vxHK9UXU4NeUmnEFz75SHD0rEL';

        const res = await axios.delete('http://127.0.0.1:8000/api/reactions',
        {                   
            headers: {
                Authorization: `Bearer ${token}`,  
                'Accept': 'application/vnd.api+json',                 
                'Content-Type': 'application/vnd.api+json',
            },
            data: {
                [key] : value,
                user_id: user_id
            }            
        })                
        
        return [res.status, res.data];

    } catch (error) {

        return [error.response.status, error];
    }
};
