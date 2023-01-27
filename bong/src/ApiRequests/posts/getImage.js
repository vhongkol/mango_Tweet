import axios from 'axios';

export const getImage = async ({image_url=null, token=null} = {}) => {
  
    try {
        // TEMP TOKEN
        token = '1|pIzxgW8CWvyGM8vxHK9UXU4NeUmnEFz75SHD0rEL';

        const res = await axios.get(`http://127.0.0.1:8000/api/posts-image/${image_url}`,         
        {
            responseType: 'blob',

            headers: {
                Authorization: `Bearer ${token}`,                
            },
        });        
        
        return res.data;
        
    } catch (error) {
        
        return null;
    }
};
