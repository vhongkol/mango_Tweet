import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Profile from '../../../Auth/Profile';

export default createBoard({
    name: 'Profile',
    Board: () => <Profile />
});
