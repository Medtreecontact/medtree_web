"use client";
import { MenuItems } from '@/entities/models/menuItem';
import React from 'react'

type MenuItemCardProps = {
    menuItem: MenuItems;
};
export default function MenuItemCard({ menuItem }: MenuItemCardProps) {
    return (
        <li>{menuItem.title}</li>
    )
}
