import Header from "../../Common/Header/Header";
import Banner from "../../Common/Banner/Banner";
import Footer from "../../Common/Footer/Footer";

import bannerBg from "../../../assets/images/blog-banner.jpg";
import blogImg1 from "../../../assets/images/blog/blog4.jpg";
import blogImg2 from "../../../assets/images/blog/blog5.jpg";
import blogImg3 from "../../../assets/images/blog/blog6.jpg";
import blogImg4 from "../../../assets/images/blog/blog7.jpg";
import blogImg5 from "../../../assets/images/blog/blog8.jpg";
import blogImg6 from "../../../assets/images/blog/blog9.jpg";

const blogData = [
  {
    image: blogImg1,
    author: "Saurabh",
    date: "02 Jun 2026",
    title: "Top 5 Sports Sedans Worth Buying in 2026",
    description:
      "From the Kia Stinger to the BMW M340i, discover the best sports sedans that combine performance, comfort, and everyday practicality.",
  },
  {
    image: blogImg2,
    author: "Saurabh",
    date: "28 May 2026",
    title: "Electric vs Hybrid Cars: Which Should You Choose?",
    description:
      "Compare EVs and hybrid vehicles based on running costs, maintenance, charging convenience, and long-term ownership benefits.",
  },
  {
    image: blogImg3,
    author: "Saurabh",
    date: "24 May 2026",
    title: "10 Things to Check Before Buying a Used Car",
    description:
      "Learn how to inspect vehicle history, mileage, service records, and mechanical condition before making a purchase decision.",
  },
  {
    image: blogImg4,
    author: "Saurabh",
    date: "20 May 2026",
    title: "Best Family SUVs for Long Road Trips",
    description:
      "Explore spacious and feature-packed SUVs that offer comfort, safety, and fuel efficiency for family adventures.",
  },
  {
    image: blogImg5,
    author: "Saurabh",
    date: "15 May 2026",
    title: "How Regular Maintenance Extends Your Car's Life",
    description:
      "Simple maintenance habits such as oil changes, tire rotations, and brake inspections can save thousands in repair costs.",
  },
  {
    image: blogImg6,
    author: "Saurabh",
    date: "10 May 2026",
    title: "Manual vs Automatic Transmission: Pros and Cons",
    description:
      "Understand the differences between manual and automatic gearboxes to choose the right driving experience for your needs.",
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