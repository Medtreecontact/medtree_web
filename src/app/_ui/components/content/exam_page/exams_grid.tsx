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
import ShopButton from "@/app/_ui/components/content/shop_button";
import { Progress } from "@/app/_ui/shadcn/components/ui/progress";
import type { MenuItem } from "@/entities/models/menu_item";

export default function ExamsGrid({menuItems, paidUser}:{ menuItems : MenuItem[], paidUser : boolean }) {
    return (
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
                    <Link key={item.id} href={"/exam/" + item.examId}>
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
                                        <Progress value={item.examAdvancement} className="w-1/4"/>
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
    );
}