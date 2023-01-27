import axios from 'axios';

export const addPost = async ({
    
    user_id=0,
    description=null,
    imageFile=null, 
    original_post_id=0,
    token=null

} = {}) => {      

    const formData = new FormData();    

    formData.append("user_id", user_id);    
    
    description.length == 0 ? 
        console.log("NO DESCRIPTION ADDED") : 
        formData.append("description", description);

    imageFile.length == 0 ? 
        console.log("NO IMAGE ADDED") : 
        formData.append("image", imageFile);    

    original_post_id == 0 ? 
        console.log("POST IS ORIGINAL") : 
        formData.append("original_post_id", original_post_id);

    console.log(formData);

    try {
        // TEMP TOKEN
        token = '1|pIzxgW8CWvyGM8vxHK9UXU4NeUmnEFz75SHD0rEL';

        const res = await axios.post('http://127.0.0.1:8000/api/posts', formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,  
                'Accept': 'application/vnd.api+json',                 
                'Content-Type': 'multipart/form-data',
            },
        })                
        return [res.status, res.data.data];

    } catch (error) {

        return [error.response.status, error.response];
    }
};
