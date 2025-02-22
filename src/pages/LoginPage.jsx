import { useState } from 'react';
import SignInWidget from '../components/SignInWidget';
import SignUpWidget from '../components/SignUpWidget';

const LogInPage = () => {
    const [displaySignIn, setDisplaySignIn] = useState(true);

    const toggleDisplaySignIn = () => setDisplaySignIn(true);
    const toggleDisplaySignUp = () => setDisplaySignIn(false);


    return (
        <div className="d-flex flex-column min-vh-100 login-page">
            <div className="container-fluid bg-light w-100 body flex-grow-1">
                <div className="row mt-5">
                    <div className="col-8 offset-2 col-xxl-6 offset-xxl-3 mt-5" id="hero">
                        <div className="row p-5 welcome-message rounded">
                            <h3 className="mb-4" id="welcome">Welcome to LoveLitReviews</h3>
                            <p style={{textIndent: "3em"}}>Join our passionate community of romance enthusiasts! Dive
                                into the world of love, intrigue, and excitement with our unique platform where readers
                                share their thoughts on the latest page-turners. Whether you&#39;re seeking heart-pounding
                                tales or sizzling encounters, our users rate books based on overall enjoyment,
                                captivating storytelling, writing style, and the delicious &#39;spiciness&#39; factor. Join us
                                and discover your next obsession in the realm of romance!</p>
                        </div>
                        {displaySignIn ? (
                            <div className="row mt-3 mb-5 p-5 login-widgets rounded">
                                <SignInWidget onSignInClick={toggleDisplaySignUp}/>
                            </div>
                        ) : (
                            <div className="row mt-3 mb-5 p-5 login-widgets rounded">
                                <SignUpWidget onSignUpClick={toggleDisplaySignIn}/>
                            </div>
                        )}
                        <div className=" row spacer mt-5 mb-5"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
