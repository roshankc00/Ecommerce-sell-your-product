import cloudinary from 'cloudinary';
import env from '../utils/env.validator'

cloudinary.v2.config({
    cloud_name:env.CLOUDINARY_CLIENT_NAME,
    api_key:env.CLOUDINARY_CLIENT_API,
    api_secret:env.CLOUDINARY_CLIENT_SECRET
})

export default cloudinary 