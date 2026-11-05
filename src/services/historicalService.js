import api from "./api"

export const getHistorical = async({latitude,longitude,start_date,end_date})=>{
    const response = await api.get('/historical',{
        params:{
            latitude,
            longitude,
            start_date,
            end_date
        }
    });
     
    return  response.data;
}

