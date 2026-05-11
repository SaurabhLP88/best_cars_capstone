import Header from "../../Common/Header/Header";
import Banner from "../../Common/Banner/Banner";
import Footer from "../../Common/Footer/Footer";

import bannerBg from "../../../assets/images/blog-banner.jpg";
import blogImg1 from "../../../assets/images/blog/blog1.jpg";
import blogImg2 from "../../../assets/images/blog/blog2.jpg";
import blogImg3 from "../../../assets/images/blog/blog3.jpg";

const blogData = [
  {
    image: blogImg1,
    author: "John",
    date: "21 Feb 2018",
    title: "Lorem ipsum dolor sit",
    description:
      "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: blogImg2,
    author: "John",
    date: "21 Feb 2018",
    title: "Another blog title",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    image: blogImg3,
    author: "John",
    date: "21 Feb 2018",
    title: "Third blog post",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  },
  {
    image: blogImg1,
    author: "John",
    date: "21 Feb 2018",
    title: "Lorem ipsum dolor sit",
    description:
      "Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    image: blogImg2,
    author: "John",
    date: "21 Feb 2018",
    title: "Another blog title",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    image: blogImg3,
    author: "John",
    date: "21 Feb 2018",
    title: "Third blog post",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
  },
];

const Blogs = () => {
  return (
    <>
      <Header />

      <Banner
        title="Blogs"
        bgImage={bannerBg}
        bgPosition={915}
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Blogs" },
        ]}
      />
        
        {/* blog section start */}
        <section className="blog-area blog-page" id="blog">
            <div className="container">

                <div className="row">
                    {blogData.map((blog) => (
                        <div className="col-lg-4 col-md-6" key={blog.id}>
                            <div className="single-post">

                                <div className="post-thumbnail">
                                    <a href="/blogDetails"><img src={blog.image} alt="{blog.title}" /></a>
                                </div>

                                <div className="post-details">
                                    <div className="post-author">
                                        <a href="/blogDetails">
                                            <i className="icofont icofont-user"></i> {blog.author}
                                        </a>
                                        <a href="/blogDetails">
                                            <i className="icofont icofont-speech-comments"></i> Comments
                                        </a>
                                        <a href="/blogDetails">
                                            <i className="icofont icofont-calendar"></i> {blog.date}
                                        </a>
                                    </div>
                                    <h4 className="post-title">{blog.title}</h4>
                                    <p>{blog.description}</p>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                <div class="row">
                  <div class="col-lg-12">
                      <div class="pagination">
                          <ul>
                              <li><a href="#"><i class="icofont icofont-curved-left"></i></a></li>
                              <li><a href="#">1</a></li>
                              <li><a href="#">2</a></li>
                              <li><a href="#">3</a></li>
                              <li><a href="#">4</a></li>
                              <li><a href="#"><i class="icofont icofont-curved-right"></i></a></li>
                          </ul>
                    </div>
                  </div>
                </div>

            </div>
        </section>
        {/* blog section end */}

      <Footer />
    </>
  );
};

export default Blogs;