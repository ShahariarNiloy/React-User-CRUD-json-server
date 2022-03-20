import { Field, Form, Formik, useFormik, ErrorMessage, useField, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import * as api from './Api/usersApi'



const regMatch = /^((http|https):\/\/)?(www.)?(?!.*(http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+(\/)?.([\w\?[a-zA-Z-_%\/@?]+)*([^\/\w\?[a-zA-Z0-9_-]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/;
const validationSchema = Yup.object({
    name: Yup.string()
        .max(25, 'Must be 15 characters or less')
        .required('Name is Required'),
    username: Yup.string()
            .min(8, 'Must be at least 8 characters')
            .max(20, 'Must be less  than 20 characters')
            .required('Username is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    address: Yup.object().shape({
        city : Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Address is Required') 
    }),   
    phone: Yup.string()
        .max(35, 'Must be 15 characters or less')
        .required('Website is Required'),
    website: Yup.string()
        .matches(regMatch, "Website should be a valid URL")
        .required('Wesite is Required'),

    company : Yup.object().shape({
        name:  Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Company Name is Required')
    })
  })

function CreateUser() {


    const initialValues = {
        
        name: '',
        username: '',
        email: '',
        address : {
            city:''
        },
        phone: '',
        website: '',
        company:{
            name: ''
        }
    }
    
    const {mutate} = api.useCreateUser();
    const onSubmit = (values:any) => {
        mutate(values)
    }
    const formik = useFormik({
        initialValues,

        onSubmit : onSubmit,
        validationSchema
    });
    
    return (
        <div>
            <div className='container mx-5'>
                
                <div className="row my-5">
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
                    

                        <button className="btn btn-success my-3 text-center" type="submit">Register</button> 
                        <button className="btn btn-danger my-3 mx-2 text-center" type="reset">Reset</button>
                        </Form>
                </FormikProvider>
                <Link to="/">
                    <button  type="button" className="btn btn-primary text-center">Home Page</button>
                </Link>
                </div>
                </div>
                </div>
        </div>
    );
}



export default CreateUser;