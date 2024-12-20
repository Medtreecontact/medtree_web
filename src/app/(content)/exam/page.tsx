import { getMenuItemsController } from "@/interface_adapters/controllers/content/exam/get_menu_items_controller";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/app/_ui/shadcn/components/ui/card";


import Image from 'next/image'

import {
    TableOfContents,
    NotebookText,
    SquareCheckBig,
  } from "lucide-react"
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from '@/core/constants';
import ShopButton from "@/app/_ui/components/content/shop_button";



export default async function ExamHomePage() {
    const menuItems = await getMenuItemsController();

    let paidUser = false;
    const session = cookies().get(SESSION_COOKIE_NAME);
    if (session)
    {
        const user = JSON.parse(session.value);
        paidUser = user.purchased;
    }

    return( 
        <div className="flex flex-col justify-center items-center min-h-screen w-full p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {menuItems.map((item) => (
                        
                            (item.access == "purchased" && !paidUser ) ? 
                            <Card key={item.id} className={`text-xl flex flex-col items-center justify-center`}>
                            <CardHeader className="w-full">
                                <CardTitle className="flex items-center space-x-4">
                                    <Image
                                        src={item.iconPath}
                                        width={80}
                                        height={80}
                                        alt={"icon de " + item.title}
                                    />
                                    <p className="flex-1 text-center">{item.title}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="justify-center items-center border-t w-full">
                            <ul className="space-y-8 mt-5 py-2">
                                    <li className="flex items-center justify-center space-x-4">
                                        <p>Contenu payant</p>
                                    </li>
                                    <li className="flex items-center justify-center space-x-4">
                                        <ShopButton/>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card> :
                    <Link key={item.id} href={"/exam/" + item.examRef.id}>
                        <Card key={item.id} className={`text-xl flex flex-col items-center justify-center `}>
                            <CardHeader className="w-full">
                                <CardTitle className="flex items-center space-x-4">
                                    <Image
                                        src={item.iconPath}
                                        width={80}
                                        height={80}
                                        alt={"icon de " + item.title}
                                    />
                                    <p className="flex-1 text-center">{item.title}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="justify-center items-center border-t w-full">
                                <ul className="space-y-4 mt-4">
                                    <li className="flex items-center space-x-4">
                                        <TableOfContents />
                                        <p>{item.stepCount} Chapitres</p>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <NotebookText/>
                                        <p>{item.synthesesCount} Fiches synthèses</p>
                                    </li>
                                    <li className="flex items-center space-x-4">
                                        <SquareCheckBig/>
                                        <p>0 / 3 Quizz</p>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
    </div>
    );
}