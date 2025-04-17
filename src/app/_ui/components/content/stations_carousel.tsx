import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/app/_ui/shadcn/components/ui/carousel";
  
  import Link from "next/link";
  import {
      Card,
      CardContent,
      CardHeader,
      CardTitle,
    } from "@/app/_ui/shadcn/components/ui/card";
  
import { Badge } from "@/app/_ui/shadcn/components/ui/badge";
    
  import {
    Users, User, Lock
    } from "lucide-react"
  
  import { cookies } from "next/headers";
  import { SESSION_COOKIE_NAME } from '@/core/constants';
  import ShopButton from "@/app/_ui/components/content/shop_button";
  import { getStationsController } from "@/interface_adapters/controllers/content/station/get_stations_controller";
  
  export async function StationsCarousel() {
      const stations = await getStationsController();
      
      let paidUser = false;
      const session = (await cookies()).get(SESSION_COOKIE_NAME);
      if (session) {
          const user = JSON.parse(session.value);
          paidUser = user.purchased;
      }

      const getScoreColor = (score: number | undefined) => {
        if (score === undefined) return "text-gray-400";
        if (score >= 80) return "text-green-600";
        if (score >= 60) return "text-yellow-600";
        return "text-red-600";
    };
  
    return (
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {stations.map((station) => (
            <CarouselItem key={station.id} className="md:basis-1/2 lg:basis-1/4">
              {(station.access === "purchased" && !paidUser) ? 
                  <Card key={station.id} className="text-xl flex flex-col items-center justify-center border-primary/20 shadow-sm hover:shadow-md transition-all duration-200 h-full">
                      <CardHeader className="w-full bg-primary/5 pb-4 rounded-t-xl">
                          <CardTitle className="flex items-center space-x-4">
                              <div className="relative">
                                <div className="h-10 w-20 flex items-center justify-center bg-primary/10 rounded-lg">
                                  <p className="font-semibold text-primary">SDD {station.sddNumber}</p>
                                </div>
                              </div>
                              <p className="flex-1 text-center font-semibold">{station.title}</p>
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="justify-center items-center border-t w-full py-6">
                          <ul className="space-y-6 mt-2 py-2 w-full">
                              <li className="flex items-center justify-center text-gray-600">
                                  <p>Contenu payant</p>
                              </li>
                              <li className="flex items-center justify-center space-x-4 mt-4">
                                  <ShopButton/>
                              </li>
                          </ul>
                      </CardContent>
                  </Card>
              : <Link key={station.id} href={`/station/${station.id}`}>
                  <Card key={station.id} className="text-xl flex flex-col items-center justify-center border-primary/20 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 h-full">
                      <CardHeader className="w-full bg-primary/5 pb-4 rounded-t-xl">
                          <CardTitle className="flex items-center space-x-4">
                                <div className="h-10 w-20 flex items-center justify-center bg-primary/10 rounded-lg">
                                  <p className="font-medium text-primary">SDD {station.sddNumber}</p>
                                </div>
                                <p className="flex-1 text-center font-semibold">{station.title}</p>
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="justify-center items-center border-t w-full py-4">
                          <ul className="space-y-4 mt-2">
                              <li className="flex items-center flex-wrap gap-2">
                                {station.tags.slice(0, 3).map((tag, i) => (
                                    <Badge key={i} variant="secondary" className="text-xs bg-primary/5 text-primary">
                                        {tag}
                                    </Badge>
                                ))}
                                {station.tags.length > 3 && (
                                    <Badge variant="outline" className="text-xs">
                                        +{station.tags.length - 3} more
                                    </Badge>
                                )}
                              </li>
                              <li className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-3">
                                      <User className="text-primary h-5 w-5"/>
                                      <p>Entrainement seul</p>
                                  </div>
                                  <span className={`font-medium ${getScoreColor(station.lastResult?.soloScore)}`}>
                                      {station.lastResult ? `${station.lastResult.soloScore}%` : "N/A"}
                                  </span>
                              </li>
                              <li className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-3">
                                      <Users className="text-primary h-5 w-5"/>
                                      <p>Entrainement en duo</p>
                                  </div>
                                  <span className={`font-medium ${getScoreColor(station.lastResult?.multiScore)}`}>
                                      {station.lastResult ? `${station.lastResult.multiScore}%` : "N/A"}
                                  </span>
                              </li>
                          </ul>
                      </CardContent>
                  </Card>
              </Link>}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-white shadow-md border border-gray-200" />
        <CarouselNext className="bg-white shadow-md border border-gray-200" />
      </Carousel>
    )
  }