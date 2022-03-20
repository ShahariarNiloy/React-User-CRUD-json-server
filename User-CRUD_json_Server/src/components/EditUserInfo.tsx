import { Field, Form, Formik, useFormik, ErrorMessage, useField, FormikProvider } from 'formik';

import * as Yup from 'yup';
import { Link ,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as api from './Api/usersApi'
import { useEffect, useState } from 'react';


const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const validate = Yup.object({
    name: Yup.string()
        .max(25, 'Must be 15 characters or less')
        .required('Required'),
    username: Yup.string()
            .min(2, 'Must be at least 8 characters')
            .max(20, 'Must be less  than 20 characters')
            .required('Email is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    address: Yup.object().shape({
        city : Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required') 
    }),   
    phone: Yup.string()
        .max(35, 'Must be 15 characters or less')
        .required('Required'),
    website: Yup.string()
        .matches(regMatch, "Website should be a valid URL")
        .required('Required'),

    company : Yup.object().shape({
        name:  Yup.string()
        .max(35, 'Must be 15 characters or less')
        .required('Required')
    })
  })


function EditUserInfo() {
    
    const { id } = useParams();
    
    const singleUser= api.useSingleUserInfo(Number(id))
    const {mutate:editUser} = api.useEditUserInfo(Number(id))

    const user = singleUser?.data?.data
    
    const [flag, setFlag] = useState(false)
    
    const initialValues = {
        
        id : 1,
        name: '' ,
        username:'',
        email: '',
        address:{
            city: '' 
        },
        phone: '',
        website: '',
        company:{
            name: ''
        }
        
    }
    
    const onSubmit = (values:any) => {
        // editUser(values)   
        console.log(values);
    } 
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues : user,
        onSubmit,
        validationSchema : validate
    })
  
    if(singleUser.isLoading){
        return <h2>Loading...</h2>
    }

    if(singleUser.isError){
        if(singleUser?.error instanceof Error){
            return <h2>{singleUser?.error.message}</h2>
        }
    }
   
    

    return (
        <div>
            <div className='container'>
                
                        
            <h2 className='text-center text-muted mt-5'>Edit User Info</h2>
                        <div className="row my-1">
                <div className="col-3"></div>
                <div className="col-6 my-5">
                <FormikProvider value={formik}>
                
                <Form>
<label className='form-text mt-1' htmlFor="name">Full Name</label>  
                    <Field type="text" className={`form-control shadow ${formik.errors.name && formik.touched.name && 'is-invalid'}`}  name="name" placeholder="Full Name" /> 
                    <ErrorMessage component="div" name='name' className="error" />

                    <label className='form-text mt-1' htmlFor="username">LastName</label>  
                    <Field type="text" className={`form-control shadow ${formik.errors.username && formik.touched.username && 'is-invalid'}`} name="username" placeholder="Username" /> 
                    <ErrorMessage component="div" name='username' className="error" />

                    <label className='form-text mt-1' htmlFor="email">Email</label>  
                    <Field type="email" className={`form-control shadow ${formik.errors.email && formik.touched.email && 'is-invalid'}`} name="email" placeholder="Email@example.com" /> 
                    <ErrorMessage component="div" name='email' className="error" />

                    <label className='form-text mt-1' htmlFor="address">Address</label>
                    <Field className={`form-control shadow ${formik.errors.address && formik.touched.address && 'is-invalid'}`} id="address" name="address.city" placeholder="Address" />
                    <ErrorMessage component="div" name={'address.city'} className="error" />

                    <label className='form-text mt-1' htmlFor="phone">Phone NO</label>
                    <Field className={`form-control shadow ${formik.errors.phone && formik.touched.phone && 'is-invalid'}`} id="phone" name="phone" placeholder="Phone NO" />
                    <ErrorMessage component="div" name={'phone'} className="error" />

                    <label className='form-text mt-1' htmlFor="website">Website name</label>
                    <Field className={`form-control shadow ${formik.errors.website && formik.touched.website && 'is-invalid'}`} id="website" name="website" placeholder="website.com" />
                    <ErrorMessage component="div" name={'website'} className="error" />

                    <label className='form-text mt-1' htmlFor="company">Company Name</label>
                    <Field className={`form-control shadow ${formik.errors.company && formik.touched.company && 'is-invalid'}`} id="company" name="company.name" placeholder="Company Name" />
                    <ErrorMessage component="div" name={'company.name'} className="error" />
                        
                        <button  type="submit" className="btn btn-success d-flex justify-content-center my-3">Submit</button>
                        
                    </Form>
                
                <Link to="/">
                    <button  type="button" className="btn btn-primary d-flex justify-content-center my-3">Home Page</button>
                </Link>
                </FormikProvider>
                </div>
                        </div>
                </div>
        </div>
    );
}



export default EditUserInfo;