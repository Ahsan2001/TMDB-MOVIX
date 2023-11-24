import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Banner from "./banner";
import Cast from "./cast";
import { Layout } from "../../components";
import VideosSection from "./videos";
import Similar from "./similar";
import Recommendation from "./recommendation"


const Detail = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);


    document.title = "Movie Detail"
    return (
      <Layout>
            <Banner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} />
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
      </Layout>
    );
};

export default Detail;