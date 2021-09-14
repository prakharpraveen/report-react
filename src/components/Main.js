import React from 'react';
import ButtonAppBar from './pages/ButtonAppBar';

const Main = ({updateUser}) => {
    return (
        <div>
            <ButtonAppBar updateUser={updateUser}/>
        </div>
    )
}

export default Main;