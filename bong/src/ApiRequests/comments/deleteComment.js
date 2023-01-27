import axios from 'axios';

export const deleteComment = async ({
    
    comment_id=0,      
    token=null  

} = {}) => {               

    try {
        // TEMP TOKEN
        token = '1|pIzxgW8CWvyGM8vxHK9UXU4NeUmnEFz75SHD0rEL';

        const res = await axios.delete(`http://127.0.0.1:8000/api/comments/${comment_id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,  
                'Accept': 'application/vnd.api+json',                 
                'Content-Type': 'application/vnd.api+json',
            },
        })                
        return [res.status, res.data.data];

    } catch (error) {

        return [error.response.status, error.response];
    }
};
