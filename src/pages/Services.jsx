import { IoCloseCircleOutline } from "react-icons/io5";

const ServiceCard = ({ title, imageSrc, description, modalId, detailedDescription, services }) => (
  <div className="card bg-base-100 border rounded-2xl m-2">
    <figure>
      <img src={imageSrc} className="mt-5" />
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond">{title}</h2>
      <p className="mb-5 text-gray-500 text-xs md:text-sm lg:text-base">{description}</p>
      <div className="card-actions">
        <button className="btn btn-ghost btn-circle" onClick={() => document.getElementById(modalId).showModal()}>
          <img src="./images/Frame.png" alt="" />
        </button>
        <dialog id={modalId} className="modal">
          <div className="modal-box text-start">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5 text-3xl">
                <IoCloseCircleOutline />
              </button>
            </form>
            <h3 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond">{title}</h3>
            <p className="mb-5 text-xs md:text-sm lg:text-base">
              <span className="font-bold">Detailed Description:</span> {detailedDescription}
            </p>
            <span className="font-bold text-xs md:text-sm lg:text-base">Services include:</span>
            <ul className="text-xs md:text-sm lg:text-base">
              {services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </dialog>
      </div>
    </div>
  </div>
);

const Services = () => (
  <div>
    <section className="w-11/12 mx-auto my-7 md:my-10 lg:my-14">
      <div className="text-center max-w-xs md:max-w-lg lg:max-w-2xl mx-auto my-7 md:my-10 lg:my-14">
        <h1 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond">The Legal Practice Area</h1>
        <p className="mb-5 text-gray-500 text-xs md:text-sm lg:text-base">
          We cover a wide array of legal fields, ensuring that no matter your concern, you have access to top-tier legal expertise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          title="Business Law"
          imageSrc="./images/business.png"
          description="We provide strategic legal counsel to businesses of all sizes, ensuring legal compliance, handling disputes, and supporting the growth of your enterprise."
          modalId="my_modal_1"
          detailedDescription="Business Law encompasses the laws and regulations that govern the formation, operation, and dissolution of businesses. We handle matters such as contract drafting and review, corporate governance, employment law, mergers and acquisitions, intellectual property protection, and regulatory compliance."
          services={[
            "Business formation (LLC, corporation, etc.)",
            "Contract negotiation and drafting",
            "Mergers and acquisitions",
            "Employment law and HR compliance",
            "Intellectual property protection",
            "Dispute resolution and litigation",
          ]}
        />
        
        <ServiceCard
          title="Criminal Law"
          imageSrc="./images/criminal.png"
          description="When faced with criminal charges, it’s essential to have a dedicated defense team. Our criminal law specialists offer aggressive defense strategies to protect your rights."
          modalId="my_modal_2"
          detailedDescription="Criminal Law deals with offenses committed against the state or individuals. We offer defense for a range of criminal charges, from minor infractions to serious felonies."
          services={[
            "Legal defense for misdemeanors and felonies",
            "DUI/DWI defense",
            "Assault and violent crimes",
            "Theft and property crimes",
            "Drug-related offenses",
            "White-collar crimes (fraud, embezzlement, etc.)",
            "Representation in court, plea bargaining, and appeals",
          ]}
        />

        <ServiceCard
          title="Child Support"
          imageSrc="./images/child.png"
          description="We offer compassionate and reliable legal assistance in child support cases, advocating for fair support arrangements."
          modalId="my_modal_3"
          detailedDescription="Child Support law ensures that both parents contribute financially to their child’s upbringing after a separation or divorce."
          services={[
            "Establishing child support agreements",
            "Modifying existing child support orders",
            "Enforcement of child support orders",
            "Legal representation in child support disputes",
            "Advice on the calculation of child support payments",
          ]}
        />

        <ServiceCard
          title="Education Law"
          imageSrc="./images/education.png"
          description="Navigating the complexities of the education system requires expert legal advice. Our team specializes in education law."
          modalId="my_modal_4"
          detailedDescription="Education Law governs the legal rights and obligations within the education system. We handle issues related to student rights, special education, and school policies."
          services={[
            "Special education law and disability accommodations",
            "School discipline and student rights",
            "Title IX and anti-discrimination cases",
            "Representation in disputes with educational institutions",
            "Legal advice for private and public schools",
          ]}
        />

        <ServiceCard
          title="Divorce Law"
          imageSrc="./images/divorce.png"
          description="Our experienced divorce attorneys provide personalized legal strategies for asset division, child custody, and spousal support."
          modalId="my_modal_5"
          detailedDescription="Divorce Law governs the dissolution of marriage, including the division of assets, spousal support, and child custody arrangements."
          services={[
            "Representation in contested and uncontested divorces",
            "Asset and property division",
            "Child custody and visitation agreements",
            "Spousal support (alimony)",
            "Mediation and alternative dispute resolution",
            "Enforcement and modification of divorce agreements",
          ]}
        />

        <ServiceCard
          title="Tax Law"
          imageSrc="./images/tax.png"
          description="Our tax law experts help individuals and businesses navigate tax regulations, manage disputes, and develop strategies for minimizing liabilities."
          modalId="my_modal_6"
          detailedDescription="Tax Law involves the complex set of regulations governing taxation. Our tax law attorneys provide strategies for reducing liabilities and resolving disputes."
          services={[
            "Tax planning and compliance for businesses and individuals",
            "Representation in tax audits and disputes",
            "Advice on tax-saving strategies",
            "Handling IRS or state tax authority disputes",
            "Estate tax planning and inheritance tax",
            "Tax implications of business transactions (mergers, acquisitions, etc.)",
          ]}
        />
      </div>
    </section>
  </div>
);

export default Services;
