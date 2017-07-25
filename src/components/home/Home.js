/**
 * Created by pierremarsot on 14/05/2017.
 */
import React from 'react'

class Home extends React.Component {
  render() {
    return (
      <div className="home_page">
        <header className="header header-inverse h-fullscreen pb-30 bg-fixed" data-overlay="1">
          <div className="container">

            <div className="row h-full">
              <div className="col-12 col-lg-6 align-self-center">

                <h1 className="display-4">We can lend a hand</h1>
                <br/>
                <h4 className="fw-200">Zendesk builds software for <span className="mark-border">better</span>
                  customer relationships.</h4>

                <br/><br/>

                <a className="btn btn-lg btn-round w-200 btn-primary mr-16" href="#" data-scrollto="section-intro">Signup</a>
                <a className="btn btn-lg btn-round btn-outline w-200 btn-white hidden-sm-down" href="#"
                   data-scrollto="section-intro">Start trial</a>

              </div>

              <div className="col-12 align-self-end text-center">
                <a className="scroll-down-1 scroll-down-inverse" href="#"
                   data-scrollto="section-intro"><span></span></a>
              </div>

            </div>

          </div>
        </header>
        <main className="main-content">


          <section className="section">
            <div className="container">
              <header className="section-header">
                <small>Products</small>
                <h2>Working together is better</h2>
                <hr/>
                  <p className="lead">Our products allow businesses to be more reliable, flexible, and scalable. They
                    help improve communication and make sense of massive amounts of data.</p>
              </header>


              <div className="row gap-y">

                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p ><i className="icon-lightbulb fs-50"></i></p>
                      <h5 className="card-title">Support</h5>
                    </a>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p ><i className="icon-book-open fs-50"></i></p>
                      <h5 className="card-title">Guide</h5>
                    </a>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p ><i className="icon-chat fs-50"></i></p>
                      <h5 className="card-title">Chat</h5>
                    </a>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p ><i className="icon-mic fs-50"></i></p>
                      <h5 className="card-title">Talk</h5>
                    </a>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p ><i className="icon-envelope fs-50"></i></p>
                      <h5 className="card-title">Message</h5>
                    </a>
                  </div>
                </div>


                <div className="col-6 col-md-4 col-xl-2">
                  <div className="card card-bordered card-hover-shadow text-center">
                    <a className="card-block" href="#">
                      <p ><i className="icon-piechart fs-50"></i></p>
                      <h5 className="card-title">Explore</h5>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          </section>


          <section className="section text-center py-120"
                   data-overlay="6">
            <div className="container">
              <h5 className="fs-30 text-white fw-300 mb-90"><strong>Start</strong> the supporting system that you always
                dreamed about</h5>
              <p><a className="btn btn-xl btn-round btn-success w-250"
                    href="https://www.youtube.com/watch?v=ah4pcPbRi2M" data-provide="lightbox">Watch a video</a></p>
            </div>
          </section>


        </main>
      </div>
  )
  }
  }

  export default Home;