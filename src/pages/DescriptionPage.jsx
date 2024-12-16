import {ProductDescription} from "../components/ProductDescription"
import { Reviews } from "../components/Reviews"
import { useEffect } from "react";
export const DescriptionPage=()=>{
    useEffect(() => {
        // Scroll to the top of the page when the component is mounted
        window.scrollTo(0, 0);
      }, []);
    return(
        <>
        <ProductDescription/>
        <Reviews/>
        </>

    )
}