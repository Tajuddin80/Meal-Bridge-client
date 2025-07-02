import React from "react";

const Faq = () => {
  return (
    <section className="bg-base-100 text-base-content">
      <div
        className="flex flex-col justify-center p-4 mx-auto md:p-8"
        style={{ width: "95vw" }}
      >
   
        <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-base-300">
          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              What is the purpose of this website?
            </summary>
            <div className="px-4 pb-4">
              <p>
                Our website connects donors and recipients to reduce food waste
                and ensure surplus food reaches those who need it most. We aim
                to build a compassionate community focused on sharing and
                sustainability.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              How can I donate food through the platform?
            </summary>
            <div className="px-4 pb-4">
              <p>
                Simply sign up as a donor, list the available food items with
                details like quantity, pickup location, and expiration date, and
                wait for someone in need to request the item. It’s quick and
                easy!
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              Is there any cost to use the service?
            </summary>
            <div className="px-4 pb-4">
              <p>
                No. Our platform is completely free for both donors and
                recipients. We believe in promoting kindness without barriers.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              How do I ensure the food is safe for donation?
            </summary>
            <div className="px-4 pb-4">
              <p>
                We encourage donors to provide food that is fresh, well-packed,
                and clearly labeled with expiration dates. Perishable items
                should be donated well before their expiry to ensure safety for
                recipients.
              </p>
            </div>
          </details>

          <details>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              Who can receive food from this platform?
            </summary>
            <div className="px-4 pb-4">
              <p>
                Anyone in need can request available food items. We welcome
                individuals, families, shelters, and organizations dedicated to
                supporting their communities.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default Faq;
