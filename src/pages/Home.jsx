import React from 'react';

const Home = () => {
    return (
        <div className="row text-secondary">
            <div className="col-12">
                {/*------Header------ */}
                <div className="row">
                    <div className="home-img img-header w-100"></div>
                </div>
                <div className="row">
                    <div className="col-10 offset-1 col-xxl-8 offset-xxl-2">
                        <div className="row">
                            <div className="col-12 mt-4 mb-4 p-3 bg-white rounded shadow-sm">
                                {/*------Book Search------ */}
                                <form className="row p-4">
                                    <div className="col-12 col-md-8 col-xl-9">
                                        <input type="text" className="form-control"
                                               placeholder="What book do you want to review?"/>
                                    </div>
                                    <div className="col-12 col-lg-4 col-xl-3 mt-3 mt-lg-0">
                                        <button className="btn btn-secondary ms-2">Add Review
                                        </button>
                                        <button type="button" className="btn btn-secondary ms-4">Cancel
                                        </button>
                                    </div>
                                </form>
                                {/*------Review Form------ */}

                            </div>
                        </div>
                        {/*------Review Posts------ */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
