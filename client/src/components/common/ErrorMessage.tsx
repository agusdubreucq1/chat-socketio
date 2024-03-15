import { AlertCircle } from './icons/AlertCircle';

const ErrorMessage = ({ msg }) => {
    return (
        <div className='flex bg-red-500 w-full gap-2 p-2 rounded-md justify-center items-center'>
            <AlertCircle color='white' className='w-6 h-6'></AlertCircle>
            <h1 className='text-white text-md'>{msg}</h1>
        </div>
    )
}

export default ErrorMessage