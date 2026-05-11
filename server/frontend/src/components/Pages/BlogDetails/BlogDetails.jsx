import Header from "../../Common/Header/Header";
import Banner from "../../Common/Banner/Banner";
import Footer from "../../Common/Footer/Footer";

import bannerBg from "../../../assets/images/blog-banner.jpg";
import blogDetailsImg from "../../../assets/images/details.jpg";

const BlogDetails = () => {
  return (
    <>
      <Header />
      <Banner
        title="First blog post"
        bgImage={bannerBg}
        bgPosition={915}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blogs", path: "/blogs" },
          { label: "Blog Details" }
        ]}
      />

      <section className="blog-detail" id="blog">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="blog-details">
                            <img src={blogDetailsImg} alt="blog-details" />
                            <div className="post-author">
                                <a href="#"><i className="icofont icofont-user"></i>John</a>
                                <a href="#"><i className="icofont icofont-speech-comments"></i>Comments</a>
                                <a href="#"><i className="icofont icofont-calendar"></i>21 Feb 2018</a>
                            </div>
                            <p>Fames ultrices dolores vitae euismod lobortis corporis facere id nullam aspernatur litora, vitae numquam do molestiae iaculis. Ullamco, assumenda tempor, ullamco blanditiis, Dictum illum nesciunt doloremque, ad sociis! Excepteur tenetur perferendis quisque totam placeat temporibus semper perspiciatis voluptatum maecenas nisl.</p>
                            <p>Ramet quam enim veniam tempus cumque. Integer vel impedit quidem, dolor quod, ullam nemo, impedit nesciunt voluptatum porro, tenetur aliqua ipsa posuere posuere. Lorem ipsum dolor sit amet consectetur adipiscing elitsed do eiusmod tempor incididunt utlabore et dolore magna aliqua. Utenim ad minim veniam quis nostrud exercitation ullamco.</p>
                            <p>Fames ultrices dolores vitae euismod lobortis corporis facere id nullam aspernatur litora, vitae numquam do molestiae iaculis. Ullamco, assumenda tempor, ullamco blanditiis, Dictum illum nesciunt doloremque, ad sociis! Excepteur tenetur perferendis quisque totam placeat temporibus semper perspiciatis voluptatum maecenas nisl impedit nesciunt voluptatum porro, tenetur aliqua ipsa posuere posuere. Lorem ipsum dolor sit amet consectetur adipiscing elitsed do eiusmod tempor incididunt utlabore.</p>
                        </div>
                        <div className="blog-reply">
                            <h4>Leave a Reply</h4>
                            <form action="#" method="POST">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input type="text" name="replyname" placeholder="Enter Your Name" />
                                    </div>
                                    <div className="col-lg-6">
                                        <input type="email" name="replyemail" placeholder="Enter Your Email" />
                                    </div>
                                    <div className="col-lg-12">
                                        <textarea placeholder="Messege" name="message"></textarea>
                                        <button type="submit" name="replysubmit">Post Comment</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="sidebar">
                            <div className="widget">
                                <form action="#">
                                    <input type="text" name="search" placeholder="Search here" />
                                    <button type="submit">Go</button>
                                </form>
                            </div>
                            <div className="widget">
                                <h4>Categories</h4>
                                <ul>
                                    <li><a href="#">Business</a></li>
                                    <li><a href="#">Networking</a></li>
                                    <li><a href="#">Security</a></li>
                                    <li><a href="#">Software</a></li>
                                </ul>
                            </div>
                            <div className="widget">
                                <h4>Latest posts</h4>
                                <ul>
                                    <li><a href="#">Savings now offers checking account</a></li>
                                    <li><a href="#">Facebook begins Stories on desktop</a></li>
                                    <li><a href="#">Nintendo compatible NES30 Arcade now</a></li>
                                </ul>
                            </div>
                            <div className="widget widget-tags">
                                <h4>Tags</h4>
                                <a href="#">Business</a>
                                <a href="#">Networking</a>
                                <a href="#">Latest</a>
                                <a href="#">Popular</a>
                                <a href="#">Security</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

      <Footer />
    </>
  );
};
export default BlogDetails;