"use client";
import React from 'react'
import { sendGAEvent } from '@next/third-parties/google'
import { Button } from '../../shadcn/components/ui/button';

export const AnalyticsButton = () => {
    const handleClick = () => {
        sendGAEvent('event', 'buttonClicked', { value: 'xyz' });
    };

    return <Button onClick={handleClick}>Click me</Button>;
};