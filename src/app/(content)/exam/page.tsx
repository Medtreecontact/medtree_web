import { getMenuItemsController } from "@/interface_adapters/controllers/content/exam/get_menu_items_controller";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/app/_ui/shadcn/components/ui/card";

import Image from 'next/image'


export default async function ExamHomePage() {
    const menuItems = await getMenuItemsController();
    return( 
        <div className="flex justify-center items-center min-h-screen w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {menuItems.map((item) => (
                <Link key={item.id} href={"/exam/" + item.examRef.id}>
                    <Card key={item.id} className="text-lg flex flex-col items-center justify-center">
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            {/* <CardDescription>Card Description</CardDescription> */}
                        </CardHeader>
                        <CardContent className="flex justify-center items-center h-32">
                            <Image
                                src={item.iconPath}
                                width={80}
                                height={0}
                                alt={"icon de " + item.title}
                            />
                        </CardContent>
                        <CardFooter>
                            <p>2 synthèses disponibles</p>
                        </CardFooter>
                    </Card>
                </Link>

            ))}
        </div>
    </div>
    );
}
