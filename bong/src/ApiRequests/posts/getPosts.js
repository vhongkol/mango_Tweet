import axios from 'axios';

export const getPosts = async ({
    
    includeReactions = null,
    includeCommentsWithReact = null,
    includeComments = null,
    simplify = null,
    user = null,
    logged_in_user_id=null,
    token = null

} = {}) => {
  
    try {
        // TEMP TOKEN
        token = '1|pIzxgW8CWvyGM8vxHK9UXU4NeUmnEFz75SHD0rEL';

        const res = await axios.get(`http://127.0.0.1:8000/api/posts`, {
            params: {
                includeReactions,
                includeCommentsWithReact,
                includeComments,
                simplify,
                logged_in_user_id,
                user,
            },
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
            },
        });        
        return [res.status, res.data.data];
        
    } catch (error) {
        
        return [error.response.status, error.response];
    }
};
