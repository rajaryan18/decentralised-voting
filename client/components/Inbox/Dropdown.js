import React, { useState, useEffect } from 'react';
import Message from './Message';
// 1. Get info about Logged In User's elections and Invitations (GET)
// 2. Map through them and display all (Maybe not all)
// 3. If clicked, redirect to election's page
// 4. Maybe a page to display all mails

export const Dropdown = ({ messages }) => {
    return (
        <div>
            {messages && messages.map((message) => {
                return <Message />;
            })}
        </div>
    );
};