import React from "react";
import { ContentWrapper, Layout } from "../../components";


const PageNotFound = () => {
  document.title = "Ops Page not Found"
    return (
      <Layout>
        <div className="pageNotFound">
            <ContentWrapper>
                <span className="bigText">404</span>
                <span className="smallText">Page not found!</span>
            </ContentWrapper>
        </div>
      </Layout>
    );
};

export default PageNotFound;