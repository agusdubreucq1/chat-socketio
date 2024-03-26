import React from 'react';
import Modal from './Modal';
import { useAuth0 } from '@auth0/auth0-react';

interface ModalLogoutProps {
    closeModal: () => void
}

const ModalLogout: React.FC<ModalLogoutProps> = ({ closeModal }) => {

    const { logout } = useAuth0()

    return (
        <Modal onClick={closeModal}>
            <div className='flex flex-col gap-6 bg-slate-300 p-4 rounded-md min-w-[400px]'>
                <div className='flex flex-col gap-1'>
                    <p className='text-xl'>¿Estas seguro de cerrar sesion?</p>
                    <p className='text-sm text-gray-700'>Se cerrara la sesion actual</p>
                </div>
                <div className='flex gap-4'>
                    <Modal.Button typeOfButton='cancel' text='Cancelar' className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'></Modal.Button>
                    <Modal.Button typeOfButton='confirm' text='Cerrar sesion' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded'></Modal.Button>
                </div>
            </div>

        </Modal>
    );
};

export default ModalLogout