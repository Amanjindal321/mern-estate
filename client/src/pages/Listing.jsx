import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

const Listing = () => {
    SwiperCore.use([Navigation])
    const [listing, setListing]=useState(null);
    const [loading, setLoading]=useState(false);
    const [error, setError]=useState(false);
    const params=useParams();

    useEffect(()=>{
        const fetchListing=async()=>{
            try {
                setLoading(true)
                const res=await fetch(`/api/listing/get/${params.listingId}`)
                const data=await res.json();
                if(data.success===false){
                    setError(true);
                    setLoading(false);
                    return
                }
                setListing(data);
                setLoading(false);
                setError(false)
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchListing();
    }, [params.listingId]);
    console.log(loading);
    return (
       <main>
            {
                loading && <p className='text-center my-7 text-2xl'>Loading...</p>
            }
            {
                listing && !error && !loading && (
                    <div>
                        <Swiper navigation>
                            {listing.imageUrls.map((url)=>(
                                <SwiperSlide key={url}>
                                    <div style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover', height: '550px'}}>

                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )
            }
       </main>
    )
}

export default Listing