import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Banner from "./banner";
import Cast from "./cast";
import { Layout } from "../../components";

const Detail = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(`/${mediaType}/${id}/credits`);

    return (
      <Layout>
            <Banner video={data?.results?.[0]} crew={credits?.crew} loading={loading} />
            <Cast data={credits?.cast} loading={creditsLoading} />
      </Layout>
    );
};

export default Detail;