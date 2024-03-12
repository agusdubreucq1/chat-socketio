import React from 'react';

interface ModalProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode
}

interface ModalType{
  (props: ModalProps): JSX.Element
  Button: React.FC<ButtonProps>
}


const Modal: ModalType = ({ children, ...props }) => {

  return (
    <div {...props} className='fixed flex items-center justify-center w-screen h-screen top-1/2 left-1/2  backdrop-brightness-50 translate-x-[-50%] translate-y-[-50%]  p-5 z-50'>
      {children}
    </div>
  );
};

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string,
  typeOfButton: 'cancel' | 'confirm'
}

const Button: React.FC<ButtonProps> = ({ text, ...props }) => {
  if(props.typeOfButton === 'cancel')
  return (
    <button {...props} className=' bg-red-500 w-full text-white p-2 rounded-md hover:opacity-90 transition-opacity'>{text}</button>
  )

  if(props.typeOfButton === 'confirm')
  return <button {...props} className={`bg-green-500 w-full text-white p-2 rounded-md hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity`}>{text}</button>
}

Modal.Button = Button

export default Modal