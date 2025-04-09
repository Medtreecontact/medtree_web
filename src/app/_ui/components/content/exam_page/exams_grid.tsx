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
                            <Card key={item.id} className="text-xl flex flex-col items-center justify-center border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 h-full">
                            <CardHeader className="w-full bg-primary/5 pb-4 rounded-t-xl">
                                <CardTitle className="flex items-center space-x-4">
                                    <Image
                                        src={item.iconPath}
                                        width={80}
                                        height={80}
                                        alt={"icon de " + item.title}
                                        className="rounded-md p-1"
                                    />
                                    <p className="flex-1 text-center font-semibold">{item.title}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="justify-center items-center border-t w-full py-6">
                            <ul className="space-y-5 py-2 w-full">
                                    <li className="flex items-center justify-center text-gray-600">
                                        <p>Contenu payant</p>
                                    </li>
                                    <li className="flex items-center justify-center space-x-4 mt-4">
                                        <ShopButton/>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card> :
                    <Link key={item.id} href={"/exam/" + item.examId} className="block h-full">
                        <Card key={item.id} className="text-xl flex flex-col items-center justify-center border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 h-full">
                            <CardHeader className="w-full bg-primary/5 pb-4 rounded-t-xl">
                                <CardTitle className="flex items-center space-x-4">
                                    <Image
                                        src={item.iconPath}
                                        width={80}
                                        height={80}
                                        alt={"icon de " + item.title}
                                        className="rounded-md p-1"
                                    />
                                    <p className="flex-1 text-center font-semibold">{item.title}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="justify-center items-center border-t w-full py-4">
                                <ul className="space-y-3 mt-2">
                                    <li className="flex items-center space-x-3 text-gray-700">
                                        <TableOfContents className="text-primary h-5 w-5" />
                                        <p><span className="font-medium">{item.stepCount}</span> Chapitres</p>
                                        <Progress value={item.examAdvancement} className="w-1/4"/>
                                    </li>
                                    <li className="flex items-center space-x-3 text-gray-700">
                                        <NotebookText className="text-primary h-5 w-5"/>
                                        <p><span className="font-medium">{item.synthesesCount}</span> Fiches synthèses</p>
                                    </li>
                                    <li className="flex items-center space-x-3 text-gray-700">
                                        <SquareCheckBig className="text-primary h-5 w-5"/>
                                        <p><span className="font-medium">{item.quizzesCount?.toString() ?? "0"}</span> Quiz</p>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
    );
}