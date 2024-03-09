import React from 'react';

const Chats: React.FC = () => {
    const [chats, ] = React.useState([
        { id: 1, name: 'Chat 1' },
        { id: 2, name: 'Chat 2' },
    ]);


    return (
        <section className='flex flex-col w-full min-h-full'>
            <h1>Chats</h1>
            <div className='flex flex-row w-full border border-black'>
                <div className='w-1/2 max-w-72 flex flex-col justify-center gap-3 p-4 border border-black'>
                    <div className='flex justify-center gap-4'>
                        <button className='flex p-2 border border-black rounded-md'>Crear chat</button>
                        <button className='flex p-2 border border-black rounded-md'>Crear grupo</button>
                    </div>
                    <div>
                        {chats.map((chat) => (
                            <div className='p-2 border border-black' key={chat.id}>{chat.name}</div>
                        ))}
                    </div>
                </div>
                <div className='flex w-1/2 p-4'>
                    <h1 className=''>mensajes</h1>
                </div>
            </div>
        </section>
    );
};

export default Chats