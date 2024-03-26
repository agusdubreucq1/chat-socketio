import React from 'react';
import { MessageTypeResponse } from '../../vite-env';
import dayjs from 'dayjs';

interface MessageProps {
    message: MessageTypeResponse
}

export const MyMessage: React.FC<MessageProps> = ({ message }) => {

    return (
        <div key={message.id} className={`relative justify-end flex gap-3`}>
            <div
                className={`relative flex min-w-10 text-white gap-1 p-1 pb-4 pr-2 rounded-md w-fit bg-green-700`}>
                <p className='text-lg'>{message.message}</p>
                <p className='absolute bottom-0 right-1 text-xs text-gray-300'>{dayjs(message.createdAt).format('HH:mm')}</p>
            </div>
        </div>
    );
};

export const TheirMessage: React.FC<MessageProps> = ({message}) => {
    return (
        <div key={message.id} className={`relative 'justify-start' flex gap-3`}>
            <div
                className={`relative flex min-w-10 text-white gap-1 p-1 pb-4 pr-2 rounded-md w-fit bg-slate-800`}>
                <p className='text-lg'>{message.message}</p>
                <p className='absolute bottom-0 right-1 text-xs text-gray-300'>{dayjs(message.createdAt).format('HH:mm')}</p>
            </div>
        </div>
    );
}
