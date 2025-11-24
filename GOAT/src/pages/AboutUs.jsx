import MainImage from "../assets/mainimage.png";
import Dadaji from "../assets/dadaji.png";
import "../styles/aboutus.css";
function AboutUs() {
  return (
    <div className="bg-[#f6f3ef] text-gray-800">
      {/* Hero Section */}
      <section className="relative text-white bg-black">
        <div className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6">
          <div className="absolute inset-0 flex justify-end">
            <img
              src={MainImage} // Replace with your image path
              alt="Adarsh Mutton Shop"
              className="w-220 h-135 object-cover opacity-80 "
            />
          </div>

          {/* Text */}
          <div className="relative h-[50vh]  flex flex-col items-start max-w-6xl w-full font-light">
            <h2 className="text-3xl md:text-8xl leading-tight">
              <em>OUR</em>
            </h2>
            <h2 className="text-3xl md:text-8xl leading-tight">
              <em>LEGACY</em>
            </h2>
            <h2 className="text-xl md:text-4xl italic text-[#EA8888] leading-tight">
              Since 1972
            </h2>
          </div>
        </div>
      </section>
      {/* Founder Section */}
      <div className="dadaji flex flex-col items-center">
        <h3 className="text-4xl font-regular h-15">Mr. ASHOK UDARAMJI MADNE</h3>
        <div className="line w-150 h-[3px] bg-gradient-to-r from-transparent via-black to-transparent"></div>
        <img
          src={Dadaji} // Replace with your founder image
          alt="Founder"
          className="w-100 h-100 object-cover rounded-lg"
        />
        <p className="dadajitext text-gray-1200 leading-relaxed max-w-6xl">
          Established in 1972 in Nagpur, serving the city for over five decades.
          Specializing in premium quality, 100% halal goat meat, trusted by
          famous hotels, businesses, and regular customers. Known for freshness,
          hygiene, and authentic taste. Committed to maintaining high standards
          and customer trust. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
      </div>
      {/* Owner Section */}
      <div className=" ownerline flex items-center justify-center gap-10 my-10">
        {/* Left Curve */}
        <svg
          width="450"
          height="60"
          viewBox="0 0 450 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 30 Q 120 -10 225 30 T 440 30"
            stroke="black"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="30"
            x2="410"
            y2="30"
            stroke="black"
            strokeWidth="1"
          />
        </svg>

        {/* Title */}
        <span className="text-2xl font-semibold-italic text-[#D46A6A]">
          Owner
        </span>

        {/* Right Curve (Mirrored) */}
        <svg
          width="450"
          height="60"
          viewBox="0 0 450 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="scale(-1,1) translate(-450,0)">
            <path
              d="M10 30 Q 120 -10 225 30 T 440 30"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="30"
              x2="410"
              y2="30"
              stroke="black"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
      <div className="owner flex flex-col items-center">
        <h3 className="text-3xl font-regular h-15">Mr. ASHISH ASHOK MADNE</h3>
        <div className="line w-120 h-[3px] bg-gradient-to-r from-transparent via-black to-transparent"></div>
        <img
          src={Dadaji} // Replace with your founder image
          alt="Founder"
          className="w-90 h-90 object-cover rounded-lg"
        />
        <p className="dadajitext text-gray-1200 leading-relaxed max-w-6xl">
          Established in 1972 in Nagpur, serving the city for over five decades.
          Specializing in premium quality, 100% halal goat meat, trusted by
          famous hotels, businesses, and regular customers. Known for freshness,
          hygiene, and authentic taste. Committed to maintaining high standards
          and customer trust. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
      </div>
      {/* Co-Owner Section */}
      <div className=" co-ownerline flex items-center justify-center gap-10 my-10">
        {/* Left Curve */}
        <svg
          width="450"
          height="60"
          viewBox="0 0 450 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 30 Q 120 -10 225 30 T 440 30"
            stroke="black"
            strokeWidth="1"
          />
          <line
            x1="40"
            y1="30"
            x2="410"
            y2="30"
            stroke="black"
            strokeWidth="1"
          />
        </svg>

        {/* Title */}
        <span className="text-2xl font-semibold-italic text-[#D46A6A]">
          Co-Owner
        </span>

        {/* Right Curve (Mirrored) */}
        <svg
          width="450"
          height="60"
          viewBox="0 0 450 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="scale(-1,1) translate(-450,0)">
            <path
              d="M10 30 Q 120 -10 225 30 T 440 30"
              stroke="black"
              strokeWidth="1"
            />
            <line
              x1="40"
              y1="30"
              x2="410"
              y2="30"
              stroke="black"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
      <div className="co-owner flex flex-col items-center">
        <h3 className="text-3xl font-regular h-15">Mr. VAIBHAV ASHOK MADNE</h3>
        <div className="line w-120 h-[3px] bg-gradient-to-r from-transparent via-black to-transparent"></div>
        <img
          src={Dadaji} // Replace with your founder image
          alt="Founder"
          className="w-90 h-90 object-cover rounded-lg"
        />
        <p className="dadajitext text-gray-1200 leading-relaxed max-w-6xl">
          Established in 1972 in Nagpur, serving the city for over five decades.
          Specializing in premium quality, 100% halal goat meat, trusted by
          famous hotels, businesses, and regular customers. Known for freshness,
          hygiene, and authentic taste. Committed to maintaining high standards
          and customer trust. Lorem Ipsum is simply dummy text of the printing
          and typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged. Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
          unchanged.
        </p>
      </div>


      {/* Map Section */}
      <div className="flex w-full">

  {/* LEFT: MAP */}
  <div className="mapsection w-2/3 flex justify-center">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14883.637835445285!2d79.07580304999999!3d21.1560012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1763800761798!5m2!1sen!2sin"
      className="w-[90%] h-[450px] rounded-tr-full rounded-br-full border-1 border-black"
      loading="lazy"
    ></iframe>
  </div>

  {/* RIGHT: TEXT */}

  <div className="w-1/3 flex flex-col justify-center items-start px-6">

    {/* Heading */}
    <h2 className="text-5xl font-semibold-italic mb-3 -translate-y-15 translate-x-25 transform overflow-hidden">
      <em>Our Location</em>
    </h2>

    {/* Paragraph */}
    <p className="text-lg leading-relaxed text-gray-700">
      We’ve been serving our community from the same location since 1972.
Through the years, our commitment to originality, quality, and trust has stayed constant.
What defines us has remained the same—true, authentic, and enduring.
    </p>

  </div>

</div>

      {/* Footer */}
    </div>
  );
}

export default AboutUs;
