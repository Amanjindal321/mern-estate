import React from "react";
import { Link } from "react-router-dom";
import {MdLocationOn} from 'react-icons/md'

const ListingItem = ({listings}) => {
    return (
        <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
            <Link>
            <img src={listings.imageUrls[0] || "https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/real-estate-photography/real-estate-photography_P1_900x420.jpg.img.jpg"} alt='listing cover' className=' h-[320px] w-full sm:h-[220px] object-cover hover:scale-105 transition-scale duration-300'/>
            <div>
                <p className=' truncate text-lg font-semibold text-slate-700'>{listings.name}</p>

                <div className=' flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className=" truncate text-sm text-gray-600 w-full">{listings.address}</p>
                </div>
                <p className="line-clamp-3 text-sm text-gray-600">{listings.description}</p>
                <p>${listings.offer ? listings.discountPrice.toLocaleString('en-US'):listings.regularPrice.toLocaleString('en-US')} {listings.type==='rent' && '/month'}</p>
                <div className=" flex gap-4 text-slate-700">
                    <div className="font-bold text-xs">
                        {listings.bedrooms>1?`${listings.bedrooms} beds`:`${listings.bedrooms} bed`}
                    </div>

                    <div className="font-bold text-xs">
                        {listings.bathrooms>1?`${listings.bathrooms} baths`:`${listings.bathrooms} bath`}
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default ListingItem;