import { useRouter } from "next/router";

export default function myChar(){
    const router= useRouter();
    const id=router.query.id;
    return <h1> Deatils of character id: {id}</h1>
}