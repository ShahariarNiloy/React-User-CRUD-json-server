import axios from "axios"
import { useMutation, useQueryClient, useQuery} from "react-query"
import { useNavigate } from "react-router-dom"

const url = 'http://localhost:4001/users';

const addUser =(hero:any)=>{
    return axios.post(`${url}`,hero)
}

export const useCreateUser =()=>{

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation(addUser, {
        onSuccess: ()=>{
            queryClient.invalidateQueries('users')
            navigate('/')
        }
    })
}


const edit = (value:any)=>{
    return axios.put(`${url}/${value.id}`,value)
    
}


export const useEditUserInfo = (id:any)=>{
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation(edit,{
        onSuccess: ()=>{
            queryClient.invalidateQueries(['user',id])
            navigate('/')
        }
    })
}


export const useFetchUsersInfo = (onSuccess:any,onError:any) =>{
    
    return (
        useQuery<any>('users',()=>{
            return axios.get(url)
        },
        {
            enabled: true,
            onSuccess,
            onError,
            
        }
        )
    );
}




const fetchSuperHero = (id:any)=>{
    return axios.get(`${url}/${id}`)
}

export const useSingleUserInfo = (id:any)=>{
    return useQuery(['user', id], ()=>fetchSuperHero(id))
}

const deleteUserInfo = (id:any)=>{
    return axios.delete(`${url}/${id}`)
}

export const useDeleteUser = ()=>{
        const queryClient = useQueryClient()
        return useMutation(deleteUserInfo,{
        onSuccess: ()=>{
            queryClient.invalidateQueries('users')
        }
    }
)}
