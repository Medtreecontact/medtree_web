import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_ui/shadcn/components/ui/carousel";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/app/_ui/shadcn/components/ui/card";



import {
    Speech,
    Zap,
  } from "lucide-react"

export async function EcosCarousel() {

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[calc(100vw-16rem)]"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <Card key={index} className="text-xl flex flex-col items-center justify-center" >
                            <CardHeader className="w-full">
                                <CardTitle className="flex items-center space-x-4">
                                  <Speech />
                                    <p className="flex-1 text-center">A venir</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="justify-center items-center border-t w-full">
                                <ul className="space-y-4 mt-4">
                                    <li className="flex items-center space-x-4">
                                        <p>A venir</p>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export async function FlashcardCarousel() {

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[calc(100vw-16rem)]"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                        <Card key={index} className="text-xl flex flex-col items-center justify-center" >
                            <CardHeader className="w-full">
                                <CardTitle className="flex items-center space-x-4">
                                  <Zap />
                                    <p className="flex-1 text-center">A venir</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="justify-center items-center border-t w-full">
                                <ul className="space-y-4 mt-4">
                                    <li className="flex items-center space-x-4">
                                        <p>A venir</p>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
