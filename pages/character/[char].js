import { useRouter } from "next/router";

function MyChar(){
    const router= useRouter();
    const charId =router.query.char;
    return <h1>Deatils of character id: {charId} </h1>
}

export default MyChar