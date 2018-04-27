import React from 'react';

const Features = () => {
    return (
        <div className="bg-indigo text-white">
            <br/>
            <br/>
            <br/>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-9">
                        <div className="row justifiy-content-end">
                            <div className="col-md-8">
                                <a href="#!">
                                    <img src="holder.js/800x300?random=yes&auto=yes" className="img-fluid ml-auto" alt="Feature 1" />
                                </a>
                            </div>
                            <div className="col-md-4 my-auto text-left">
                                <p>Lorem ipsum dolr sit amet.</p>
                                <p>Lorem ipsum dolor sit amet consectetur </p>
                                <p>Lorem ipsum dolor sit.</p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-4 my-auto text-right">
                                <p>Lorem ipsum dolor sit amet.</p>
                                <p>Lorem ipsum dolor sit amet consectetur </p>
                                <p>Lorem ipsum dolor sit.</p>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                            <div className="col-md-8">
                                <a href="#!">
                                    <img src="holder.js/800x300?random=yes&auto=yes" className="img-fluid" alt="Feature 2" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    );
};

export default Features;