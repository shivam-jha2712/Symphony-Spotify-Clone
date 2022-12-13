import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';


const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const { activeSong, isPlaying } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByCountryQuery(country);


    useEffect(() => {
        axios.get(`https://geo.ipify.org/api/v2/country?apiKey=at_pxWh94fnm537b8l9UrTXNa60dY2oV`)
            .then((res) => setCountry(res?.data?.location?.country))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [country]);


    // If the data is being fetched then get it done 
    if (isFetching && loading) return <Loader title="Loading Songs Around Your place" />

    if (error && country) return <Error />;

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
                Songs Around You <span className="font-black">{country}</span>
            </h2>
            <div className="flex flex-wrap sm:justify-start justify-center 
            gap-8">
                {/* The data of the songs would be fetched like the songcard
                 component and as it is a redux component thus it is being 
                 reused */}
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    )
}

export default AroundYou;
