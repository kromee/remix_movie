import { LoaderArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Link } from "react-router-dom";

export async function loader({params}: LoaderArgs){
    const url = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhY2M4ZjI3NmRjZTRmNjYwZGRkNGI0MDEwY2I0MDMwOSIsInN1YiI6IjVlY2M3MGEyMDIxY2VlMDAyMTg5OWFiNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HKSe_F1QLgMEX0vsGAXFWxkh6O-VeyQveHhS47r_a5c",
          },
        }
       
      );
      return json(await url.json());
}
export default function MovieId(){
    const data = useLoaderData();


    return (
        <div className="min-h-screen p-10">
            <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt="" className="h-[40vh] object-cover w-full rounded-lg" />
        <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>
        <div className="flex gap-x-10 mt-10">
            <div className="w-1/2 font-meduim">
                <h1><span className="underline">Home page </span>{" "}
                <Link to={data.homepage} target="_blank">Link</Link>
                </h1>
                <h1><span className="underline">Original languaje</span>{" "}{data.original_languaje}</h1>
                <p><span className="underline">Overview</span>{" "} {data.overview}</p>
                <p><span className="underline">Realise date</span>{" "}{data.release_date}</p>
            </div>
            <div className="w-1/2">
                <Outlet/>
            </div>
        </div>
        </div>
    
    )
}
