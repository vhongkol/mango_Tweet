import axios from 'axios';

export const addComment = async ({
    
    user_id=0,
    posts_id=null,
    comment=null,   
    token=null  

} = {}) => {      
    
    const formData = new FormData();    

    formData.append("user_id", user_id);           
    formData.append("posts_id", posts_id);    
    formData.append("comment", comment);    

    console.log(formData);

    try {
        // TEMP TOKEN
        token = '1|pIzxgW8CWvyGM8vxHK9UXU4NeUmnEFz75SHD0rEL';

        const res = await axios.post('http://127.0.0.1:8000/api/comments', formData,
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
